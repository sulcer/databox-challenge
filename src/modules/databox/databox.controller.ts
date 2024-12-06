import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { DataboxService } from '@app/modules/databox/databox.service';
import { PushDataDto } from '@app/modules/databox/dto/PushDataDto';

@ApiTags('Databox')
@Controller('Databox')
export class DataboxController {
  constructor(private readonly databoxService: DataboxService) {}

  @ApiOperation({ summary: 'Push Data to Databox' })
  @Post('push')
  async pushData(@Body() pushDataDto: PushDataDto) {
    return await this.databoxService.pushData(
      pushDataDto.metricName,
      pushDataDto.value,
      pushDataDto.date,
      pushDataDto.unit,
      pushDataDto.attributes,
    );
  }
}
