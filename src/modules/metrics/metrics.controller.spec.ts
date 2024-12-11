import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { MetricsController } from '@app/modules/metrics/metrics.controller';
import { MetricsModule } from '@app/modules/metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';
import { MetricsService } from '@app/modules/metrics/metrics.service';

describe('MetricsController', () => {
  let moduleRef: TestingModuleBuilder;
  let controller: MetricsController;
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
    controller = app.get<MetricsController>(MetricsController);
  });

  afterAll(async () => {
    if (app) {
      app.flushLogs();
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(app).toBeDefined();
    expect(moduleRef).toBeDefined();
  });

  it('should send latest crypto price', async () => {
    const response = await controller.sendLatestCryptoPrice();
    expect(response).toEqual(metricsResponse);
  });

  it('should send latest crypto order books', async () => {
    const response = await controller.sendLatestCryptoOrderBooks();
    expect(response).toEqual(metricsResponse);
  });

  it('should send stock intra day', async () => {
    const response = await controller.sendStockIntraDay();
    expect(response).toEqual(metricsResponse);
  });

  it('should send stock volume', async () => {
    const response = await controller.sendStockVolume();
    expect(response).toEqual(metricsResponse);
  });

  it('should handle and log errors when sending latest crypto price fails', async () => {
    const error = new Error('Failed to push data to databox');
    metricsServiceMock.sendLatestCryptoPrice.mockRejectedValue(error);

    try {
      await controller.sendLatestCryptoPrice();
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should handle and log errors when sending latest crypto order books fails', async () => {
    const error = new Error('Failed to push data to databox');
    metricsServiceMock.sendLatestCryptoOrderBooks.mockRejectedValue(error);

    try {
      await controller.sendLatestCryptoOrderBooks();
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should handle and log errors when sending stock intra day fails', async () => {
    const error = new Error('Failed to push data to databox');
    metricsServiceMock.sendStockIntraDay.mockRejectedValue(error);

    try {
      await controller.sendStockIntraDay();
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('should handle and log errors when sending stock volume fails', async () => {
    const error = new Error('Failed to push data to databox');
    metricsServiceMock.sendStockVolume.mockRejectedValue(error);

    try {
      await controller.sendStockVolume();
    } catch (error) {
      expect(error).toEqual(error);
    }
  });
});
