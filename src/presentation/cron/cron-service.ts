import { CronJob } from 'cron';
import { on } from 'events';
export interface CronService {
    createJob(): void;
}
type CronTime = string | Date;
type onTick = () => void;

export class CronService implements CronService {
    static createJob(cronTime: CronTime, onTick: onTick): CronJob {
        const job = new CronJob(cronTime, onTick);
        job.start();
        return job;
    }
}
