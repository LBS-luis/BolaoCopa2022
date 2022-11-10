import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

async function Seed(){
    const user = await prisma.user.create({
        data: {
            name:'John Doe',
            email: 'john.Doe@gmail.com',
            password: '123',
            avatarUrl: 'https://github.com/LBS-luis.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create:{
                    userId: user.id,
                }
            }
        }        
    })

    await prisma.game.create({
        data: {
            date:'2022-11-05T12:00:00.019Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })


    await prisma.game.create({
        data: {
            date:'2022-11-10T15:00:00.019Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 0,

                    participant: {
                        connect: {
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })

   
}
Seed()