import { DataGrid } from "devextreme-react";
import { Column, Editing } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { Color } from "../../models";
import { ColorService } from "../../services";
import "./colors.scss";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../../contexts/navigation";

export default (props: any) => {
  // setColors değişkeni değiştirmek için kullanılır.
  const [colors, setColors] = useState([]);
  const { t } = useTranslation();
  const { setNavigationData } = useNavigation();
  const { currentPath } = props;

  // backend den veri çekeceksen bunu kullanmalısın.
  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
    ColorService.getAll().then((colors: Color[]) => {
      // ekranı uyarır veri geldi diye.
      setColors(colors);
    });
  }, [currentPath, setNavigationData]);

  const onColorInserted = (e) => {
    ColorService.insert(e.data);
  };
  const onColorUpdated = (e) => {
    ColorService.modify(e.data.id, e.data);
  };

  const onColorRemoved = (e) => {
    ColorService.remove(e.data.id);
  };
  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t("navigation.colors")}</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          keyExpr="id"
          dataSource={colors}
          showBorders={true}
          onRowInserted={onColorInserted}
          onRowUpdated={onColorUpdated}
          onRowRemoved={onColorRemoved}
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
          <Column dataField={"name"} caption={t("column.name")}></Column>
          <Column dataField={"code"} caption={t("column.code")}></Column>
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
