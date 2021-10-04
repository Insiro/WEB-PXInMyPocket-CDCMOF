export interface UserInfoInterface {
  email: string | null;
  profileImg: string | null;
  id: string | null;
  bye: string | null;
  rank: boolean | false;
  authority: boolean | false;
}

export default interface UserInterface {
  signed: boolean;
  info: UserInfoInterface;
}
