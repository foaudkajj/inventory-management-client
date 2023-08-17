import { useEffect, useState } from "react";
import { ProductCategoryService } from "../../services/product-category.service";
import { ProductCategory } from "../../models";
import React from "react";
import { t } from "i18next";
import { DataGrid } from "devextreme-react";
import { Column, Editing, RequiredRule } from "devextreme-react/data-grid";
import { useNavigation } from "../../contexts/navigation";

export default (props: any) => {
  const { setNavigationData } = useNavigation();
  const { currentPath } = props;

  const [categories, setCategory] = useState([]);
  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
    ProductCategoryService.getAll().then((categories: ProductCategory[]) => {
      setCategory(categories);
    });
  }, [currentPath, setNavigationData]);

  const onProductCategoryInserted = (e) => {
    ProductCategoryService.insert(e.data);
  };
  const onProductCategoryUpdated = (e) => {
    ProductCategoryService.modify(e.data.id, e.data);
  };
  const onProductCategoryRemoved = (e) => {
    ProductCategoryService.remove(e.data.id);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t("column.category")}</h2>
      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          keyExpr="id"
          dataSource={categories}
          showBorders={true}
          onRowInserted={onProductCategoryInserted}
          onRowUpdated={onProductCategoryUpdated}
          onRowRemoved={onProductCategoryRemoved}
        >
          <Editing
            mode="form"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
          />
          <Column
            dataField={"id"}
            visible={false}
            formItem={{ visible: false }}
          ></Column>
          <Column dataField={"name"} caption={t("column.name")}>
            <RequiredRule />
          </Column>
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
