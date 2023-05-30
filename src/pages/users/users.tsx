import { DataGrid } from "devextreme-react";
import { Column, Editing, Lookup, RequiredRule } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { UserStatus } from "../../models";
import { BranchService, UserService } from "../../services";
import "./users.scss";
import { RoleService } from "../../services/role.service";
import { MerchantService } from "../../services/merchant.service";

export default (props: any) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);
    const [merchants, setMerchnts] = useState([]);

    useEffect(() => {
        const users$ = UserService.getAll()
        const roles$ = RoleService.getAll()
        const branches$ = BranchService.getAll()
        const merchants$ = MerchantService.getAll()

        let promises = [users$, roles$,branches$,merchants$];
        Promise.all(promises)
            .then((result) => {
                setUsers(result[0]);
                setRoles(result[1]);
                setBranches(result[2]);
                setMerchnts(result[3]);
            })
    }, []);

    const onUserInserted = (e) => {
        UserService.insert(e.data);
    };
    const onUserUpdated = (e) => {
        UserService.modify(e.data.id, e.data);
    }

    const onUserRemoved = (e) => {
        UserService.remove(e.data.id);
       
    };
    const status = Object.values(
        UserStatus,
    ).map(v => {
        return {
            id: v,
            name: v.toLowerCase(),

        };
    });
console.log(users);

    return (

        <React.Fragment>
            <h2 className={"content-block"}>Users</h2>

            <div className={"content-block dx-card responsive-paddings"}>
                <DataGrid
                    keyExpr="id"
                    dataSource={users}
                    showBorders={true}
                    onRowInserted={onUserInserted}
                    onRowUpdated={onUserUpdated}
                    onRowRemoved={onUserRemoved}
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
                    <Column dataField={"firstName"} ><RequiredRule/></Column>
                    <Column dataField={"lastName"}><RequiredRule/></Column>
                    <Column dataField={"username"}><RequiredRule/></Column>
                    <Column dataField={"password"}></Column>
                    <Column dataField={"pictureUrl"}></Column>
                    <Column dataField={"email"}></Column>
                    <Column dataField={"gsm"}></Column>
                    <Column
                        dataField="roleId" caption={'role'}>
                        <Lookup
                            dataSource={roles}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>
                    <Column
                        dataField="branchId" caption={'branch'}>
                        <Lookup
                            dataSource={branches}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>
                    <Column
                        dataField="merchantId" caption={'merchant'}>
                        <Lookup
                            dataSource={merchants}
                            valueExpr="id"
                            displayExpr="title"
                        />
                    </Column>
                    <Column
                        dataField="status" caption={'user status'}>
                        <Lookup
                            dataSource={status}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>
                </DataGrid>
            </div>
        </React.Fragment>
    );
};