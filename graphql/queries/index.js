import beer from './beer';
import brewery from './brewery';
import tradeconfig from './tradeconfig';
import user from './user';

export default {
  // ...beer,
  // ...brewery,
  ...user,
  ...tradeconfig,
};
