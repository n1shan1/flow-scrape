import {
  Log,
  LogCollector,
  LogFunction,
  LogLevel,
  LogLevels,
} from "@/types/logs/log";

export function CreateLogCollector(): LogCollector {
  const logs: Log[] = [];
  const getAll = () => logs;

  const logFunctions = {} as Record<LogLevel, LogFunction>;
  LogLevels.forEach(
    (level) =>
      (logFunctions[level] = (message: string) => {
        logs.push({
          level: level,
          message: message,
          timestamp: new Date(),
        });
      })
  );
  return {
    getAll,
    ...logFunctions,
  };
}
