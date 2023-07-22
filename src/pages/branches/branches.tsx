import { DataGrid } from "devextreme-react";
import { Column, Editing, Lookup, RequiredRule } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { BranchService, CityService, CountryService } from "../../services";
import "./branches.scss";
import { useTranslation } from "react-i18next";

export default (props: any) => {
  const [branches, setBranches] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const { t } = useTranslation()

  useEffect(() => {
    const branches$ = BranchService.getAll();
    const countries$ = CountryService.getAll();
    const cities$ = CityService.getAll();
    let promises = [branches$, countries$, cities$];
    Promise.all(promises)
      .then((result) => {
        setBranches(result[0])
        setCountries(result[1]);
        setCities(result[2]);
      });
  }, [])

  const onBranchInserted = (e) => {
    console.log(e);
    BranchService.insert(e.data);
  };
  const onBranchUpdated = (e) => {
    BranchService.modify(e.data.id, e.data);
  };
  const onBranchRemoved = (e) => {
    BranchService.remove(e.data.id);
  };

  return (
    <React.Fragment>
      <h2 className={"content-block"}>{t('navigation.branches')}</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          keyExpr="id"
          dataSource={branches}
          showBorders={true}
          onRowInserted={onBranchInserted}
          onRowUpdated={onBranchUpdated}
          onRowRemoved={onBranchRemoved}
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
          <Column dataField={"name"} caption={t('column.name')}>
            <RequiredRule />
          </Column>
          <Column
            dataField="countryId" caption={t('column.country')}>
            <Lookup
              dataSource={countries}
              valueExpr="id"
              displayExpr="name"
            />
            <RequiredRule />

          </Column>
          <Column
            dataField="cityId" caption={t('column.city')}>
            <Lookup
              dataSource={cities}
              valueExpr="id"
              displayExpr="name"
            />
            <RequiredRule />

          </Column>
        </DataGrid>
      </div>
    </React.Fragment>
  );
};