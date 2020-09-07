import { Module } from '@nestjs/common';
import { MeetingsController } from './meetings.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [MeetingsController],
})
export class MeetingsModule {}
