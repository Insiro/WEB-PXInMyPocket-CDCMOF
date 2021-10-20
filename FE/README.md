# FrontEnd

## this project is Delevoped on
node.js with
  1. vue
  2. typescript
  3. yarn berry PNP mode

## for use this project
plz use yarn berry
plz build before publish (ccs Not Tested)

```bash
$ npm install -g yarn
$ yarn set bersion berry
$ yarn install
$ yarn build
```
builed file with be plcaed on `./dist`

## store Datas

1. localstrage
|Name|type|des|
|--|--|--|
|save_sign_data|boolean |remember me is checked|
|saved_email|string|email data for remember me|
|saced_pwd|string|password data for remeber me|

2. vuex sotrage
`Cart`
`Notification`
`Post`
`Prod`
`User`

## app URI
1. main pages
`Home` main pages
`prodlist`for view prod list
`posts` for view post list
`lisense`for oss information
`carts`  for vie 장바구니 list
2. auth pages
`signIn`  
`regist` for regist new User  
`reset`for reset password when forgot password  
`admin` for handle prods (add / edit / delete)  
3. dynamic pages
prod/:id id's information view  
post/:id id's information view  
edit_prod/:id id's information edit  
4. oth
new_post regist new post
new_prod regist new product  
