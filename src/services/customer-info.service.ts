import { CustomerInfo } from "../models";
import { AxiosService } from "./axios.service";

const getAll = (): Promise<CustomerInfo[]> => {
    let result$ = AxiosService.get<CustomerInfo[]>(`CustomersInfo/get`);
    return result$;
};

const insert = (row: CustomerInfo): Promise<CustomerInfo> => {
    let result$ = AxiosService.post<CustomerInfo>(`CustomersInfo/insert`, row);
    return result$;
};

const modify = (key: string, row: CustomerInfo): Promise<CustomerInfo> => {
    let result$ = AxiosService.put<CustomerInfo>(`CustomersInfo/update/${key}`, row);
    return result$;
};

const remove = (key: string): Promise<CustomerInfo> => {
    let result$ = AxiosService.remove<CustomerInfo>(`CustomersInfo/delete/${key}`);
    return result$;
};

const getByMerchantId = (): Promise<CustomerInfo[]> => {
    let result$ = AxiosService.get<CustomerInfo[]>(`CustomersInfo/getByMerchantId`);
    return result$;
};

export const CustomerInfoService = {
    getAll,
    insert,
    modify,
    remove,
    getByMerchantId,
};
