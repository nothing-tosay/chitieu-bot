import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Help,
  InjectBot,
  On,
  Message,
  Start,
  Update,
  Command,
  Ctx,
} from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from '../../common/filters/telegraf-exception.filter';
import { AdminGuard } from '../../common/guards/admin.guard';
import { ResponseTimeInterceptor } from '../../common/interceptors/time-response.interceptor';
import { ReverseTextPipe } from '../../common/pipes/reverse-text.pipe';
import { HttpHandlerService } from '../../infra/http-handler/http-handler.service';
import { Context } from '../../interfaces/context.interface';
import { ChitieuService } from './chitieu.service';
import * as dayjs from 'dayjs';
@Update()
@UseFilters(TelegrafExceptionFilter)
@UseInterceptors(ResponseTimeInterceptor)
export class ChiTieuUpdate {
  constructor(
    private chitieuService: ChitieuService,
    private httpHandlerService: HttpHandlerService,
  ) {}

  @Start()
  async onStart(): Promise<string> {
    return `Hey, I'm Bot pro vip`;
  }

  @Help()
  async onHelp(): Promise<string> {
    return '/chitieu để thêm chi tiêu vào tháng hiện tại\n/report để in ra report tháng này\n/report `tháng-năm` để tải vể report của `tháng-năm` chỉ định, ví dụ /report 10-2022 ';
  }

  @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return 'Welcome judge';
  }

  @Command('ct')
  async onChitieu(ctx): Promise<string> {
    const commamd = this.chitieuService.transform(ctx.payload);
    if (this.chitieuService.validator(commamd)) {
      await this.httpHandlerService.post(process.env.APP_SCRIPT_API, {
        type: 'CHITIEU',
        params: commamd,
      });
    } else {
      return 'Sai format rồi ní, phải là /ct abc,giá tiền';
    }
    return 'Đã thêm chi tiêu thành công';
  }

  @Command('report')
  async onReport(ctx): Promise<string> {
    console.log(this.chitieuService.reportValidator(ctx.payload));
    if (
      this.chitieuService.reportValidator(ctx.payload) ||
      ctx.payload === ''
    ) {
      const rs: any = await this.httpHandlerService.get(
        process.env.APP_SCRIPT_API,
        { type: 'BAOCAO', params: ctx.payload },
      );
      if (rs.success) {
        return `Tải về báo cáo chi tiêu của tháng ${
          ctx.payload ? ctx.payload : dayjs().format('MM-YYYY')
        } tại link bên dưới\n${rs.data}`;
      } else {
        return rs.error;
      }
    } else {
      return 'Sai format rồi ní, phải là /report tháng-năm, ví dụ /report 10-2020';
    }
  }
}
