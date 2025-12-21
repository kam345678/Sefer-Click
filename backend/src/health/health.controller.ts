import { Body, Controller, Get, Post } from '@nestjs/common';
@Controller('health')
export class HealthController {
  @Get()
  ping() {
    return { status: 'ok' };
  }
  @Post()
  check(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    console.log(`Title: ${title}, Description: ${description}`);
    return { message: 'Data received successfully' };
  }
}
