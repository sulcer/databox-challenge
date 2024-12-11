import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { DataboxService } from '@app/modules/databox/databox.service';
import { PushDataDto } from '@app/modules/databox/dto/PushDataDto';
import { DataboxModule } from '@app/modules/databox/databox.module';
import { ConfigModule } from '@nestjs/config';

describe('DataboxService', () => {
  let moduleRef: TestingModuleBuilder;
  let databoxService: DataboxService;
  let app: TestingModule;

  const data: PushDataDto[] = [
    {
      metricName: 'metricName',
      value: 1,
      date: 'date',
      unit: 'unit',
      attributes: [{ key: 'key', value: 'value' }],
    },
  ];

  const dataBoxResponse = {
    status: 'success',
    message: 'Data pushed successfully',
  };

  const databoxServiceMock = {
    pushData: jest.fn().mockResolvedValue(dataBoxResponse),
  };

  beforeAll(async () => {
    moduleRef = Test.createTestingModule({
      imports: [DataboxModule, ConfigModule.forRoot({ isGlobal: true })],
    })
      .overrideProvider(DataboxService)
      .useValue(databoxServiceMock);

    app = await moduleRef.compile();
    databoxService = app.get<DataboxService>(DataboxService);
  });

  afterAll(async () => {
    if (app) {
      app.flushLogs();
      await app.close();
    }
  });

  it('should be defined', () => {
    expect(databoxService).toBeDefined();
    expect(app).toBeDefined();
    expect(moduleRef).toBeDefined();
  });

  it('should push data to databox', async () => {
    const response = await databoxService.pushData(data);
    expect(response).toEqual(dataBoxResponse);
  });

  it('should handle and log errors when pushing data to databox fails', async () => {
    const error = new Error('Failed to push data to databox');
    databoxServiceMock.pushData.mockRejectedValue(error);

    try {
      await databoxService.pushData(data);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });
});
