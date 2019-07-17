import beer from './beer';
import user from './user';
import openorder from './openorder';
import signal from './signal';
import trade from './trade';

export default {
  ...beer,
  ...user,
  ...openorder,
  ...signal,
  ...trade,
};
