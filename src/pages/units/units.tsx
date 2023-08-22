import react, { useEffect, useState } from "react"
import { UnitService } from "../../services";
import { t } from "i18next";
import { DataGrid } from "devextreme-react";
import { Column, Editing } from "devextreme-react/data-grid";
import { useNavigation } from "../../contexts/navigation";

export default (props: any) => {

    const [units, setUnits] = useState([]);
    const { setNavigationData } = useNavigation();
    const { currentPath } = props;


    useEffect(() => {
        if (setNavigationData) {
            setNavigationData({ currentPath: currentPath });
        }
        const units$ = UnitService.getAll()
        Promise.all([units$]).then((results) => {
            setUnits(results[0])
        })
    }, [currentPath, setNavigationData])
    const onUnitInserted = (e) => {
        UnitService.insert(e.data);
    }
    const onUnitUpdated = (e) => {
        UnitService.modify(e.data, e.data.id)
    }
    const onUnitRemoved = (e) => {
        UnitService.remove(e.data.id)
    }
    return (
        <react.Fragment>
            <h2 className={"content-block"}>{t("navigation.units")}</h2>

            <div className={"content-block dx-card responsive-paddings"}>
                <DataGrid
                    keyExpr="id"
                    dataSource={units}
                    showBorders={true}
                    onRowInserted={onUnitInserted}
                    onRowUpdated={onUnitUpdated}
                    onRowRemoved={onUnitRemoved}>
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
                    <Column
                        dataField={"name"}
                        caption={t("column.name")}>
                    </Column>
                    <Column
                        dataField={"code"}
                        caption={t("column.code")}
                    ></Column>
                </DataGrid>
            </div>
        </ react.Fragment>
    )

}