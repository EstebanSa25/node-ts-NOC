import { CheckService } from '../domain/use-cases/checks/check-service';
import { CronService } from './cron/cron-service';

export interface Server {
    start(): void;
}

export class Server implements Server {
    static start() {
        const url: string = 'http://localhost:3000';
        CronService.createJob('*/5 * * * * *', () => {
            // new CheckService().execute('https://www.google.com');
            new CheckService(
                () => console.log(`${url} is ok`),
                (error) => console.log(error)
            ).execute(url);
        });
    }
}
