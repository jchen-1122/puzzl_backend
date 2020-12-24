const express = require("express")
const mongoose = require("mongoose")

const Item = require("./Item")
const route = express.Router()

route.post('/post', async (req, res) => {
    const {name, description, price, image} = req.body
    let item = {}
    item.name = name;
    item.description = description
    item.price = price
    item.image = image
    let itemModel = new Item(item)
    await itemModel.save()
    res.json(itemModel)
})

route.get('/get', async (req, res) => {
    try {
        const all = await Item.find({})
        if (!all) {
            return res.status(400).send({error: 'Document not found (No Items)'})
        }
        res.send(all)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = route