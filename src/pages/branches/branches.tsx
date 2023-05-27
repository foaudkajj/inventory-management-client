import { DataGrid } from "devextreme-react";
import { Column, Editing, Lookup, RequiredRule } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { Branch, City, Country } from "../../models";
import { BranchService, CityService, CountryService } from "../../services";
import "./branches.scss";

export default (props: any) => {
  const [branches, setBranches] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);


  useEffect(() => {
    BranchService.getAll().then((branches: Branch[]) => {
      setBranches(branches);
    });
    CountryService.getAll().then((countries: Country[]) => {
      setCountries(countries);
    });
    CityService.getAll().then((cities: City[]) => {
      setCities(cities);
    })
  }, []);

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
//TODO
  const setMerchantIdDefault = (e) => {
    e.data.merchantId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  }
  return (
    <React.Fragment>
      <h2 className={"content-block"}>branches</h2>

      <div className={"content-block dx-card responsive-paddings"}>
        <DataGrid
          keyExpr="id"
          dataSource={branches}
          showBorders={true}
          onRowInserted={onBranchInserted}
          onRowUpdated={onBranchUpdated}
          onRowRemoved={onBranchRemoved}
          onInitNewRow={setMerchantIdDefault}
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
          <Column dataField={"name"} caption={'name'}>
            <RequiredRule />
          </Column>
          <Column
            dataField="countryId" caption={'country name'}>
            <Lookup
              dataSource={countries}
              valueExpr="id"
              displayExpr="name"
            />
            <RequiredRule />

          </Column>
          <Column
            dataField="cityId" caption={'city name'}>
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