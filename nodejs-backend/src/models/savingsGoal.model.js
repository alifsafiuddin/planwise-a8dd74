module.exports = function (app) {
  const modelName = "savings_goal";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "users" },
      goalName: { type: String, required: true },
      targetAmount: { type: Number, required: false, max: 10000000 },
      currentAmount: { type: Number, required: false, max: 10000000 },
      deadline: { type: Date, required: false },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
