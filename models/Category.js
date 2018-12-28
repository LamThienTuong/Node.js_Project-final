const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: String, // Category's id is not ObjectId, so we must declare its type explicitly
  name: String,
  iconName: String,
  descriptions: String
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
