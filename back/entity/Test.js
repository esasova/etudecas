const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    wish: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Test', testSchema);
