import { DataGrid } from "devextreme-react";
import { Column, Editing, Lookup } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { GenericListItemService, GenericListService } from "../../services";
import "./generic-list-items.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useNavigation } from "../../contexts/navigation";

export default (props: any) => {
  const [genericListItems, setGenericListItems] = useState([]);
  const [genericLists, setGenericLists] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const listId = location.state?.id;
  const genericListName = genericLists.find((element) => element.id == listId);
  const { setNavigationData } = useNavigation();
  const { currentPath } = props;

  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
    if (listId == null) {
      navigate("/genericLists");
    }
    const GenericListItems$ = GenericListItemService.getAll({
      where: { genericListId: listId },
    });
    const GenericLists$ = GenericListService.getAll();
    Promise.all([GenericListItems$, GenericLists$]).then((results) => {
      setGenericListItems(results[0]);
      setGenericLists(results[1]);
    });
  }, []);

  const onGenericListItemInserted = (e) => {
    GenericListItemService.insert(e.data);
  };
  const onGenericListItemUpdated = (e) => {
    GenericListItemService.modify(e.data.id, e.data);
  };

  const onGenericListItemRemoved = (e) => {
    GenericListItemService.remove(e.data.id);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{genericListName?.name}</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          keyExpr="id"
          dataSource={genericListItems}
          showBorders={true}
          onRowInserted={onGenericListItemInserted}
          onRowUpdated={onGenericListItemUpdated}
          onRowRemoved={onGenericListItemRemoved}
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
          <Column dataField={"name"}></Column>
          <Column dataField="genericListId" caption={"genericList"}>
            <Lookup
              dataSource={genericLists}
              valueExpr="id"
              displayExpr="name"
            />
          </Column>
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
