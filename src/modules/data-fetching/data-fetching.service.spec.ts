import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';
import { DataFetchingModule } from '@app/modules/data-fetching/data-fetching.module';
import { ConfigModule } from '@nestjs/config';

describe('DataFetchingService', () => {
  let moduleRef: TestingModuleBuilder;
  let dataFetchingService: DataFetchingService;
  let app: TestingModule;

  beforeAll(async () => {
    moduleRef = Test.createTestingModule({
      imports: [DataFetchingModule, ConfigModule.forRoot({ isGlobal: true })],
    });

    app = await moduleRef.compile();
    dataFetchingService = app.get<DataFetchingService>(DataFetchingService);
  });

  afterAll(async () => {
    if (app) {
      app.flushLogs();
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(dataFetchingService).toBeDefined();
    expect(app).toBeDefined();
    expect(moduleRef).toBeDefined();
  });

  it('should fetch latest crypto bars', async () => {
    const response = await dataFetchingService.fetchLatestCryptoBars('BTC/USD');
    expect(response).toBeDefined();
    expect(response).toHaveProperty('bars');
  });

  it('should fetch latest crypto order books', async () => {
    const response =
      await dataFetchingService.fetchLatestCryptoOrderBooks('BTC/USD');
    expect(response).toBeDefined();
    expect(response).toHaveProperty('orderbooks');
  });

  it('should fetch stock intra day', async () => {
    const response = await dataFetchingService.fetchStockIntraDay(
      'AAPL',
      '5min',
    );
    expect(response).toBeDefined();
    expect(response).toHaveProperty('Meta Data');
    expect(response).toHaveProperty('Time Series (5min)');
  });

  it('should fetch daily stock volume', async () => {
    const response = await dataFetchingService.fetchDailyStockVolume('AAPL');

    expect(response).toBeDefined();
    expect(response).toHaveProperty('Meta Data');
    expect(response).toHaveProperty('Time Series (Daily)');
  });

  it('should handle and log errors when fetching crypto bars fails', async () => {
    const spy = jest.spyOn(dataFetchingService, 'fetchLatestCryptoBars');
    spy.mockRejectedValue(new Error('Failed to fetch crypto bars'));

    try {
      await dataFetchingService.fetchLatestCryptoBars('BTC/USD');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Failed to fetch crypto bars');
    }

    spy.mockRestore();
  });

  it('should handle and log errors when fetching orderbooks fails', async () => {
    const spy = jest.spyOn(dataFetchingService, 'fetchLatestCryptoOrderBooks');
    spy.mockRejectedValue(new Error('Failed to fetch orderbooks'));

    try {
      await dataFetchingService.fetchLatestCryptoOrderBooks('BTC/USD');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Failed to fetch orderbooks');
    }

    spy.mockRestore();
  });

  it('should handle and log errors when fetching stock intraday fails', async () => {
    const spy = jest.spyOn(dataFetchingService, 'fetchStockIntraDay');
    spy.mockRejectedValue(new Error('Failed to fetch stock intraday'));

    try {
      await dataFetchingService.fetchStockIntraDay('AAPL', '5min');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Failed to fetch stock intraday');
    }

    spy.mockRestore();
  });

  it('should handle and log errors when fetching daily stock volume fails', async () => {
    const spy = jest.spyOn(dataFetchingService, 'fetchDailyStockVolume');
    spy.mockRejectedValue(new Error('Failed to fetch daily stock volume'));

    try {
      await dataFetchingService.fetchDailyStockVolume('AAPL');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBe('Failed to fetch daily stock volume');
    }

    spy.mockRestore();
  });
});
