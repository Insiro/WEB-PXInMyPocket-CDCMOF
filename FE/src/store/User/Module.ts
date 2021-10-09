import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import UserInterface, { UserInfoInterface } from './Interfaces';
import store from '..';
import axios from 'axios';

@Module({ namespaced: true, store, name: 'UserModule', dynamic: true })
export class UserModule extends VuexModule implements UserInterface {
	info: UserInfoInterface = {
		email: null,
		profileImg: null,
	};
	signed: boolean = false;
	//class안에서는 인자 1개
	@Mutation setEmail(email: string | null): void {
		this.info.email = email;
	}
	@Mutation setSign(value: boolean): void {
		this.signed = value;
	}
	@Mutation setProfileImg(imgdir: string | null): void {
		this.info.profileImg = imgdir;
	}
	@Mutation setData(data: UserInfoInterface): boolean {
		if (data.email === null) return false;
		this.info.email = data.email;
		this.info.profileImg = data.profileImg;
		return true;
	}
	//mutation하고 같은 범위라 이름 안겹치게.
	@Action updateData(data: UserInfoInterface): boolean {
		if (data.email === null) return false;
		//TODO: update UserInfo with API
		if (true) {
			this.setData(data);
		} else {
			return false;
		}
		return true;
	}
	@Action async signIn(info: any): Promise <boolean> {
		//TODO: signIn from server;
		try{
			console.log("check");
			console.log(info.email,info.password);
			const response = await axios
			.post('https://rkskekfk.run.goorm.io/api/home/login', { email: info.email, password: info.password});
				const data : UserInfoInterface = {email: info.email,profileImg: null}; 
				this.setSign(true);
				this.setData(data);
				console.log("check login");
				return true;
		}
		catch(err:Error){
				console.warn('ERROR!!!!! : ',err);
				return false;
			}
	}
	@Action signOut(): void {
		this.setSign(false);
		this.setData({} as UserInfoInterface);
	}
	get bSigned(): boolean {
		return this.signed;
	}
	get UserData(): UserInfoInterface | null {
		return this.signed ? this.info : null;
	}
}
export const userState = getModule(UserModule);
export default userState;