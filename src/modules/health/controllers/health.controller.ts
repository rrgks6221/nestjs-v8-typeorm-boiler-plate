import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly configService: ConfigService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // server health check
      () =>
        this.http.pingCheck(
          'server-health',
          this.configService.get<string>('SERVER_URL'),
        ),
      // storage check 전체 용량의 50%
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      // memory heap 체크 150MB
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.db.pingCheck('database'),
    ]);
  }
}
