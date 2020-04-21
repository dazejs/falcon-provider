import { Provider, inject, MiddlewareService } from '@dazejs/framework';
import { NetworkDown, NetworkUp } from './indicators';

export class FalconProvider extends Provider {
  static configure() {
    return this;
  }

  @inject() middleware: MiddlewareService;

  launch() {
    if (!this.app.isCluster) return;

    const networkDown = new NetworkDown();
    const networkUp = new NetworkUp();
    networkDown.run();
    networkUp.run();

    setInterval(() => {
      const now = Date.now();
      const downRate = networkDown.getValue();
      const upRate = networkUp.getValue();
      this.messenger.broadcast('network-down', {
        name: 'Network In',
        unit: 'kb/s',
        value: downRate,
        pid: process.pid,
        time: now
      });
      this.messenger.broadcast('network-up', {
        name: 'Network Out',
        unit: 'kb/s',
        value: upRate,
        pid: process.pid,
        time: now
      });
    }, 60 * 1000);


    // this.messenger.on('aaa', (data) => {
    //   console.log(data, '接收到广播给 worker 的数据拉');
    // });
    // this.middleware.register((_request: Request, next: TNext) => {
    //   const downRate = networkDown.getValue();
    //   this.messenger.broadcast('network-down', downRate);
    //   return next();
    // });
    // console.log('worker workered');
  }
}