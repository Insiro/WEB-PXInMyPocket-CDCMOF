export interface UserInfoInterface {
  email: string | null;
  profileImg: string | null;
  id: string | null;
  bye: string | null;
  rank: boolean;
  authority: boolean;
  name: string | null;
}

export default interface UserInterface {
  signed: boolean;
  info: UserInfoInterface;
}
export interface RegistInterface extends UserInfoInterface {
  password: string;
  passwordCheck: string;
}
