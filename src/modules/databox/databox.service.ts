import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiResponse,
  Configuration,
  DataPostRequest,
  DefaultApi,
} from 'databox';
import { DataboxResponse } from '@app/modules/databox/interface/databox.interface';

@Injectable()
export class DataboxService {
  private readonly api: DefaultApi;

  constructor(private readonly configService: ConfigService) {
    const config: Configuration = new Configuration({
      basePath: 'https://push.databox.com',
      username: this.configService.get('DATABOX_API_KEY'),
      headers: {
        Accept: 'application/vnd.databox.v2+json',
      },
    });

    this.api = new DefaultApi(config);
  }

  async pushData(
    data: {
      metricName: string;
      value: number;
      date: string;
      unit?: string;
      attributes?: { key: string; value: string }[];
    }[],
  ): Promise<DataboxResponse> {
    const pushDataArray = data.map((item) => ({
      key: item.metricName,
      value: item.value,
      date: item.date,
      unit: item.unit,
      attributes: item.attributes,
    }));

    const dataPostRequest: DataPostRequest = {
      pushData: pushDataArray,
    };

    try {
      const response: ApiResponse<void> =
        await this.api.dataPostRaw(dataPostRequest);
      const responseBody = await response.raw.json();
      console.log('Data pushed successfully:', responseBody);
      return responseBody;
    } catch (error) {
      console.log('Error pushing data:', error);
      throw error;
    }
  }
}
