import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { MetricsService } from '@app/modules/metrics/metrics.service';
import { MetricsModule } from '@app/modules/metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';

describe('MetricsService', () => {
  let moduleRef: TestingModuleBuilder;
  let metricsService: MetricsService;
  let app: TestingModule;

  const metricsResponse = {
    status: 'success',
    message: 'Data pushed successfully',
  };

  const metricsServiceMock = {
    sendLatestCryptoPrice: jest.fn().mockResolvedValue(metricsResponse),
    sendLatestCryptoOrderBooks: jest.fn().mockResolvedValue(metricsResponse),
    sendStockIntraDay: jest.fn().mockResolvedValue(metricsResponse),
    sendStockVolume: jest.fn().mockResolvedValue(metricsResponse),
  };

  beforeAll(async () => {
    moduleRef = Test.createTestingModule({
      imports: [MetricsModule, ConfigModule.forRoot({ isGlobal: true })],
    })
      .overrideProvider(MetricsService)
      .useValue(metricsServiceMock);

    app = await moduleRef.compile();
    metricsService = app.get<MetricsService>(MetricsService);
  });

  afterAll(async () => {
    if (app) {
      app.flushLogs();
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(metricsService).toBeDefined();
    expect(app).toBeDefined();
    expect(moduleRef).toBeDefined();
  });

  it('should send latest crypto price', async () => {
    const response = await metricsService.sendLatestCryptoPrice();
    expect(response).toEqual(metricsResponse);
  });

  it('should send latest crypto order books', async () => {
    const response = await metricsService.sendLatestCryptoOrderBooks();
    expect(response).toEqual(metricsResponse);
  });

  it('should send stock intra day', async () => {
    const response = await metricsService.sendStockIntraDay();
    expect(response).toEqual(metricsResponse);
  });

  it('should send stock volume', async () => {
    const response = await metricsService.sendStockVolume();
    expect(response).toEqual(metricsResponse);
  });

  it('should handle and log errors when sending latest crypto price fails', async () => {
    const error = new Error('Failed to push data to databox');
    metricsServiceMock.sendLatestCryptoPrice.mockRejectedValue(error);

    try {
      await metricsService.sendLatestCryptoPrice();
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should handle and log errors when sending latest crypto order books fails', async () => {
    const error = new Error('Failed to push data to databox');
    metricsServiceMock.sendLatestCryptoOrderBooks.mockRejectedValue(error);

    try {
      await metricsService.sendLatestCryptoOrderBooks();
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should handle and log errors when sending stock intra day fails', async () => {
    const error = new Error('Failed to push data to databox');
    metricsServiceMock.sendStockIntraDay.mockRejectedValue(error);

    try {
      await metricsService.sendStockIntraDay();
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should handle and log errors when sending stock volume fails', async () => {
    const error = new Error('Failed to push data to databox');
    metricsServiceMock.sendStockVolume.mockRejectedValue(error);

    try {
      await metricsService.sendStockVolume();
    } catch (error) {
      expect(error).toEqual(error);
    }
  });
});
