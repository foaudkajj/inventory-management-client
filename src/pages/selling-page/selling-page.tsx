import React, { useEffect, useRef, useState } from "react";
import "./selling-page.scss";
import { ProductCategoryService } from "../../services/product-category.service";
import { ProductService } from "../../services/product.service";
import {
  PaymentMethodRequest,
  Product,
  SaleProductRequest,
  SaleRequest,
} from "../../models";
import { useNavigation } from "../../contexts/navigation";
import { useNavigate } from "react-router-dom";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import {
  PaymentMethodService,
  SellingService,
  ToastService,
} from "../../services";
import DataGrid, { Column, Editing, Lookup } from "devextreme-react/data-grid";
import { t } from "i18next";
import { Button } from "devextreme-react/button";
import { TextBox } from "devextreme-react";

class SelectedProduct {
  count: number;
  product: Product;
}

export default (props: any) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [textBoxValue, setTextBoxValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsInBasket, setProductsInBasket] = useState<SelectedProduct[]>(
    []
  );
  const { setNavigationData } = useNavigation();
  const { currentPath } = props;
  const navigate = useNavigate();
  const [paymentPopupVisible, setPaymentPopupVisible] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(true);
  const [isFinishBtnDisabled, setIsFinishBtnDisabled] = useState(true);
  const dataGridRef = useRef(null);

  const filterProducts = (id: string) => {
    if (!id) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((value) => value.categoryId === id));
    }
  };

  const addToBasket = (id: string) => {
    const productInBasket = productsInBasket.find((p) => p.product.id === id);
    if (productInBasket) {
      productInBasket.count++;
      const allProductsInBasket: SelectedProduct[] = [...productsInBasket];
      setProductsInBasket(allProductsInBasket);
    } else {
      const clickedProdcut = products.find((p) => p.id === id);
      const allProductsInBasket: SelectedProduct[] = [
        ...productsInBasket,
        { count: 1, product: clickedProdcut },
      ];
      setProductsInBasket(allProductsInBasket);
    }
    setIsFinishBtnDisabled(false);
  };

  const goToHome = () => {
    navigate("/home");
  };

  const onPaymentBtnClicked = () => {
    setPaymentPopupVisible(true);
  };

  const handleInputChange = (e) => {
    if (e.value?.length > 0) {
      setIsSearchBtnDisabled(false);
    } else {
      setIsSearchBtnDisabled(true);
    }
    setTextBoxValue(e.value);
  };

  const onSerchClick = async () => {
    const searchedProduct = await ProductService.getByBarcode(textBoxValue);
    const result = searchedProduct.id;

    if (searchedProduct) {
      addToBasket(result);
    } else
      ToastService.showToast(
        "warning",
        "selling-page.warnings.product-not-found"
      );
  };

  const onSaleBtnClicked = () => {
    const saleRequest: SaleRequest = new SaleRequest();
    let saleProductRequest = new SaleProductRequest();
    let selectedPorduct = [];
    productsInBasket.forEach((product) => {
      saleProductRequest = {
        productId: product.product.id,
        productCount: product.count,
        sellingPrice: product.product.sellingPrice,
      };
      selectedPorduct.push(saleProductRequest);
    });
    let paymentMethodRequest = new PaymentMethodRequest();
    let selectedPayment = paymentMethods.map((paymentMethod) => {
      paymentMethodRequest = {
        paymentMethodId: paymentMethod.id,
        amount: paymentMethod.Amount,
      };
      return paymentMethodRequest;
    });
    saleRequest.products = selectedPorduct;
    saleRequest.paymentMethods = selectedPayment;

    SellingService.sellProducts(saleRequest);
  };
  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
    const Categories$ = ProductCategoryService.getAll();
    const Products$ = ProductService.getAll();
    const PaymentMethods$ = PaymentMethodService.getAll();
    Promise.all([Categories$, Products$, PaymentMethods$]).then((results) => {
      setCategories(results[0]);
      const products = results[1] ?? [];
      setProducts(products);
      setFilteredProducts(products);
      const paymentMethodsAmount = results[2].map((paymentMethod) => ({
        ...paymentMethod,
        Amount: 0,
      }));
      setPaymentMethods(paymentMethodsAmount);
    });
  }, [currentPath, setNavigationData]);

  return (
    <React.Fragment>
      <Popup
        visible={paymentPopupVisible}
        dragEnabled={false}
        hideOnOutsideClick={false}
        showCloseButton={false}
        showTitle={true}
        title={t("selling-page.choose_payment_method")}
        container=".dx-viewport"
        width={800}
        height={700}
      >
        <Position at="center" my="center" collision="fit" />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="before"
          options={{
            text: "ok",
            onClick: () => {
              const items = dataGridRef.current?.instance
                .getDataSource()
                .items();
              setPaymentMethods(items);
              setPaymentPopupVisible(false);
            },
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={{
            text: "Close",
            onClick: () => setPaymentPopupVisible(false),
          }}
        />
        <DataGrid
          keyExpr="id"
          dataSource={paymentMethods}
          showBorders={true}
          ref={dataGridRef}
        >
          <Editing mode="cell" allowUpdating={true} />
          <Column
            allowEditing={false}
            dataField="id"
            caption={t("navigation.payment_method")}
          >
            <Lookup
              dataSource={paymentMethods}
              valueExpr="id"
              displayExpr="name"
            />
          </Column>
          <Column
            dataField="Amount"
            caption={t("selling-page.amount")}
            dataType="number"
            format="currency"
          ></Column>
        </DataGrid>
      </Popup>
      <div className="page-container">
        <div className="selling-content">
          <div className="column1">
            <div className="column1-buttons">
              <Button
                text="Ara"
                onClick={onSerchClick}
                disabled={isSearchBtnDisabled}
              />

              <Button
                className="btn2"
                onClick={onSaleBtnClicked}
                disabled={isFinishBtnDisabled}
                type="default"
                icon="save"
                text="selling-page.buttons.finish-sale"
              />
              <Button
                className="btn3"
                onClick={goToHome}
                type="danger"
                icon="remove"
                text={t("selling-page.exit")}
              />
              <Button
                className="btn2"
                type="default"
                text={t("column.category")}
                icon="fa-solid fa-store"
              />
            </div>
            <div className="search-bar">
              <TextBox
                className="search-input"
                onValueChanged={handleInputChange}
                value={textBoxValue}
                placeholder={t("selling-page.search")}
              ></TextBox>
            </div>
            <div className="orders">
              {productsInBasket?.map((product) => {
                return (
                  <div key={product.product.id}>
                    <span className="ordertxt1">Lorem ipsum dolor sit</span>
                    <br />
                    <b>
                      <span>{product?.product.name}</span>
                    </b>
                    <br />
                    <span className="btn3">{product?.product.barcode}</span>
                    <span className="orderP">
                      {product.count} {t("selling-page.amount")} *{" "}
                      <b>{product.product.sellingPrice} ₺</b>{" "}
                    </span>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="column2">
            <Button
              width={"100%"}
              className="categories"
              onClick={() => filterProducts(null)}
            >
              {t("selling-page.all")}
            </Button>
            {categories.map((category, index) => {
              return (
                <Button
                  key={index}
                  className="categories"
                  id={category.id}
                  onClick={() => filterProducts(category.id)}
                >
                  {category.name}
                </Button>
              );
            })}
          </div>
          <div className="column3">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  onClick={() => addToBasket(product.id)}
                  className="product-container"
                >
                  <img src={product?.pictureUrl} alt="" />
                  <span>{product?.name}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="selling-footer">
          <div className="price">
            <div className="stxt">Lorem ipsum dolor sit</div>
            <div className="btxt">32,41 ₺</div>
          </div>
          <div className="footer-buttons">
            <Button
              type="success"
              className="f-btn"
              onClick={() => onPaymentBtnClicked()}
              icon="contentlayout"
              text={t("selling-page.preferences")}
            />
            <Button
              type="danger"
              className="f-btn"
              icon="trash"
              text="temizle"
              onClick={() => {
                setProductsInBasket([]);
                setIsFinishBtnDisabled(true);
              }}
            />
            <Button
              className="f-btn"
              icon="arrowleft"
              text={t("selling-page.get_last_sale")}
            ></Button>
            <Button
              className="f-btn"
              icon="user"
              text={t("selling-page.customer")}
            />
            <Button
              className="f-btn"
              icon="doc"
              text={t("selling-page.reports")}
            />
            <Button
              type="default"
              className="f-btn"
              icon="contentlayout"
              text={t("selling-page.transactions")}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
