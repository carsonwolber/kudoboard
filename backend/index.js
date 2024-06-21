const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors');
express = require('express')
const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors());

app.get('/boards', async (req,res) => {
    const cards = await prisma.board.findMany()
    res.status(200).json(cards)
})

app.post('/boards', async (req, res) => {
    const { title, image, category, author } = req.body;
    console.log(req.body)
    const newCard = await prisma.board.create({
        data: {
            title, 
            image, 
            category, 
            author
        }
    })
    res.status(201).json(newCard);
});


app.get('/boards/:boardId', async (req, res) => {
    const { boardId } = req.params;
    try {
        const board = await prisma.board.findUnique({
            where: { id: parseInt(boardId) },
            include: {
                cards: true,
            }
        });
        if (board) {
            res.status(200).json(board);
        } else {
            res.status(404).send('Board not found');
        }
    } catch (error) {
        console.error('Failed to fetch board:', error);
        res.status(500).send('Internal Server Error');
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
}); 