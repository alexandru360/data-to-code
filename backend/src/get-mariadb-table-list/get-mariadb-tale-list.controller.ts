import { Controller, Get } from '@nestjs/common';
import { GetMariadbTaleListService } from './get-mariadb-tale-list.service';

@Controller('t-list')
export class GetMariadbTaleListController {
  constructor(private readonly srv: GetMariadbTaleListService) {}

  @Get()
  getTableList(): string {
    return this.srv.getTableList();
  }
}
