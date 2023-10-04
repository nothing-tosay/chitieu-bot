import { Global, Module } from '@nestjs/common';
import { HttpHandlerService } from './http-handler.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpHandlerService],
  exports: [HttpHandlerService],
})
export class HttpHandlerModule {}
