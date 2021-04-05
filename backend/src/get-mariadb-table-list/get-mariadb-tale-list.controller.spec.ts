import { Test, TestingModule } from '@nestjs/testing';
import { GetMariadbTaleListController } from './get-mariadb-tale-list.controller';

describe('GetMariadbTaleListController', () => {
  let controller: GetMariadbTaleListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetMariadbTaleListController],
    }).compile();

    controller = module.get<GetMariadbTaleListController>(GetMariadbTaleListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
