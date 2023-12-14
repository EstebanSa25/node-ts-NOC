import { logEntity, logSeverityLevel } from '../entities/log.entity';

export abstract class LogDataSource {
    abstract saveLog(log: logEntity): Promise<void>;
    abstract getLogs(severitylevel: logSeverityLevel): Promise<logEntity[]>;
}
