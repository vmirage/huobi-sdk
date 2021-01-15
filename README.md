# node-huobi-sdk

> 本SDK为[huobi](https://www.huobi.pro/zh-cn)的[官方API](https://github.com/huobiapi/API_Docs/wiki/REST_api_reference)的ts封装。

### Install

```bash
npm install node-huobi-sdk
```


### Usage

```ts
import HuobiSDK from 'node-huobi-sdk';

const REST_URL =  'https://api.huobi.de.com';
const MARKET_WS =  'wss://api.huobi.de.com/ws';
const ACCOUNT_WS =  'wss://api.huobi.de.com/ws/v2';

const hbsdk = new HuobiSDK({
    accessKey: "access_key",
    secretKey: "secret_key",
    errLogger: (msg) => {
        // errLogger.error(msg);
    },
    outLogger: (msg) => {
        // outLogger.info(msg);
    },
    url:{
        rest: REST_URL,
        market_ws: MARKET_WS,
        account_ws: ACCOUNT_WS,
    }
});

// 需要先执行
hbsdk.getAccountId().then(() => {
    hbsdk.getAccountBalance(data => console.log(data.list));
});

// 行情-深度
hbsdk.subMarketDepth({symbol: SYMBOL}, (data) => console.log(data))
// 行情-k线
hbsdk.subMarketKline({symbol: SYMBOL, period: CandlestickIntervalEnum.MIN1}, (data) => console.log(data))
// 行情-交易记录
hbsdk.subMarketTrade({symbol: SYMBOL}, (data) => console.log(data))

// 需要先执行
hbsdk.subAuth((data) => {
    console.log(data)
    hbsdk.subAccountsUpdate({}, (data) => {
        console.log(data)
    });
});
```

### Progress

- [ ] Rest
    - [x] `market`：行情
    - [x] `common`：公共
    - [x] `account`：账户
    - [x] `order`：订单
    - [ ] `margin`：借贷
    - [ ] `dw`：虚拟币提现

- [ ] ws
    - [x] `kline`
    - [x] `depth`
    - [x] `trade detail`
    - [ ] `market detail`


### LICENSE
MIT