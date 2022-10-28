const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

    //check if we are running in production mode
    if (process.env.NODE_ENV === 'production') {
        prisma = new PrismaClient()
    } else {
    //check if there is already a connection to the database
      if (!global.prisma) {
        prisma.db = new PrismaClient()
      }
      prisma = global.db
    }
    
module.export = { prisma };