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

export interface companyState {
  name: string;
  registNumber: string;
  deputyName: string;
  workNumber: string;
  taxCode: string;
  paymentMethod: string;
  emailTemplate: string;
  others: string;
}

export interface insurancesState {
  rate: string;
  contribution: string;
  benefitRate: string;
  insuranceRate: string;
  accidentRate: string;
  dailyRate: string;
}

export interface companyDataState {
  company: companyState;
  insurances: insurancesState;
}
