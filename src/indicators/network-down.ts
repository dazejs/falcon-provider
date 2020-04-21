import * as net from 'net';
import { Meter } from '../metrics/meter';

export class NetworkDown {

  private meter: Meter = new Meter();

  run() {
    this.catch();
  }

  getMeter() {
    return this.meter;
  }

  catch() {
    // eslint-disable-next-line
    const self = this;
    const original = net.Socket.prototype.read;
    net.Socket.prototype.read = function (...args: any) {
      this.on('data', (data: any) => {
        if (typeof data.length === 'number') {
          self.meter.mark(data.length);
        }
      });
      return original.call(this, ...args);
    };
  }

  getValue() {
    return Math.floor(this.meter.getValue() / 1024 * 1000) / 1000;
  }
}