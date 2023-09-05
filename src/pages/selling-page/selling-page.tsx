import React, { useEffect, useRef, useState } from "react";
import "./selling-page.scss";
import { ProductCategoryService } from "../../services/product-category.service";
import { ProductService } from "../../services/product.service";
import {
  Product,
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
import CustomerInfoSelection from "../../components/customer-info/customer-info";

class SelectedProduct {
  count: number;
  product: Product;
}

export default (props: any) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [textBoxValue, setTextBoxValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsInBasket, setProductsInBasket] = useState<SelectedProduct[]>([]);
  const { setNavigationData } = useNavigation();
  const { currentPath } = props;
  const navigate = useNavigate();
  const [paymentPopupVisible, setPaymentPopupVisible] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(true);
  const [isFinishBtnDisabled, setIsFinishBtnDisabled] = useState(true);
  const paymentDataGridRef = useRef(null);
  const [customerPopupVisible, setCustomerPopupVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCustomerId, setSelectedCustomerId] = useState();
  const setCustomerId = (selectedCustomerId) => {
    setSelectedCustomerId(selectedCustomerId);
  };
  const setpopupVisible = (popupVisible) => {
    setCustomerPopupVisible(popupVisible)
  };
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

  const sale = () => {
    const totalPayments = paymentMethods.map(payment => payment.Amount).reduce(
      (accumulator, currentValue) => accumulator + currentValue);
    if (totalPrice !== totalPayments) { throw ToastService.showToast("warning", t("messages.not-valid-amunt")) }
    const saleRequest: SaleRequest = new SaleRequest();
    const selectedPorduct =
      productsInBasket.map((product) => ({
        productId: product.product.id,
        productCount: product.count,
        sellingPrice: product.product.sellingPrice,
      })
      )
    const selectedPayment = paymentMethods
      .filter(paymentMethod => paymentMethod.Amount > 0)
      .map(paymentMethod => ({
        paymentMethodId: paymentMethod.id,
        amount: paymentMethod.Amount,
      }));
    saleRequest.products = selectedPorduct;
    saleRequest.paymentMethods = selectedPayment;
    if (selectedCustomerId) { saleRequest.customerInfoId = selectedCustomerId; }
    SellingService.sellProducts(saleRequest);
  }

  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
    const pricesInBasket = productsInBasket.map((product) => (product.count) * product.product.sellingPrice)
    setTotalPrice(pricesInBasket.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
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
  }, [currentPath, setNavigationData, productsInBasket]);

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
            text: t("selling-page.complateSale"),
            onClick: () => {
              const items = paymentDataGridRef.current?.instance
                .getDataSource()
                .items();
              const amounts = items.map(paymentMethod => paymentMethod.Amount);
              const totalAmount = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
              if (totalAmount > 0) {
                setPaymentMethods(items);
                sale()
                setPaymentPopupVisible(false);
              }
              else return ToastService.showToast("warning", t("messages.not-valid-payment-method"));
            },
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={{
            text: t("selling-page.close"),
            onClick: () => setPaymentPopupVisible(false),
          }}
        />
        <DataGrid
          keyExpr="id"
          dataSource={paymentMethods}
          showBorders={true}
          ref={paymentDataGridRef}
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
      <CustomerInfoSelection popupVisible={customerPopupVisible} setCustomerId={setCustomerId} setpopupVisible={setpopupVisible} customerId={selectedCustomerId} />
      < div className="page-container">
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
                onClick={() => setPaymentPopupVisible(true)}
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
                    <span className="ordertxt1"></span>
                    <br />
                    <b>
                      <span>{product?.product.name}</span>
                    </b>
                    <br />
                    <div className="spanOfOrder">
                      <span className="btn3">{product?.product.barcode}</span>
                      <span>
                        {product.count} {t("selling-page.amount")} *{" "}
                        <b>{product.product.sellingPrice} ₺</b>{" "}
                      </span>
                    </div>
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
            <div className="stxt">{t("selling-page.total")}</div>
            <div className="btxt">{totalPrice} ₺</div>
          </div>
          <div className="footer-buttons">
            <Button
              type="danger"
              className="f-btn"
              icon="trash"
              text={t("selling-page.clean")}
              onClick={() => {
                setPaymentMethods([]);
                setProductsInBasket([]);
                setSelectedCustomerId(null);
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
              onClick={() => setCustomerPopupVisible(true)}
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
