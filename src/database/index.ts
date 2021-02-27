import {Connection, ConnectionOptions, createConnection, getConnectionOptions} from "typeorm";

export const createDatabaseConnection = async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  const options = {
    ...defaultOptions,
    database: process.env.NODE_ENV === 'test'
      ? "./src/database/database.test.sqlite"
      : defaultOptions.database
  } as ConnectionOptions;

  return createConnection(options);
}