import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { GithubProfile } from '@app/common/types/auth.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow('CLIENT_ID'),
      clientSecret: configService.getOrThrow('CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GITHUB_CALLBACK_URL'),
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<GithubProfile> {
    const { id, username, displayName, emails } = profile;
    return {
      id,
      username,
      displayName,
      email: emails?.[0]?.value || null,
      accessToken,
    };
  }
}
