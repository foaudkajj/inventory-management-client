import { DataGrid } from "devextreme-react";
import { Column, Editing } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { PaymentMethod } from "../../models";
import { PaymentMethodService } from "../../services";
import "./payment-methods.scss";

export default (props: any) => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    PaymentMethodService.getAll().then((paymentMethods: PaymentMethod[]) => {
      setPaymentMethods(paymentMethods);
    });
  }, []);

  const onPaymentMethodInserted = (e) => {
    PaymentMethodService.insert(e.data);
  };
  const onPaymentMethodUpdated = (e) => {
    PaymentMethodService.modify(e.data.id, e.data);
  };
  const onPaymentMethodRemoved = (e) => {
    PaymentMethodService.remove(e.data.id);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>payment methods</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          keyExpr="id"
          dataSource={paymentMethods}
          showBorders={true}
          onRowInserted={onPaymentMethodInserted}
          onRowUpdated={onPaymentMethodUpdated}
          onRowRemoved={onPaymentMethodRemoved}
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
        </DataGrid>
      </div>
    </React.Fragment>
  );
};