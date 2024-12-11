import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { DataboxController } from '@app/modules/databox/databox.controller';
import { ConfigModule } from '@nestjs/config';
import { DataboxModule } from '@app/modules/databox/databox.module';
import { DataboxService } from '@app/modules/databox/databox.service';
import { PushDataArrayDto } from '@app/modules/databox/dto/PushDataDto';

describe('DataboxController', () => {
  let moduleRef: TestingModuleBuilder;
  let controller: DataboxController;
  let app: TestingModule;

  const data: PushDataArrayDto = {
    data: [
      {
        metricName: 'metricName',
        value: 1,
        date: 'date',
        unit: 'unit',
        attributes: [{ key: 'key', value: 'value' }],
      },
    ],
  };

  const databoxResponse = {
    status: 'success',
    message: 'Data saved successfully',
  };

  const databoxServiceMock = {
    pushData: jest.fn().mockResolvedValue(databoxResponse),
  };

  beforeAll(async () => {
    moduleRef = Test.createTestingModule({
      imports: [DataboxModule, ConfigModule.forRoot({ isGlobal: true })],
    })
      .overrideProvider(DataboxService)
      .useValue(databoxServiceMock);

    app = await moduleRef.compile();
    controller = app.get<DataboxController>(DataboxController);
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

  it('should push data to databox', async () => {
    const response = await controller.pushData(data);
    expect(response).toEqual(databoxResponse);
  });

  it('should handle and log errors when pushing data to databox fails', async () => {
    const spy = jest.spyOn(databoxServiceMock, 'pushData');
    spy.mockRejectedValue(new Error('Failed to push data to databox'));

    try {
      await controller.pushData(data);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual('Failed to push data to databox');
    }
  });
});
