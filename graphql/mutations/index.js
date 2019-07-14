import beer from './beer';
import user from './user';
import openorder from './openorder';
import signal from './signal';

export default {
  ...beer,
  ...user,
  ...openorder,
  ...signal,
};
