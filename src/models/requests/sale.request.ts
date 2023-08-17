export class SaleRequest {
  customerInfoId?: string; // the id of the customer info (if available). for now set to null
  products: SaleProductRequest[];
  paymentMethods: PaymentMethodRequest[];
}

export class SaleProductRequest {
  productId: string;
  productCount: number;
  sellingPrice: number;
}

export class PaymentMethodRequest {
  paymentMethodId: string;
  amount: number;
}
