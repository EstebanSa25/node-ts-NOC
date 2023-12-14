import fs from 'fs';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { logEntity, logSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDataSource implements LogDataSource {
    private readonly logPath: string = 'logs/';
    private readonly allLogsPath: string = `${this.logPath}logs-all.log`;
    private readonly mediumLogsPath: string = `${this.logPath}logs-medium.log`;
    private readonly highLogsPath: string = `${this.logPath}logs-high.log`;

    constructor() {
        this.createLogsFiles();
    }
    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
            (path) => {
                if (fs.existsSync(path)) return;
                fs.writeFileSync(path, '');
            }
        );
    };
    async saveLog(newLog: logEntity): Promise<void> {
        const logAsJson = `${JSON.stringify(newLog)}\n`;
        fs.appendFileSync(this.allLogsPath, logAsJson);
        if (newLog.level === logSeverityLevel.low) return;
        if (newLog.level === logSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
            return;
        }
        fs.appendFileSync(this.highLogsPath, logAsJson);
    }

    private getLogsFromFile = (path: string): logEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(logEntity.fromJson);
        return logs;
    };

    async getLogs(severitylevel: logSeverityLevel): Promise<logEntity[]> {
        switch (severitylevel) {
            case logSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case logSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case logSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`Invalid ${severitylevel}`);
        }
    }
    // ...
}
