import { IsNotEmpty, IsUrl } from 'class-validator';

export class ScanUrlDto {
  @IsNotEmpty({ message: 'url is required' })
  @IsUrl({}, { message: 'url must be a valid URL' })
  url: string;
}
