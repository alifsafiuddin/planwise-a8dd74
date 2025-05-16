module.exports = function (app) {
  const modelName = "incomes";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "users" },
      source: { type: String, required: true, maxLength: null },
      amount: { type: Number, required: false, max: 1000000 },
      dateReceived: { type: Date, required: false },

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
