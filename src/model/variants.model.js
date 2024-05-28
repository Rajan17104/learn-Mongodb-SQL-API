const mongoose = require("mongoose");

const attributesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  value: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
});

const varinatsSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    attributes: [attributesSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Variants = mongoose.model('Variants', varinatsSchema);

module.exports = Variants;
