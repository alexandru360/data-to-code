import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionTypeMetaEntity } from './connection-type-meta.entity';
import { MetadataService } from './metadata.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectionTypeMetaEntity])],
  providers: [MetadataService],
  exports: [TypeOrmModule, MetadataService],
})
export class MetadataModule {}
