import { log } from 'console';
import { logModel } from '../../data/mongo';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class MongoLogDataSource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await logModel.create(log);
        console.log('Mongo Log created', newLog.id);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await logModel.find({ level: severityLevel });
        return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
    }
}
