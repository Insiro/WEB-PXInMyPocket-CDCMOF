# DB 구조

![image](https://user-images.githubusercontent.com/55325690/138106318-bbc60bc0-bae1-43a8-876c-c950ad83e1d6.png)

------------
# API REFENCE
### /home
#### login
|Method|Url|request|
|---|---|---|
|POST|api/home/login|**body**: email, password|

#### logout
|Method|Url|
|---|---|
|GET|api/home/logout|

----------------
### /register
#### register
|Method|Url|request|
|---|---|---|
|POST|api/home/register| **body**: email, password, name, serial_number|

--------------
### /user
#### get list of arrived orders
|Method|Url|
|---|---|
|GET|api/home/user/order-arrive|

#### delete order
|Method|Url|request|
|---|---|---|
|POST|api/home/user/destory-order|**body**: order_id|


#### get list of ordered
|Method|Url|
|---|---|
|GET|api/home/user/orderlist|

#### change user info
|Method|Url|request|
|---|---|---|
|POST|api/home/user/change-userinfo|**body**: new_password, new_serial_number, new_expire_date|

#### get list of posts
|Method|Url|
|---|---|
|GET|api/home/user/mypost|

-------------------------
### /product
#### get product by category
|Method|Url|request|
|---|---|---|
|GET|api/product/category|**query**: kinds|

#### get columns of category
|Method|Url|
|---|---|
|GET|api/product/all-category|

#### get info of product by name
|Method|Url|request|
|---|---|---|
|GET|api/product/info-by-name|**query**: name|

#### get info of product by id
|Method|Url|request|
|---|---|---|
|GET|api/product/info-by-id|**query**: id|

---------------------------------
### /order
#### get info of order by order_id
|Method|Url|request|
|---|---|---|
|POST|api/product/order/inf|**body**: name|

#### order product
|Method|Url|request|
|---|---|---|
|POST|api/product/order|**query**: kind,name <br> **body**: quantity|
-----------------
### /notice
#### create notice
|Method|Url|request|
|---|---|---|
|POST|api/notice|**body**: product_name, ownder_id, order_id|

#### get notice of logined user
|Method|Url|
|---|---|
|GET|api/notice|

#### set readed of notice
|Method|Url|request|
|---|---|---|
|POST|api/notice/set_readed|**body**: notice_id|

#### delete notice
|Method|Url|request|
|---|---|---|
|delete|api/notice|**body**: notice_id|

-------------------------
### /freeboard

#### get announcement from posts
|Method|Url|
|---|---|
|GET|api/freeboard/announcement|

#### posting
|Method|Url|request|
|---|---|---|
|POST|api/freeboard|**query**: title, content, isNotic|

#### get list of posts
|Method|Url|
|---|---|
|GET|api/freeboard/list|

#### get detail of the post
|Method|Url|request|
|---|---|---|
|GET|api/freeboard|**query**: post_id|

#### delete post
|Method|Url|request|
|---|---|---|
|delete|api/freeboard|**body**: post_id|

#### get info of product by id
|Method|Url|request|
|---|---|---|
|POST|api/freeboard/edit_post|**body**: post_id, title, content|

#### get info of product by id
|Method|Url|request|
|---|---|---|
|GET|api/product/info-by-id|**query**: id|

------------
### /cart
#### get cart items list of logined user
|Method|Url|
|---|---|
|GET|api/cart|

#### put product into cart
|Method|Url|request|
|---|---|---|
|POST|api/cart|**body**: quantity, added_product_id, owner_email, total_price|

#### delete cart item
|Method|Url|request|
|---|---|---|
|DELETE|api/cart|**body**: id|

#### edit cart item
|Method|Url|request|
|---|---|---|
|POST|api/cart/edit|**body**: id|
