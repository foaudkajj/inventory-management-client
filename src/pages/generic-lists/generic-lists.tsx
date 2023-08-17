import { DataGrid } from "devextreme-react";
import { Column, Editing } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { GenericList } from "../../models";
import { GenericListService } from "../../services";
import "./generic-lists.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../../contexts/navigation";

export default (props: any) => {
  const [genericLists, setGenericLists] = useState([]);
  const { setNavigationData } = useNavigation();
  const { currentPath } = props;

  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
    GenericListService.getAll().then((genericLists: GenericList[]) => {
      setGenericLists(genericLists);
    });
  }, [currentPath, setNavigationData]);

  const onGenericListInserted = (e) => {
    GenericListService.insert(e.data);
  };
  const onGenericListUpdated = (e) => {
    GenericListService.modify(e.data.id, e.data);
  };

  const onGenericListRemoved = (e) => {
    GenericListService.remove(e.data.id);
  };
  const navigate = useNavigate();

  const onRowDblClicked = (e) => {
    navigate("/genericListItems", { state: { id: e.data.id } });
  };
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t("navigation.generic_lists")}</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          keyExpr="id"
          dataSource={genericLists}
          showBorders={true}
          onRowInserted={onGenericListInserted}
          onRowUpdated={onGenericListUpdated}
          onRowRemoved={onGenericListRemoved}
          onRowDblClick={onRowDblClicked}
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
          <Column
            dataField={"description"}
            caption={t("column.description")}
          ></Column>
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
