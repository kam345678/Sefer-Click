import { Controller, Get } from '@nestjs/common';

@Controller('scan')
export class ScanController {
    @Get()
    testScan() {
      return {
      message: 'Scan API is working',
    };
  }
}