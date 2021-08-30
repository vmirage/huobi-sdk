import Sockett from 'Sockett';

export class CacheSockett{
    cache: Record<string, string[]> = {};
    ws: Sockett;
    id: number;
    shouldCheckLive: boolean;
    constructor(ws: Sockett) {
        this.ws = ws;
    }
    reStart(ws = this.ws) {
        this.ws = ws;
        ws.open();
        ws.once('open', () => {
            const list = Object.keys(this.cache);
            list.forEach((str) => {
                this.ws.send(str);
            });
            this.shouldCheckLive = true;
            this.checkLive();
            // this.cache = {};
        });
        ws.once('close', () => {
            this.ws.off('message', this.updateId);
            this.shouldCheckLive = false;
        })
        ws.on('message', this.updateId);
    }
    checkLive() {
        if (!this.shouldCheckLive) {
            return;
        }
        if (typeof this.id === 'number' && (Date.now() - this.id) > (1000 * 60 * 30)) {
            const list = Object.keys(this.cache);
            list.forEach((str) => {
                this.ws.send(str.replace('sub', 'unsub'));
            });
            this.ws.close();
            this.ws.emit("error", {
                error: "error",
                message: "ws 重启",
                type: "error",
                target: this.ws.wss
            });
            // setTimeout(() => {
            //     this.reStart();
            // }, 1000);
            return;
        }
        setTimeout(() => {
            this.checkLive();
        }, 1000 * 30);
    }
    checkCache() {
        if (!this.cache) {
            return;
        }
        for (const key in this.cache) {
            if (Object.prototype.hasOwnProperty.call(this.cache, key)) {
                const subscribers = this.cache[key];
                if (subscribers.length === 0) {
                    this.ws.json({unsub: key, id: key})
                    delete this.cache[key];
                }
            }
        }
    }
    updateId = () => {
        this.id = Date.now();
    }
    hasCache(data) {
        const dataStr = JSON.stringify(data);
        return this.cache[dataStr];
    }
    setCache(data) {
        const dataStr = JSON.stringify(data);
        this.cache[dataStr] = [];
    }
    /**
     * 订阅行为会缓存起来
     * @param data
     */
    async sub(data: object, id?: string) {

        const _id = id ? id : 'system';
        const dataStr = JSON.stringify(data);
        if (this.cache[dataStr]) {
            const subscribers = this.cache[dataStr];
            // 订阅
            if (!subscribers.includes(_id)) {
                subscribers.push(_id);
            }
        } else {
            // 没有才发送消息
            this.ws.json(data);
            this.cache[dataStr] = [_id];
        }
    }
    /**
     * 退阅行为会删除缓存
     * @param data
     */
    upsub(data: {op?: string, sub?: string, unsub?: string, id?: string, cid?: string}, id?: string) {
        const _id = id ? id : 'system';
        const dataStr: string = JSON.stringify(data);
        if (data.unsub === undefined && data.sub !== undefined) {
            data.unsub = data.sub;
        }
        if (this.cache[dataStr]) {
            const subscribers = this.cache[dataStr];
            const index = subscribers.findIndex((subscriberId) => subscriberId === _id);
            // 订阅
            if (index > -1) {
                subscribers.slice(index, 1);
                this.checkCache();
            } else {
                // 没有才发送消息
                this.ws.json(data);
            }
        }
    }
    /**
     * 退阅行为会删除缓存
     * @param data
     */
    async unSubFormClinet(data, id: string) {
        if (data.sub) {
            data.unsub = data.sub
            delete data.sub
            // this.json(data);
        }
        const _id = id;
        for (const key in this.cache) {
            if (Object.prototype.hasOwnProperty.call(this.cache, key)) {
                const subscribers = this.cache[key];
                const index = subscribers.findIndex((subscriberId) => subscriberId === _id);
                // 订阅
                if (index > -1) {
                    subscribers.slice(index, 1);
                }
            }
        }
        this.checkCache();
    }
}
