# 黑客松-看天吃饭队

## 系统说明

从头部署系统可能比较费时间，建议直接访问 http://10.128.13.153:1111/ 。如需要自行构建，请联系队长获取数据库密码等敏感信息。

系统运行需要以下几部分，具体操作见后续说明。

1. 前端（my-app）
2. 后端（backside）
3. 数据库（mysql）, data目录为导入数据
4. 训练过程（python）

## my-app

前端项目, node 14+，运行前先 `npm install`

`yarn start` 本地开发，接口已经默认代理到测试环境 http://10.128.13.153:1111，启动即可使用，无需另外部署后端

`yarn build` 构建发布产物

## backside

使用python 3.8，基于django 框架开发，更多第三方依赖列在 requirements.txt，可执行 `pip3 install -r requirements.txt` 安装。

安装完成后在该目录下启动，当然，需要先部署数据库环境。建议直接获取相关测试环境变量使用。

```bash
python manage.py runserver
```

## 数据库

使用 mysql 8.3

执行以下脚本，生成迁移脚本并初始化数据表结构，再分别对应导入data目录中的csv文件

```bash
python manage.py makemigrations
python manage.py migrate
```

数据表对应关系

map_map => map.csv
map_mapquery => mapquery.csv
map_regquery => regquery.csv
map_stkplace => stkplace.csv
map_stkcdincity => stkcdincity.csv
