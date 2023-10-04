import { Module } from '@nestjs/common';
import { HttpHandlerModule } from '../../infra/http-handler/http-handler.module';
import { ChitieuService } from './chitieu.service';
import { ChiTieuUpdate } from './chitieu.update';

@Module({
  providers: [ChitieuService, ChiTieuUpdate],
  imports: [HttpHandlerModule],
})
export class ChitieuModule {}
