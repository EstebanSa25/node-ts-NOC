import { logEntity, logSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.respository';
export interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
    constructor(
        private readonly LogRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) {}

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new logEntity(
                `$Service ${url} is working`,
                logSeverityLevel.low
            );
            this.LogRepository.saveLog(log);
            this.successCallback && this.successCallback();
            return true;
        } catch (error) {
            const errorMessage: string = `${url} is not ok.${error}`;
            const log = new logEntity(errorMessage, logSeverityLevel.high);
            this.LogRepository.saveLog(log);
            this.errorCallback && this.errorCallback(errorMessage);
            return false;
        }
    }
}
