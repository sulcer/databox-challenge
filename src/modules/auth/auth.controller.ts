import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GithubProfile } from '@app/common/types/auth.types';
import {
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '@app/modules/auth/auth.service';
import { Public } from '@app/common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'GitHub OAuth login' })
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {}

  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'GitHub OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Returns JWT token and user information',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: 'JWT token for authentication',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            username: { type: 'string' },
            displayName: { type: 'string' },
            email: { type: 'string', nullable: true },
          },
        },
      },
    },
  })
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req) {
    const profile: GithubProfile = req.user;
    return this.authService.handleGithubAuth(profile);
  }
}
