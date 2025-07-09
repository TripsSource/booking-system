export interface marginsState {
  s: number;
  m: number;
  l: number;
}

export interface otaState {
  dayMarkup?: string;
  dayTourMargin: number;
  id?: string;
  otaName: string;
  shortMarkup?: string;
  shortTourMargin: number;
}

export interface supplierInvoice {
  id: string;
  name: string;
  description: string;
  vat: string;
  amount: string;
  vatAmount: number | string;
}
