import { Controller, Get, Param, Query } from '@nestjs/common';
import { MetadataService } from './metadata/metadata.service';
import { Logger } from '@nestjs/common';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly serv: MetadataService) {}

  @Get('list-tables-by-dialect/:dialect')
  async listTablesByDialect(@Param('dialect') dialect: string): Promise<any[]> {
    try {
      return this.serv.getSqlStatementMetaTableList('mariadb');
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  @Get('list-cols-by-table-dialect/:dialect/:table')
  async listColsByTableDialect(
    @Param('dialect') dialect: string,
    @Param('table') table: string,
  ): Promise<any[]> {
    try {
      return this.serv.getSqlStatementMetaTableList(dialect);
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
