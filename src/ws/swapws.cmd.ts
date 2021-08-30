

import { signature } from '../utils/signature';
import { Period } from '../interface'
import { CandlestickIntervalEnum } from '../constant';

export const SWAP_WS_SUB = {
    /**
     * k线订阅
     * @param param0
     */
    orders (symbol: string) {
        return {
            "op": 'sub',
            "topic": `orders.${symbol}`,
            "cid": `sub_${symbol}`
        }
    },

    triggerOrders (symbol: string) {
        return {
            "op": 'sub',
            "topic": `trigger_order.${symbol}`,
            "cid": `sub_${symbol}`
        }
    },

}

export const SWAP_WS_UNSUB = {
    /**
     * k线订阅
     * @param param0
     */
    orders (symbol: string) {
        return {
            "op": 'unsub',
            "topic": `orders.${symbol}`,
            "cid": `sub_${symbol}`
        }
    },

    triggerOrders (symbol: string) {
        return {
            "op": 'unsub',
            "topic": `trigger_order.${symbol}`,
            "cid": `sub_${symbol}`
        }
    },
}

export const SWAP_WS_AUTH = {
    /**
     * 发送auth请求
     * @param ws
     */
    auth (accessKey: string, secretKey: string, WS_URL: string) {
        return {
            op: 'auth',
            type: "api",
            ...signature('GET', WS_URL, accessKey, secretKey),
        }
    },
}
