import { log } from 'console';
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase, logModel } from './data/mongo';
import { Server } from './presentation/server';
import { PrismaClient } from '@prisma/client';

(async () => {
    main();
})();

async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });
    // Server.start();

    const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         message: 'test message desde prisma',
    //         origin: 'app.ts',
    //         level: 'HIGH',
    //     },
    // });
    // console.log(newLog);
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH',
    //     },
    // });
    // console.log(logs);
    //Crear una coleccion=tables,documento=registro

    Server.start();
}
