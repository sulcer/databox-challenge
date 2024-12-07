import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { DataboxService } from '@app/modules/databox/databox.service';
import { PushDataArrayDto } from '@app/modules/databox/dto/PushDataDto';

@ApiTags('Databox')
@Controller('databox')
export class DataboxController {
  constructor(private readonly databoxService: DataboxService) {}

  @ApiOperation({ summary: 'Push Data to Databox' })
  @Post('push')
  async pushData(@Body() pushDataArrayDto: PushDataArrayDto) {
    return await this.databoxService.pushData(pushDataArrayDto.data);
  }
}
