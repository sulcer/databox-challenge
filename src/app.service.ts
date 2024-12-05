import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  private formatUptime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  }

  healthCheck() {
    const uptime = process.uptime();
    const formattedUptime = this.formatUptime(uptime);
    const timestamp = new Date().toUTCString();

    return {
      status: 'Up and running 🚀',
      uptime: formattedUptime,
      timestamp: timestamp,
      environment: this.configService.get('NODE_ENV') ?? 'development',
    };
  }
}
