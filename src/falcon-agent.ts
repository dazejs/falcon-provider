import { Agent } from '@dazejs/framework';
import io from 'socket.io-client';


export class FalconAgent extends Agent {

  private static server = 'http://127.0.0.1:9797';

  static configure(options: any = {}) {
    if (options.server) this.server = options.server;
    return this;
  }

  async resolve() {
    const ws = io(FalconAgent.server);
    ws.on('connect', () => {
      this.messenger.on('network-down', (data: any) => {
        ws.emit('network-down', data);
      });
      this.messenger.on('network-up', (data: any) => {
        ws.emit('network-up', data);
      });
    });
  }
}