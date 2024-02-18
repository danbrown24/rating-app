class Logger {
  static instance: Logger;

  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
    }
    return Logger.instance;
  }

  info(...args: any) {
    console.log(...args);
  }

  warn(...args: any) {
    console.warn(...args);
  }

  error(...args: any) {
    console.error(...args);
  }
}

const instance = new Logger();
Object.freeze(instance);

export default instance;
