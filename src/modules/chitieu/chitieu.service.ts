import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
@Injectable()
export class ChitieuService {
  chitieu(text: string): string {
    return `Echo: ${text}`;
  }

  validator(input: string) {
    const rs = input.split(',');
    if (rs.length !== 2) return false;
    const money = rs[1].replaceAll('k', '000');
    if (isNaN(+money[1])) return false;
    return true;
  }

  reportValidator(input: string) {
    var regex = /^(0[1-9]|1[0-2])-(20)\d{2}$/; // định dạng MM-YYYY
    return regex.test(input);
  }
}
