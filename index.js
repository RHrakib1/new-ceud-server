const express = require('express')
const app = express()
const port = 1000
const cors = require('cors')

app.use(cors())
app.use(express.json())
// rakibhasanmd457
// uWqd61M7nit12FTs


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://rakibhasanmd457:uWqd61M7nit12FTs@cluster0.ox4at.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    const database = client.db("dataHeadPhone");
    const headCollection = database.collection("headphone");
    try {
        await client.connect();

        app.get('/headphone', async (req, res) => {
            const coures = headCollection.find()
            const result = await coures.toArray()
            res.send(result)

        })
        // update now
        app.get('/headphone/:id', async (req, res) => {
            const id = req.params.id
            const quary = { _id: new ObjectId(id) }
            const result = await headCollection.findOne(quary)
            res.send(result)
        })
        app.put('/headphone/:id', async (req, res) => {
            const id = req.params.id
            const user = req.body
            const filter = { _id: new ObjectId(id) }
            const option = { upsert: true }
            const userhead = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
            const result = await headCollection.updateOne(filter, userhead, option)
            res.send(result)
        })


        app.post('/headphone', async (req, res) => {
            const user = req.body
            const result = await headCollection.insertOne(user)
            console.log(result);
            res.send(result)
        })

        app.delete('/headphone/:id', async (req, res) => {
            const id = req.params.id
            console.log('this is a deleted id ', id);
            const quary = { _id: new ObjectId(id) }
            const result = await headCollection.deleteOne(quary)
            res.send(result)

        })






        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Hello Worldfddddd!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})