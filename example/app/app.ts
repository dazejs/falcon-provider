import { Controller, http } from '@dazejs/framework';

export class App extends Controller {
  @http.get()
  index() {
    return 123;
  }
}