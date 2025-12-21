import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScanService } from './scan.service';
import { ScanUrlDto } from './dto/scan-url.dto';

@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  // @Post()
  // scan(@Req() req: Request) {
  //   console.log('📦 [BK] raw body:', (req as any).body);
  //   return { ok: true };
  // }
  @Post()
  scan(@Body() dto: ScanUrlDto) {
    console.log('📥 [BK] Controller received URL:', dto.url);
    return this.scanService.scan(dto.url);
  }

  @Get('history')
  history() {
    return this.scanService.getHistory();
  }
}
