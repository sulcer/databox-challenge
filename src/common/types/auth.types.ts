export type GithubProfile = {
  id: string;
  username: string;
  displayName: string;
  email: string;
  accessToken: string;
};

export interface JwtPayload {
  sub: string;
  username: string;
  email: string | null;
}
