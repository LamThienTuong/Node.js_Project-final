// Read more about sub-document: https://mongoosejs.com/docs/subdocs.html
const orderDetailsSchema = new Schema({
  productId: Schema.Types.ObjectId,
  quantity: 0,
  price: 0,
});

const orderSchema = new Schema({
  name: String,
  orderDate: Date,
  shippedDate: Date,
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  paymentType: {
    type: String,
    enum: ['cod', 'paypal', 'creditcard', 'banktransfer'],
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipping', 'delivered'],
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'unpaid'],
  },
  items: [orderDetailsSchema],
});