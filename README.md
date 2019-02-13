# express-mongodb-restful-api

## Install MongoDB

https://treehouse.github.io/installation-guides/mac/mongo-mac.html

1. `brew update`
2. `brew install mongodb`
3. `sudo mkdir -p /data/db`
   you can check the `/data/db` folder use command `ls`
4. `sudo chown -R`id -un`/data/db`

5. run `mongod`
6. run `mongo`

quit mongodb `quit()`
stop mongodb `ctrl-c`

## Working on GCP

> [MongoDB Certified By Bitnami](https://console.cloud.google.com/marketplace/details/bitnami-launchpad/mongodb)

### How to Conect to MongoDB from GCP

[Node 連線可參考 Google 文件](https://console.cloud.google.com/marketplace/details/bitnami-launchpad/mongodb)

> 帳號密碼可到`Deploy Menager`了解

- host : 外部ＩＰ
- port : 27017(預設)
- name : SSH Termimal `mongdb` 、 `db.getName()`
- user : root 參考[Bitnami Cloud](https://bitnami.com/stack/mongodb/cloud/google)
- password : [Deploy Menager](https://console.cloud.google.com/dm/deployments/details/mongodb-3?project=api-project-390499854371&authuser=1)

### 連線注意

[Auth Fail](https://stackoverflow.com/questions/38237663/mongo-atlas-connection-authentication-failed-with-custom-databases)

`mongodb://${user}:${pass}@${host}:${port}/${nconf.get('mongoDatabase')}?authSource=admin`

## Config

自行建立 `/config/key.json`
儲存資料庫帳密