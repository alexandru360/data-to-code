import { Injectable, Logger } from '@nestjs/common';
import { ConnectionTypeMetaEntity } from './connection-type-meta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetadataService {
  private readonly logger = new Logger(MetadataService.name);

  constructor(
    @InjectRepository(ConnectionTypeMetaEntity)
    private connRepository: Repository<ConnectionTypeMetaEntity>,
  ) {}

  // getSqlTableList(parDbName: string): Promise<ConnectionTypeMetaEntity[]> {
  //   return getConnection().manager.find(ConnectionTypeMetaEntity);
  // }

  async getSqlStatementMetaTableList(
    dialectType: string,
  ): Promise<ConnectionTypeMetaEntity[]> {
    return await this.connRepository.find({
      where: { connectionType: dialectType },
    });
  }
}
