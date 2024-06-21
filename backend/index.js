const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

express = require('express')
const app = express()
const PORT = 3000
app.use(express.json())

app.get('/cards', async (req,res) => {
    const cards = await prisma.kudos.findMany()
    res.status(200).json(cards)
})

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
}); 