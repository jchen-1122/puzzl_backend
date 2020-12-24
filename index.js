const cors = require("cors")
const express = require("express")
const stripe = require("stripe")("sk_test_51I1il1GwVI7nrqUdVQ5Qz3Pel4mw9tHnlJeq1hrfj6HCvAHMm2HcfuhZbheSC41AgCwL9qHCRnDUXwDJqBjhvZGu00zGsBIdFP")
const uuid = require("uuid")
const mongoose = require("mongoose")

const app = express()
const route = express.Router()

const Item = require("./Item")

// middleware
app.use(express.json())
app.use(cors())
app.use('/item', require('./ItemRoute'))


// routes
app.get("/", (req, res) => {
    res.send("this works")
})

app.post("/payment", async (req, res) => {
    const {token} = req.body;
    const idempotencyKey = uuid.v4()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: req.body.total.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: req.body.total.name
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})

route.post('/item', (req, res) => {
    
})

const uri = "mongodb+srv://jchen1122:puzzl123@puzzlcluster.54hnb.mongodb.net/test?authSource=admin&replicaSet=atlas-s0mvpl-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected...")
})
.catch(err => console.log(err))


app.listen(3000, () => console.log("Listening on Port 3000"))