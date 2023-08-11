import { SaleRequest } from "../models/requests/sale.request";
import { AxiosService } from "./axios.service";


const sellProducts = (row: SaleRequest): Promise<SaleRequest> => {
    let result$ = AxiosService.post<SaleRequest>(`selling/sellProducts`, row);
    return result$;
};

export const SellingService = {
    sellProducts
};