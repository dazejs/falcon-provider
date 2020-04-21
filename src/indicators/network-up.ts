import * as net from 'net';
import { Meter } from '../metrics/meter';

export class NetworkUp {
  private meter: Meter = new Meter();

  getMeter() {
    return this.meter;
  }

  run() {
    this.catch();
  }

  catch() {
    // eslint-disable-next-line
    const self = this;
    const original = net.Socket.prototype.write;
    net.Socket.prototype.write = function (data: string | Uint8Array, ...args: any) {
      if (typeof data.length === 'number') {
        self.meter.mark(data.length);
      }
      return original.call(this, data, ...args);
    };
  }

  getValue() {
    return Math.floor(this.meter.getValue() / 1024 * 1000) / 1000;
  }
  
}