import { DataGrid } from "devextreme-react";
import { Column, Editing } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { GenericList } from "../../models";
import { GenericListService } from "../../services";
import "./generic-lists.scss";
import {  useNavigate } from "react-router-dom";

export default (props: any) => {
  const [genericLists, setGenericLists] = useState([]);

  useEffect(() => {
    GenericListService.getAll().then((genericLists: GenericList[]) => {
      setGenericLists(genericLists);
    });
  }, []);

  const onGenericListInserted = (e) => {
    GenericListService.insert(e.data);
  };
const onGenericListUpdated=(e) =>{
GenericListService.modify(e.data.id,e.data);
}

  const onGenericListRemoved =(e)=>{
GenericListService.remove(e.data.id);
  };
  const navigate = useNavigate();

  const onRowDblClicked =(e)=>{
    navigate("/genericListItems", {state:{id: e.data.id}});

     console.log(e.data.id);

}
  return (
    <React.Fragment>
      <h2 className={"content-block"}>GenericLists</h2>

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
          <Column dataField={"name"}></Column>
          <Column dataField={"description"}></Column>
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
