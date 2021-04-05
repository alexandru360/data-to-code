import { getConnectionManager } from 'typeorm';

export async function metadataConn() {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create({
    name: 'default',
    type: 'sqlite',
    database: 'nest-api.db',
    synchronize: false,
    logging: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
  });

  await connection.connect();
}
