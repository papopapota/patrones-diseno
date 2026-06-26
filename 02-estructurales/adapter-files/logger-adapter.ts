import { Logger } from 'jsr:@deno-library/logger';
import { COLORS } from '../../helpers/colors.ts';

// TODO: Implementar el LoggerAdapter
interface ILoggerAdapter {
    file: string;
    writeLog(message: string): void
    writeError(message: string): void
    writeWarning(message: string): void
}


export class DenoLoggerAdapter implements ILoggerAdapter {
    public file: string;
    private logger = new Logger();

    constructor(file: string) {
        this.file = file;
    }

    writeLog(message: string): void {
        this.logger.info(`[ ${this.file} Log] %c${message}`, COLORS.green);
    }
    writeError(message: string): void {
        this.logger.error(`[ ${this.file} Log] %c${message}`, COLORS.red);
    }
    writeWarning(message: string): void {
        this.logger.warn(`[ ${this.file} Log] %c${message}`, COLORS.yellow);
    }

}


// const logger = new Logger();

// logger.info('Este es un mensaje de log');
// logger.error('Este es un mensaje de error');
// logger.warning('Este es un mensaje de advertencia');


