
    module.exports = function (app) {
        const modelName = 'alerts';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            userId: { type: Schema.Types.ObjectId, ref: "users" },
message: { type:  String , required: true },
type: { type:  String , maxLength: 150, index: true, trim: true },
status: { type: Boolean, required: false },

            
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