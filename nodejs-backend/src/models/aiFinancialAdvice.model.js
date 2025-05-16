
    module.exports = function (app) {
        const modelName = 'ai_financial_advice';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            adviceId: { type:  String , required: true },
userId: { type: Schema.Types.ObjectId, ref: "users" },
adviceSummary: { type:  String , required: true },
investmentTips: { type:  String , required: true },
budgetTips: { type:  String , required: true },
aiModelVersion: { type:  String , required: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };