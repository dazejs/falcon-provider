import { FalconAgent, FalconProvider } from '../../src';

export default {

  cluster: true,

  workers: 2,

  agents: [
    FalconAgent
  ],

  providers: [
    FalconProvider
  ]
};