import { logEntity, logSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.respository';
import { LogDataSource } from '../../domain/datasources/log.datasource';

export class LogRepositoryImpl implements LogRepository {
    constructor(private readonly LogDataSource: LogDataSource) {}

    async saveLog(log: logEntity): Promise<void> {
        return this.LogDataSource.saveLog(log);
    }
    async getLogs(severitylevel: logSeverityLevel): Promise<logEntity[]> {
        return this.LogDataSource.getLogs(severitylevel);
    }
}
