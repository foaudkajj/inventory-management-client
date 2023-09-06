import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import DataGrid, { Column, Editing, RequiredRule, Selection } from "devextreme-react/data-grid";
import { useEffect, useRef, useState } from "react";
import { CustomerInfoService } from "../../services";
import { t } from "i18next";
import { CustomerInfo } from "../../models";

const CustomerInfoSelection = (props) => {
    const customerDataGridRef = useRef(null);
    const [customer, setCustomer] = useState([]);
    const { popupVisible, setCustomerId, setpopupVisible, customerId } = props


    useEffect(() => {
        CustomerInfoService.getAll().then((customers: CustomerInfo[]) => {
            setCustomer(customers);
        });
        if (customerId === undefined || customerId === null) {
            customerDataGridRef.current?._instance.clearSelection();
        }


    }, [popupVisible, setCustomerId, setpopupVisible, customerId])
    const onCustomerInserted = (e) => {
        CustomerInfoService.insert(e.data);
    }
    const onCustomerUpdated = (e) => {
        CustomerInfoService.modify(e.data.id, e.data);
    }
    const onCustomerRemoved = (e) => {
        CustomerInfoService.remove(e.data.id);
    }


    return (
        <div>
            <Popup
                visible={popupVisible}
                dragEnabled={false}
                hideOnOutsideClick={false}
                showCloseButton={false}
                showTitle={true}
                title={t("selling-page.choose_customer_info")}
                container=".dx-viewport"
                width={800}
                height={700}
            >
                <Position at="center" my="center" collision="fit" />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="before"
                    options={{
                        text: t("selling-page.ok"),
                        onClick: () => {
                            const customerId = customerDataGridRef.current?.instance.getSelectedRowKeys().find(id => id);
                            setCustomerId(customerId);
                            setpopupVisible(false);
                        },
                    }}
                />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={{
                        text: t("selling-page.close"),
                        onClick: () => {
                            setpopupVisible(false);
                        }
                    }}
                />
                <DataGrid
                    keyExpr="id"
                    dataSource={customer}
                    showBorders={true}
                    ref={customerDataGridRef}
                    onRowInserted={onCustomerInserted}
                    onRowUpdated={onCustomerUpdated}
                    onRowRemoved={onCustomerRemoved}
                >
                    <Editing
                        mode="form"
                        allowUpdating={true}
                        allowAdding={true}
                        allowDeleting={true} />
                    <Selection mode="single"
                        showCheckBoxesMode="true" />
                    <Column
                        formItem={{ visible: false }}
                        visible={false}
                        dataField="id"
                    >
                    </Column>
                    <Column
                        dataField="name"
                        caption={t("column.name")}
                    >
                        <RequiredRule />
                    </Column>
                    <Column
                        dataField="phone"
                        caption={t("column.phone")}
                    ></Column>
                </DataGrid>
            </Popup>

        </div>
    )

};
export default CustomerInfoSelection;
