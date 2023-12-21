import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { log } from 'console';
const prismaClient = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM,
};
export class PostgresLogDataSource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        const logresp = await prismaClient.logModel.create({
            data: {
                ...log,
                level,
            },
        });
        console.log(logresp);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const dbLogs = await prismaClient.logModel.findMany({
            where: {
                level,
            },
        });
        return dbLogs.map(LogEntity.fromObject);
    }
}
