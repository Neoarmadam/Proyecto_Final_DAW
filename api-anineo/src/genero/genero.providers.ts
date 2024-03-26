import { DataSource } from 'typeorm';
import { Genero } from './genero.entity';

export const generoProviders = [
  {
    provide: 'GENERO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Genero),
    inject: ['DATA_SOURCE'],
  },
];