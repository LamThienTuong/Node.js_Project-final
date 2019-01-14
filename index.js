const app = require('./app');

const PORT = process.env.PORT ||3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/NordicShop';

app.start(PORT, MONGO_URL);
