export interface UserInfoInterface {
  email: string | null;
  profileImg: string | null;
}

export default interface UserInterface extends UserInfoInterface {
  signed: boolean;
}
