
# node-huobi-sdk

> 本SDK为[huobi](https://www.huobi.pro/zh-cn)的[官方API](https://huobiapi.github.io/docs)的ts封装。集成REST API、WebScoket行情和WebScoket账户交易V2版


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

// 稳定线上，需要海外服务器
// const REST_URL =  'https://api.huobi.pro';
// const MARKET_WS =  'wss://api.huobi.pro/ws';
// const ACCOUNT_WS =  'wss://api.huobi.pro/ws/v2';

const hbsdk = new HuobiSDK({
    accessKey: "access_key",
    secretKey: "secret_key",
    // errLogger: (...msg) => {
    //     errLogger.error(...msg);
    // },
    // outLogger: (...msg) => {
    //     outLogger.info(...msg);
    // },
    url:{
        rest: REST_URL,
        market_ws: MARKET_WS,
        account_ws: ACCOUNT_WS,
    }
});

// 需要先执行(只需执行一次)，才能调用 钱包、下单 等接口
hbsdk.getAccountId().then(() => {
    // 查余额
    hbsdk.getAccountBalance().then((data) => {
        console.log(data.list)
    });
});


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


### setOptions
```ts
import HuobiSDK, { CandlestickIntervalEnum } from 'node-huobi-sdk';

const REST_URL =  'https://api.huobi.pro';
const MARKET_WS =  'wss://api.huobi.pro/ws';
const ACCOUNT_WS =  'wss://api.huobi.pro/ws/v2';

const hbsdk = new HuobiSDK();


// 异步(查数据后再去设置)
hbsdk.setOptions({
    accessKey: 'account.access_key',
    secretKey: 'account.secret_key',
    // errLogger: (...msg) => {
    //     errLogger.error(...msg);
    // },
    // outLogger: (...msg) => {
    //     outLogger.info(...msg);
    // },
    url:{
        rest: REST_URL,
        market_ws: MARKET_WS,
        account_ws: ACCOUNT_WS,
    }
});
```

### API

- getSymbols [获取所有交易对](https://huobiapi.github.io/docs/spot/v1/cn/#0e505d18dc)
- getMarketHistoryKline [K 线数据（蜡烛图）](https://huobiapi.github.io/docs/spot/v1/cn/#k)
- --
- getAccounts [账户信息](https://huobiapi.github.io/docs/spot/v1/cn/#2a0d0be224)
- getAccountId 默认获取现货的账户id type=spot
- getAccountBalance [账户余额](https://huobiapi.github.io/docs/spot/v1/cn/#870c0ab88b)
- getOpenOrders [查询当前未成交订单](https://huobiapi.github.io/docs/spot/v1/cn/#95f2078356)
- getOrders [搜索历史订单](https://huobiapi.github.io/docs/spot/v1/cn/#d72a5b49e7)
- getOrder [查询订单详情](https://huobiapi.github.io/docs/spot/v1/cn/#5f8b337a4c)
- order [下单](https://huobiapi.github.io/docs/spot/v1/cn/#fd6ce2a756)
- cancelOrder [撤销订单](https://huobiapi.github.io/docs/spot/v1/cn/#de93fae07b)
- --
- contractContractInfo [合约信息](https://huobiapi.github.io/docs/dm/v1/cn/#a231eed8c5)
- contractIndex [合约指数](https://huobiapi.github.io/docs/dm/v1/cn/#6b15dcb6a3)
- contractPriceLimit [获取合约最高限价和最低限价](https://huobiapi.github.io/docs/dm/v1/cn/#025c787500)
- contractOpenInterest [获取当前可用合约总持仓量](https://huobiapi.github.io/docs/dm/v1/cn/#e30aaa2765)
- contractAccountInfo [获取合约用户账户信息](https://huobiapi.github.io/docs/dm/v1/cn/#e807c44c06)

- --
- subMarketDepth [订阅市场深度行情数据](https://huobiapi.github.io/docs/spot/v1/cn/#8742b7d9f7)
- subMarketKline [订阅K线](https://huobiapi.github.io/docs/spot/v1/cn/#k-2)
- subMarketTrade [订阅成交明细](https://huobiapi.github.io/docs/spot/v1/cn/#56c6c47284-2)
- --
- subAuth 权鉴
- subAccountsUpdate [订阅账户变更](https://huobiapi.github.io/docs/spot/v1/cn/#f2e38456dd)
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