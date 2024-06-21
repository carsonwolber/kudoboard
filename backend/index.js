const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors');
express = require('express')
const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors());

app.get('/cards', async (req,res) => {
    const cards = await prisma.kudos.findMany()
    res.status(200).json(cards)
})

app.post('/cards', async (req, res) => {
    const { title, image, category, author } = req.body;
    console.log(req.body)
    const newCard = await prisma.kudos.create({
        data: {
            title, 
            image, 
            category, 
            author
        }
    })
    res.status(201).json(newCard);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
}); 