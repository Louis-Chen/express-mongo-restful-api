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

- host : 外部ＩＰ
- port : 27017(預設)
- name : SSH Termimal `mongdb` 、 `db.getName()`
- user : root/bitnami(預設) 參考[Bitnami Cloud](https://bitnami.com/stack/mongodb/cloud/google)
- password : 自訂中繼資料 bitnami-base-password
