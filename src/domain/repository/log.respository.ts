import { logEntity, logSeverityLevel } from '../entities/log.entity';

export abstract class LogRepository {
    abstract saveLog(log: logEntity): Promise<void>;
    abstract getLogs(severitylevel: logSeverityLevel): Promise<logEntity[]>;
}
