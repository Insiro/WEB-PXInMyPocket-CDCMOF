

# 내 손안에 PX

You can see Project Detailed Explanation on [this Page](https://mof-cdc.notion.site/PX-4c48ee84d315407c90c6a809f02dab79)  
You can see ReadMe for BackEnd on [BE](https://github.com/osamhack2021/WEB-PXInMyPocket-CDCMOF/blob/master/BE/README.md)  
You can see ReadMe for FrontEnd on [FE](https://github.com/osamhack2021/WEB-PXInMyPocket-CDCMOF/blob/master/FE/README.md)
## GitHub Actions Status
| Name                      | Status                                                                                                         |
|---------------------------|----------------------------------------------------------------------------------------------------------------|
| ESLint                    | ![ESLint](https://github.com/osamhack2021/WEB-PXInMyPocket-CDCMOF/actions/workflows/lint.yml/badge.svg)                         |

## 컴퓨터 구성 / 필수 조건 안내 (Prerequisites)

 - Debian Based Operation System
 - ECMAScript 6 Supporting Browser on Users
 - Node-js version overed then 14
 - yarn berry with pnp mode
 - **this project Not Suppoer Internet Explorer**
### Testaed Env
| EnvName | EnvVersion |
|--------|--|
|NodeJs|14.18.0|
|yarn Berry|3.0.2|
|Ubuntu|20.10|
|MySql|8.0.25|
## 프로젝트 사용법 (Getting Started)
this project is tested on node-js v14


requirements PreSet
1. set WebServer Proxy
  - `/md` aliase to MD folder
  - `/` set root Folder to FrontEnd Builded Folder
  - `/api` reverse Proxy to backendServer ex) `localhost:8000`
2. install `mysql-server` on Your Server
3. change `backEndServer/config/config.json` for your `mysql-server` settings
 



## 프로잭트 소개
- Node.js 와 Vue를 이용하여 제작한 px어플리케이션

this project is Prowerd By [osam](https://osam.kr)

## 기능 설명
 - 1. 본인이 복무하고 있는 부대의 px 물품 재고 상황을 어플리케이션을 통해 실시간으로 확인 할 수 있게 한다. 
 - 2. px에 납품 가능한 물품 중 원하는 물품을 예약 신청하게끔 한다. 예약 신청시 선입금 기능을 추가한다. 
 - 3. 해당 부대 px운영에 대한 정보를 게시하며 이용자가 개선점을 표명할 수 있는 게시판을 제공한다.
 
## 기대 효과
 - 1. px의 입고되는 물품들을 보면 들어오는 물품들의 종류나 수량이 시종여일하지 않다. 해당 어플은 본인 부대 px물품 재고상황을 px에 직접 방문하지 않고도 확인 가능하여 이는 병사들의 생활에 개선을 줄 수 있다. 
 - 2. 특정 상품에 대한 수요가 타 상품들에 비해 압도적으로 높은 물품들이 있다. 납품되는 물품들에 대해 예약 신청을 할 수 있겠끔 하여 수급의 균형을 맞출 수 있다. 또한 휴가를 나가는 병사들의 경우 선물용 주류, 화장품을 구매하기 위해 타 대대의 px를 이용하는 경우도 빈번히 발생하는데 해당 어플의 주문기능을 이용하면 이러한 문제 또한 해결 가능하다. 
 - 3. px관리가 전산화 되어 효율성이 높아지며 물품들의 실질적 유동을 파악 할 수 있어, 허위 주문과 같은 부당거래, 납품비리 등을 제재하는 효과를 줄 수 있다. 
 - 4. 군대라는 특성상 훈련 및 기타 상황에 의해 px운영 시간이 변동되거나 운영 수칙이 바뀌는 경우가 종종 있다. 어플리케이션을 통해 이러한 점을 이용자들에게 미리 고지하여 이용자들의 편익을 증대시킨다.

## 어플리케이션
### 홈 페이지
![px_application_example_1](https://user-images.githubusercontent.com/19542951/138066741-127a33b1-ab17-41b3-bbef-0898192bda54.png)

### 로그인 페이지
![px_application_example_2](https://user-images.githubusercontent.com/19542951/138066942-c33deb81-5da0-4bd3-9bf9-5ca89b81f0f1.png)

### 회원가입 페이지
![px_application_example_3](https://user-images.githubusercontent.com/19542951/138067057-c051e3ce-805b-4826-ac7f-f39f1781ff18.png)

### 제품목록 페이지
![px_application_example_4](https://user-images.githubusercontent.com/19542951/138067165-7667f2b5-4c47-4b64-8244-0bb5b4bae6ee.png)

### 장바구니 페이지
![image](https://user-images.githubusercontent.com/19542951/138067543-16fd86f2-127d-4b43-89a4-76cca07092bd.png)


## 팀 정보 (Team Information)
|Name|Github|Home|Email|Part|
|--|--|--|--|--|
|JinWook Jung|[@jwj3400](https://github.com/jwj3400)| null | [rlwlsdnr@naver.com](mailto:rlwlsdnr@naver.com) |BackEnd, Docs
|SeongHoon Kim|[@Insiro](https://github.com/Insiro)|[https://insiro.me](https://insiro.me)| [leeon@insiro.me](mailto:leeon@insiro.me) |FrontEnd, DevOps, Project Manager|


## 기술 스택 (Technique Used) 
### Server
 - 운영체제: Linux 계열
 - 서버 프로그래밍 언어와 프레임 워크: node.js v16.6.0, express 
 - 데이터베이스: MySQL(sequelize ORM 사용)
 
### Front-end
 -  프론트엔트 프레임워크: vue.js 
 -  UI framework: TailWind-css

## How To Install
1. clone git storage
```bash
$ git clone https://github.com/osamhack2021/WEB-PXInMyPocket-CDCMOF.git
cd WEB-PXInMyPocket-CDC
```
2. install and build FrontEnd 
on Folder`WEB-PXInMyPocket-CDC`
```bash
$ cd ./FE
$ yarn set version berry
$ yarn install
$ yarn build
```
output files will on `./FE/dist` folder
3. install and Run BackEnd
on Folder`WEB-PXInMyPocket-CDC`
```bash
$ cd ./BE/backEndServer
$ yarn set version berry
$ yarn install
$ yarn start
```
## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osamhack2021/WEB-PXInMyPocket-CDCMOF/blob/master/license.md)
This project is licensed under the terms of the MIT license.

Copyright © Insiro.me and jwj3400 and WEB-PXInMyPocket-CDCMOF Contributors

[OpenSource License](https://github.com/osamhack2021/WEB-PXInMyPocket-CDCMOF/blob/master/MD/osLicense.md)
