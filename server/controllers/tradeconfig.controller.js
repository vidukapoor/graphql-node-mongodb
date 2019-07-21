// trade related queries
import TradeConfigModel from '../../models/tradeConfig.model';

class TradeConfigModelWrapper {
  tradeConfigInstance(params) {
    return TradeConfigModel(params);
  }
  
  async activeConfig() {
    const users = await TradeConfigModel.find({ isActive: true }).exec();
    return users;
  }

  async upsetConfig(matchParams, newParams){
    const trade = await TradeConfigModel.findOneAndUpdate(matchParams, { $set: newParams }, { upsert: true, new: true });
    return trade;
  }
  
  async deleteById(id){
    const trade = await TradeConfigModel.findByIdAndRemove(id);
    return trade;
  }
}


const TradeConfig = new TradeConfigModelWrapper();
export default TradeConfig;