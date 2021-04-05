import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [TypeOrmModule.forRoot(), MetadataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
