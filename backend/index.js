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


app.post('/boards', async (req, res) => {
    const { title, image, category, author } = req.body;
    const newBoard = await prisma.board.create({
        data: {
            title, 
            image, 
            category, 
            author
        }
    })
    res.status(201).json(newBoard);
});


app.post('/boards/:boardId/cards', async (req,res) => {
    const {title, image, message, author, votes} = req.body; 
    const { boardId } = req.params;
    const newCard = await prisma.card.create({
        data: {
            title, 
            message, 
            image, 
            author,
            votes,
            boardId: parseInt(boardId)
        }
    })
    res.status(201).json(newCard);
});


app.put('/boards/:boardId/cards/:cardId', async (req, res) => {
    const { cardId, boardId } = req.params;

    try {
        // Fetch the specific card from the database
        const card = await prisma.card.findUnique({
            where: { id: parseInt(cardId) }
        });

        if (card) {
            // Update the card with new data from the request body
            const updatedCard = await prisma.card.update({
                where: { id: parseInt(cardId) },
                data: req.body
            });
            res.json(updatedCard);
        } else {
            res.status(404).send('Card not found');
        }
    } catch (error) {
        console.error('Failed to update card:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.delete('/boards/:boardId/cards/:cardId', async (req, res) => {
    const { cardId } = req.params;

    try {
        const deletedCard = await prisma.card.delete({
            where: { id: parseInt(cardId) }
        });
        res.status(204).send();
    } catch (error) {
        console.error('Failed to delete card:', error);
        res.status(500).send('Internal Server Error');
    }
});


const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
}); 