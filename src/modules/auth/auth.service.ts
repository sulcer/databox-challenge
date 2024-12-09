import { Injectable } from '@nestjs/common';
import { GithubProfile, JwtPayload } from '@app/common/types/auth.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async handleGithubAuth(profile: GithubProfile) {
    const payload: JwtPayload = {
      sub: profile.id,
      username: profile.username,
      email: profile.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        email: profile.email,
      },
    };
  }
}
