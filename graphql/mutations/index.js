import beer from './beer';
import user from './user';
import openorder from './openorder';

export default {
  ...beer,
  ...user,
  ...openorder
};
