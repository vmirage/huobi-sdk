/**
 * k线数据的周期
 */
export type Period = "1min" | "5min" | "15min" | "30min" | "60min" | "1day" | "1mon" | "1week" | "1year";

export type TradeType = 'buy' | 'sell' | 'both';

export interface BalanceItem{
    currency: string;
    type: string;
    balance: string
}

export interface SymbolInfo {
  'base-currency': string;
  'quote-currency': string;
  'price-precision': number;
  'amount-precision': number;
  'symbol-partition': string;
  symbol: string;
  state: string;
  'value-precision': number;
  'min-order-amt': number;
  'max-order-amt': number;
  'min-order-value': number;
  'limit-order-min-order-amt': number;
  'limit-order-max-order-amt': number;
  'sell-market-min-order-amt': number;
  'sell-market-max-order-amt': number;
  'buy-market-max-order-value': number;
  'api-trading': string;
}
  export interface ContractInfo {
    "symbol": string,
    "contract_code": string,
    "contract_type": string,
    "contract_size": number,
    "price_tick": number,
    "delivery_date": string,
    "create_date": string,
    "contract_status": number
}