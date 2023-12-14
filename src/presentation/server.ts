import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';

const filesystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

export interface Server {
    start(): void;
}

export class Server implements Server {
    static start() {
        const url: string = 'http://google.com';
        CronService.createJob('*/5 * * * * *', () => {
            // new CheckService().execute('https://www.google.com');
            new CheckService(
                filesystemLogRepository,
                () => console.log(`${url} is ok`),
                (error) => console.log(error)
            ).execute(url);
        });
    }
}
