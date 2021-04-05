import { Test, TestingModule } from '@nestjs/testing';
import { GetMariadbTaleListService } from './get-mariadb-tale-list.service';

describe('GetMariadbTaleListService', () => {
  let service: GetMariadbTaleListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetMariadbTaleListService],
    }).compile();

    service = module.get<GetMariadbTaleListService>(GetMariadbTaleListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
