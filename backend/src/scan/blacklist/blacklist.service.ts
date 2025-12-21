import { Injectable } from '@nestjs/common';

@Injectable()
export class BlacklistService {
  private readonly domains = ['malware.com', 'phishing.test'];

  isBlacklisted(url: string): boolean {
    return this.domains.some((domain) => url.includes(domain));
  }
}
