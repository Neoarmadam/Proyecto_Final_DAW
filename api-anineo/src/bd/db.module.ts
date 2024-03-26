import { Module } from '@nestjs/common';
import { dbProviders } from './bd.providers';

@Module({
  providers: [...dbProviders],
  exports: [...dbProviders],
})
export class DatabaseModule {}