import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { DataFetchingController } from '@app/modules/data-fetching/data-fetching.controller';
import { DataFetchingModule } from '@app/modules/data-fetching/data-fetching.module';
import { ConfigModule } from '@nestjs/config';
import { DataFetchingService } from '@app/modules/data-fetching/data-fetching.service';

describe('DataFetchingController', () => {
  let moduleRef: TestingModuleBuilder;
  let controller: DataFetchingController;
  let app: TestingModule;

  const cryptoBars = {
    bars: [
      {
        t: '2021-10-01T00:00:00Z',
        o: 43500,
        h: 43500,
        l: 43500,
        c: 43500,
        v: 0,
      },
    ],
  };

  const cryptoOrderBooks = {
    orderbooks: [
      {
        t: '2021-10-01T00:00:00Z',
        a: [{ p: 43500, s: 0 }],
        b: [{ p: 43500, s: 0 }],
      },
    ],
  };

  const stockIntraDay = {
    'Meta Data': {
      '1. Information':
        'Intraday (5min) open, high, low, close prices and volume',
      '2. Symbol': 'AAPL',
      '3. Last Refreshed': '2021-10-01 20:00:00',
      '4. Interval': '5min',
      '5. Output Size': 'Compact',
      '6. Time Zone': 'US/Eastern',
    },
    'Time Series (5min)': {
      '2021-10-01 20:00:00': {
        '1. open': '141.0400',
        '2. high': '141.0400',
        '3. low': '141.0400',
        '4. close': '141.0400',
        '5. volume': '100',
      },
    },
  };

  const stockVolume = {
    'Meta Data': {
      '1. Information': 'Daily Time Series with Splits and Dividend Events',
      '2. Symbol': 'AAPL',
    },
    'Time Series (Daily)': {
      '2021-10-01': {
        '1. open': '142.4700',
        '2. high': '142.9200',
        '3. low': '141.9900',
        '4. close': '142.9000',
        '5. volume': '100',
      },
    },
  };

  const dataFetchingServiceMock = {
    fetchLatestCryptoBars: jest.fn().mockResolvedValue(cryptoBars),
    fetchLatestCryptoOrderBooks: jest.fn().mockResolvedValue(cryptoOrderBooks),
    fetchStockIntraDay: jest.fn().mockResolvedValue(stockIntraDay),
    fetchDailyStockVolume: jest.fn().mockResolvedValue(stockVolume),
  };

  beforeAll(async () => {
    moduleRef = Test.createTestingModule({
      imports: [DataFetchingModule, ConfigModule.forRoot({ isGlobal: true })],
    })
      .overrideProvider(DataFetchingService)
      .useValue(dataFetchingServiceMock);

    app = await moduleRef.compile();
    controller = app.get<DataFetchingController>(DataFetchingController);
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

  it('should fetch latest crypto bars', async () => {
    const response = await controller.getLatestCryptoBars('BTC/USD');
    expect(response).toEqual(cryptoBars);
  });

  it('should fetch latest crypto order books', async () => {
    const response = await controller.getLatestCryptoOrderBooks('BTC/USD');
    expect(response).toEqual(cryptoOrderBooks);
  });

  it('should fetch stock intra day', async () => {
    const response = await controller.getStockIntraDay('AAPL', '5min');
    expect(response).toEqual(stockIntraDay);
  });

  it('should fetch daily stock volume', async () => {
    const response = await controller.getDailyStockVolume('AAPL');
    expect(response).toEqual(stockVolume);
  });

  it('should handle and log errors when fetching latest crypto bars fails', async () => {
    const spy = jest.spyOn(dataFetchingServiceMock, 'fetchLatestCryptoBars');
    spy.mockRejectedValue(new Error('Failed to fetch latest crypto bars'));

    try {
      await controller.getLatestCryptoBars('BTC/USD');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual('Failed to fetch latest crypto bars');
    }
  });

  it('should handle and log errors when fetching latest crypto order books fails', async () => {
    const spy = jest.spyOn(
      dataFetchingServiceMock,
      'fetchLatestCryptoOrderBooks',
    );
    spy.mockRejectedValue(
      new Error('Failed to fetch latest crypto order books'),
    );

    try {
      await controller.getLatestCryptoOrderBooks('BTC/USD');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual(
        'Failed to fetch latest crypto order books',
      );
    }
  });

  it('should handle and log errors when fetching stock intraday fails', async () => {
    const spy = jest.spyOn(dataFetchingServiceMock, 'fetchStockIntraDay');
    spy.mockRejectedValue(new Error('Failed to fetch stock intraday'));

    try {
      await controller.getStockIntraDay('AAPL', '5min');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual('Failed to fetch stock intraday');
    }
  });

  it('should handle and log errors when fetching daily stock volume fails', async () => {
    const spy = jest.spyOn(dataFetchingServiceMock, 'fetchStockIntraDay');
    spy.mockRejectedValue(new Error('Failed to fetch daily stock volume'));

    try {
      await controller.getDailyStockVolume('AAPL');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual('Failed to fetch daily stock volume');
    }
  });
});
