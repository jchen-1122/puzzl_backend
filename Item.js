const mongoose = require("mongoose")

const item = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
})

module.exports = Item = mongoose.model('item', item);