# node-huobi-sdk

> 本SDK为[huobi](https://www.huobi.pro/zh-cn)的[官方API](https://github.com/huobiapi/API_Docs/wiki/REST_api_reference)的ts封装。集成REST API、WebScoket行情和WebScoket账户交易V2版


### Install

```bash
npm install node-huobi-sdk
```


### Usage

```ts
import HuobiSDK, { CandlestickIntervalEnum } from 'node-huobi-sdk';

const REST_URL =  'https://api.huobi.de.com';
const MARKET_WS =  'wss://api.huobi.de.com/ws';
const ACCOUNT_WS =  'wss://api.huobi.de.com/ws/v2';

const hbsdk = new HuobiSDK({
    accessKey: "access_key",
    secretKey: "secret_key",
    // errLogger: (msg) => {
    //     errLogger.error(msg);
    // },
    // outLogger: (msg) => {
    //     outLogger.info(msg);
    // },
    url:{
        rest: REST_URL,
        market_ws: MARKET_WS,
        account_ws: ACCOUNT_WS,
    }
});

// 需要先执行(只需执行一次)，才能调用 钱包、下单 等接口
hbsdk.getAccountId().then(() => {

});

// 查余额
hbsdk.getAccountBalance(data => console.log(data.list));

// 下单
hbsdk.order('btcusdt', 'buy-limit', 0.001, 38000);


// 行情-深度
hbsdk.subMarketDepth({symbol: SYMBOL}, (data) => console.log(data))
// 行情-k线
hbsdk.subMarketKline({symbol: SYMBOL, period: CandlestickIntervalEnum.MIN1}, (data) => console.log(data))
// 行情-交易记录
hbsdk.subMarketTrade({symbol: SYMBOL}, (data) => console.log(data))

// 需要权鉴才能ws订阅账户、订单变化
hbsdk.subAuth((data) => {
    console.log(data)
    // 订阅账户变化
    hbsdk.subAccountsUpdate({}, (data) => {
        console.log(data)
    });
});
```

### Progress

- [ ] REST
    - [x] `market`：行情
    - [x] `common`：公共
    - [x] `account`：账户
    - [x] `order`：订单
    - [ ] `margin`：借贷
    - [ ] `dw`：虚拟币提现

- [ ] WS
    - [x] `account`：账户
    - [x] `kline`：K线
    - [x] `depth`：挂单深度
    - [x] `trade detail`：交易详情
    - [ ] `market detail`：交易聚合
    - [ ] `order`： 订单


### LICENSE
MIT