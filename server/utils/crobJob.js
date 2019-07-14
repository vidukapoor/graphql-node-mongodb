import schedule from 'node-schedule';
import { BinanceClass } from './index';

const event = schedule.scheduleJob("*/1 * * * *", function () {
  BinanceClass.getBinanceUsers();
  console.log('Putting open orders every 1 minutes');
});
