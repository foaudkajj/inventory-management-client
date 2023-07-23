import { DataGrid } from "devextreme-react";
import { Column, Editing, Lookup, RequiredRule } from "devextreme-react/data-grid";
import React, { useEffect, useState } from "react";
import { UserStatus } from "../../models";
import { BranchService, UserService } from "../../services";
import "./users.scss";
import { RoleService } from "../../services/role.service";
import { useTranslation } from "react-i18next";

export default (props: any) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);
    const { t } = useTranslation()

    useEffect(() => {
        const users$ = UserService.getAll()
        const roles$ = RoleService.getAll()
        const branches$ = BranchService.getAll()

        let promises = [users$, roles$, branches$];
        Promise.all(promises)
            .then((result) => {
                setUsers(result[0]);
                setRoles(result[1]);
                setBranches(result[2]);
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
            <h2 className={"content-block"}>{t('navigation.users')}</h2>

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
                    <Column dataField={"firstName"} caption={t('column.first_name')} ><RequiredRule /></Column>
                    <Column dataField={"lastName"} caption={t('column.last_name')}><RequiredRule /></Column>
                    <Column dataField={"username"} caption={t('column.user_name')}><RequiredRule /></Column>
                    <Column dataField={"password"} caption={t('column.password')}></Column>
                    <Column dataField={"email"} caption={t('column.email')}></Column>
                    <Column dataField={"gsm"} caption={t('column.gsm')}></Column>
                    <Column
                        dataField="roleId" caption={t('column.role')}>
                        <Lookup
                            dataSource={roles}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>
                    <Column
                        dataField="branchId" caption={t('column.branch')}>
                        <Lookup
                            dataSource={branches}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>
                    <Column
                        dataField="status" caption={t('column.user_status')}>
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