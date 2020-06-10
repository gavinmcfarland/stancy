import { stancy } from './server';
import { client } from './client';

const myModule = (module.exports = stancy);
myModule.client = client;
