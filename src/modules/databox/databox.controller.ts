import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { DataboxService } from '@app/modules/databox/databox.service';
import { PushDataArrayDto } from '@app/modules/databox/dto/PushDataDto';

@ApiTags('Databox')
@Controller('databox')
@ApiBearerAuth()
export class DataboxController {
  constructor(private readonly databoxService: DataboxService) {}

  @ApiOperation({ summary: 'Push Data to Databox' })
  @Post('push')
  async pushData(@Body() pushDataArrayDto: PushDataArrayDto) {
    return await this.databoxService.pushData(pushDataArrayDto.data);
  }

  @Get('private')
  @ApiOperation({ summary: 'Private route - requires JWT auth' })
  getPrivateData(@Req() req) {
    return {
      message: 'This is a private route. Authentication required.',
      user: req.user,
    };
  }
}
