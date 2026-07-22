type DatabaseType = 'mysql' | 'postgresql' | 'mongodb';
interface DatabaseConfig {
  type: DatabaseType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
const DbConfig: DatabaseConfig = {
  type: 'postgresql',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: '',
};

export class ConsulHelper {
  public static GetDatabaseJson(databaseURL: string): DatabaseConfig {
    const [left, right] = databaseURL.split('@');
    const [type, userAndPassword] = left.split('://');
    const [username, password] = userAndPassword.split(':');

    const [hostAndPort, database] = right.split('/');
    const [host, strPort] = hostAndPort.split(':');
    const port = parseInt(strPort, 10);

    return Object.assign({}, DbConfig, {
      type,
      host,
      port,
      username,
      password,
      database,
    });
  }

  public static GetDatabaseURL(databaseJson: DatabaseConfig): string {
    const { type, host, port, username, password, database } = databaseJson;
    return `${type}://${username}:${password}@${host}:${port}/${database}`;
  }
}
