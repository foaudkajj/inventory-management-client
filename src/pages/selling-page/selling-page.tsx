import React, { useEffect, useRef, useState } from "react";
import "./selling-page.scss";
import { ProductCategoryService } from "../../services/product-category.service";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models";
import { useNavigation } from "../../contexts/navigation";
import { useNavigate } from "react-router-dom";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { PaymentMethodService } from "../../services";
import DataGrid, { Column, Editing, Lookup } from "devextreme-react/data-grid";
import { t } from "i18next";

class SelectedProduct {
  count: number;
  product: Product;
}

export default (props: any) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [productsInBasket, setProductsInBasket] = useState<SelectedProduct[]>(
    []
  );
  const { setNavigationData } = useNavigation();
  const { currentPath } = props;
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const dataGridRef = useRef(null);

  const filterProducts = (id: string) => {
    setFilteredProducts(products.filter((value) => value.categoryId === id));
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
  };

  const goToHome = () => {
    navigate("/home");
  };

  const tercihler = () => {
    setPopupVisible(true);
  };

  const closeButtonOptions = {
    text: "Close",
    onClick: () => setPopupVisible(false),
  };
  const okButtonOptions = {
    text: "ok",
    onClick: () => {
      const items = dataGridRef.current?.instance.getDataSource().items();
      setPaymentMethods(items);
      setPopupVisible(false);
    },
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
      <script
        src="https://kit.fontawesome.com/9f03ccac4b.js"
        crossOrigin="anonymous"
      ></script>
      <Popup
        visible={popupVisible}
        dragEnabled={false}
        hideOnOutsideClick={false}
        showCloseButton={false}
        showTitle={true}
        title={t("column.choose_payment_method")}
        container=".dx-viewport"
        width={800}
        height={700}
      >
        <Position at="center" my="center" collision="fit" />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="before"
          options={okButtonOptions}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={closeButtonOptions}
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
            caption={t("column.amount")}
            dataType="number"
            format="currency"
          ></Column>
        </DataGrid>
      </Popup>
      <div className="big-row">
        <div className="row1">
          <div className="column1">
            <div className="buttons">
              <button className="btn1">Ara</button>
              <button className="btn2">
                <i className="fa fa-save"></i> Kaydet
              </button>
              <button className="btn3" onClick={goToHome}>
                <i className="fa fa-close"></i> Çıkış
              </button>
            </div>
            <div className="inputflex">
              <input className="input1"></input>
              <button className="btn2">
                <i className="fa-solid fa-store"></i>Ürünler
              </button>
            </div>
            <div className="orders">
              {productsInBasket?.map((product) => {
                return (
                  <div id={product.product.id}>
                    <text className="ordertxt1">Lorem ipsum dolor sit</text>
                    <br />
                    <b>
                      <text>{product?.product.name}</text>
                    </b>
                    <br />
                    <text className="btn3">{product?.product.barcode}</text>
                    <text className="orderP">
                      {product.count} Adet *{" "}
                      <b>{product.product.sellingPrice} ₺</b>{" "}
                    </text>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="column2">
            {categories.map((category) => {
              return (
                <button
                  id={category.id}
                  onClick={() => filterProducts(category.id)}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
          <div className="column3">
            {filteredProducts.map((product) => {
              return (
                <div
                  id={product.id}
                  onClick={() => addToBasket(product.id)}
                  className="containerr"
                >
                  <img src={product?.pictureUrl} alt="" />
                  <text>{product?.name}</text>
                </div>
              );
            })}
          </div>
        </div>
        <div className="row2">
          <div className="price">
            <div className="stxt">Lorem ipsum dolor sit</div>
            <div className="btxt">32,41 ₺</div>
          </div>
          <button className="btn5" onClick={() => tercihler()}>
            <i className="fa-solid fa-money-bill"></i> terciher
          </button>
          <button className="btn3" onClick={() => setProductsInBasket([])}>
            <i className="fa-solid fa-trash"></i> temizle
          </button>
          <button className="btn1">
            <i className="fa-solid fa-arrow-left"></i> son satışı getir
          </button>
          <button className="btn1">
            <i className="fa-regular fa-user"></i> Müşteri Baket
          </button>
          <button className="btn1">
            <i className="fa-solid fa-book"></i> Raporlar
          </button>
          <button className="btn2">
            <i className="fa-solid fa-bars"></i> işlemler
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
