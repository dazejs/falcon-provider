


export class ServiceManager {
  static services: Map<string, any> = new Map();

  static get(name: string) {
    return this.services.get(name);
  }

  static set(name: string, val: any) {
    return this.services.set(name, val);
  }

}