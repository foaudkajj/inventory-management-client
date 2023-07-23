import react, { useEffect, useState } from "react"
import { ProductService } from "../../services/product.service";
import { ColorService } from "../../services";
import { UnitService } from "../../services/units.service";
import { ProductCategoryService } from "../../services/product-category.service";
import "./products.scss";
import { t } from "i18next";
import { DataGrid } from "devextreme-react";
import { Column, Editing, FormItem, Format, Lookup, RequiredRule } from "devextreme-react/data-grid";
import { Gender } from "../../models";


export default (props: any) => {
    const [products, setProducts] = useState([]);
    const [units, setUnits] = useState([]);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const products$ = ProductService.getAll()
        const units$ = UnitService.getAll()
        const categories$ = ProductCategoryService.getAll()
        const colors$ = ColorService.getAll()

        Promise.all([products$, units$, categories$, colors$]).then((result) => {
            setProducts(result[0]);
            setUnits(result[1]);
            setCategories(result[2]);
            setColors(result[3]);
        })
    }, [])

    const onProductInserted = (e) => {
        ProductService.insert(e.data);
    };
    const onProductUpdated = (e) => {
        ProductService.modify(e.data.id, e.data);
    }

    const onProductRemoved = (e) => {
        ProductService.remove(e.data.id);

    };
    const gender = Object.values(
        Gender,
    ).map(v => {
        return {
            id: v,
            name: v.toLowerCase(),
        };
    });

    return (
        <react.Fragment>
            <h2 className={"content-block"}>{t('navigation.products')}</h2>

            <div className={"content-block dx-card responsive-paddings"}>

                <DataGrid
                    keyExpr="id"
                    dataSource={products}
                    showBorders={true}
                    onRowInserted={onProductInserted}
                    onRowUpdated={onProductUpdated}
                    onRowRemoved={onProductRemoved}
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
                    <Column dataField={"name"} caption={t('column.name')}><RequiredRule /></Column>
                    <Column dataField={"barcode"} caption={t('column.barcode')}><RequiredRule /></Column>
                    <Column dataField={"shortCode"} caption={t('column.shortcode')}></Column>
                    <Column dataField={"gender"} caption={t('column.gender')}>
                        <Lookup
                            dataSource={gender}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>
                    <Column dataField={"price"} caption={t('column.price')} ><RequiredRule /><Format type="currency" precision={2} /></Column>
                    <Column dataField={"size"} caption={t('column.size')} dataType="number"></Column>
                    <Column dataField={"quantity"} caption={t('column.quantity')} dataType="number"><RequiredRule /></Column>
                    <Column dataField={"sellingPrice"} caption={t('column.sellingPrice')} dataType="number" ><RequiredRule /><Format type="currency" precision={2} /></Column>
                    <Column dataField={"pictureUrl"} caption={t('column.pictureUrl')}></Column>
                    <Column dataField={"unitId"} caption={t('column.unit')}><RequiredRule />
                        <Lookup
                            dataSource={units}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>
                    <Column dataField={"categoryId"} caption={t('column.category')}><RequiredRule />
                        <Lookup
                            dataSource={categories}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>
                    <Column dataField={"colorId"} caption={t('navigation.colors')}><RequiredRule />
                        <Lookup
                            dataSource={colors}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>
                    <Column dataField={"description"} caption={t('column.description')}>
                        <FormItem colSpan={2} editorType="dxTextArea" />
                    </Column>
                </DataGrid>
            </div>
        </react.Fragment>
    )
}