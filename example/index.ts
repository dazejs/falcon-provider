import { Application } from '@dazejs/framework';

const app = new Application(__dirname, {
  view: './views'
});

app.run(9122);