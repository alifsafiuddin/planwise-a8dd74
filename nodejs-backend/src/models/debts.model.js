module.exports = function (app) {
  const modelName = "debts";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "users" },
      debtName: { type: String, required: true },
      amountDue: { type: Number, required: false, max: 10000000 },
      interestRate: { type: Number, required: false, max: 10000000 },
      dueDate: { type: Date, required: false },

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
