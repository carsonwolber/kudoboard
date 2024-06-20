const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

express = require('express')
const app = express()
const PORT = 4000
app.use(express.json())


const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
}); 