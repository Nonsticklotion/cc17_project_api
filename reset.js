require('dotenv').config()
const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database mybookstore')
  await prisma.$executeRawUnsafe('CREATE Database mybookstore')
}
console.log('Reset DB..')
run()