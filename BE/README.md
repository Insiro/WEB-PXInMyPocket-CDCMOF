# DB 구조

![image](https://user-images.githubusercontent.com/55325690/138106318-bbc60bc0-bae1-43a8-876c-c950ad83e1d6.png)

------------
# API
### /home
#### login
|Method|Url|request|
|---|---|---|
|POST|api/home/login|**body**: email, password|

#### logout
|Method|Url|request|
|---|---|---|
|GET|api/home/logout||

----------------
### /register
#### register
|Method|Url|request|
|---|---|---|
|POST|api/home/register| **body**: email, password, name, serial_number|

--------------
### /user
#### get list of arrived orders
|Method|Url|request|
|---|---|---|
|GET|api/home/user/order-arrive||

#### delete order
|Method|Url|request|
|---|---|---|
|POST|api/home/user/destory-order|**body**: order_id|
