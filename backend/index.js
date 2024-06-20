const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

express = require('express')
const app = express()
const PORT = 3000
app.use(express.json())