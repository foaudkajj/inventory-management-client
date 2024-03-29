import { DataGrid } from "devextreme-react";
import { Column, Editing } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { Currency } from "../../models";
import { CurrencyService } from "../../services";
import "./currencies.scss";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../../contexts/navigation";

export default (props: any) => {
  const [currencies, setCurrencies] = useState([]);
  const { t } = useTranslation();
  const { setNavigationData } = useNavigation();
  const { currentPath } = props;

  useEffect(() => {
    if (setNavigationData) {
      setNavigationData({ currentPath: currentPath });
    }
    CurrencyService.getAll().then((currencies: Currency[]) => {
      setCurrencies(currencies);
    });
  }, [currentPath, setNavigationData]);

  const onCurrencyInserted = (e) => {
    CurrencyService.insert(e.data);
  };
  const onCurrencyUpdated = (e) => {
    CurrencyService.modify(e.data.id, e.data);
  };
  const onCurrencyRemoved = (e) => {
    CurrencyService.remove(e.data.id);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t("navigation.currencies")}</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          keyExpr="id"
          dataSource={currencies}
          showBorders={true}
          onRowInserted={onCurrencyInserted}
          onRowUpdated={onCurrencyUpdated}
          onRowRemoved={onCurrencyRemoved}
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
        </DataGrid>
      </div>
    </React.Fragment>
  );
};
