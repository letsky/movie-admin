# movie-admin
电影项目管理后台。本后台使用飞冰搭建，详细文档见飞冰官网https://ice.work/。

## 使用

- 安装依赖: `npm install`
- 启动调试服务: `npm start`
- 构建 dist: `npm run build`

## 目录结构

- 入口文件: `src/index.jsx`
- 导航配置: `src/config/menu.js`
- 路由配置: `src/config/routes.js`
- 路由入口: `src/router.jsx`
- 布局文件: `src/layouts`
- 通用组件: `src/components`
- 页面文件: `src/pages`

## 使用的api

### 电影管理

#### 获取电影列表（分页）

请求方式：GET

请求地址：/movies

请求参数：

| 参数值 | 参数类型 | 是否必须   | 说明     |
| ------ | -------- | ---------- | -------- |
| page   | int      | 否，默认1  | 页码     |
| size   | int      | 否，默认20 | 每页大小 |

返回数据格式：

```json
{
    "total": 27,
    "list": [
        {
            "id": 2,
            "name": "乘风破浪",
            "duration": 120,
            "directors": "韩寒",
            "actors": "邓超",
            "releaseDate": "2017-06-07T16:00:00.000+0000",
            "plot": null,
            "poster": null,
            "country": "中国",
            "status": "on",
            "categories": []
        },
        ...
    ],
    "pageNum": 1,
    "pageSize": 1,
    "size": 1,
    "startRow": 1,
    "endRow": 1,
    "pages": 27,
    "prePage": 0,
    "nextPage": 2,
    "isFirstPage": true,
    "isLastPage": false,
    "hasPreviousPage": false,
    "hasNextPage": true,
    "navigatePages": 8,
    "navigatepageNums": [
        1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 8
}
```

#### 获取所有类别（不分页）

请求方式：GET

请求地址：/categories/all

请求参数：无

返回数据格式：

```json
[
    {
        "id": 1,
        "name": "动作"
    },
    ...
]
```

| 参数值 | 参数类型 | 是否必须 | 说明     |
| ------ | -------- | -------- | -------- |
| id     | int      | 是       | 类别id   |
| name   | String   | 是       | 类别名称 |

#### 创建电影

请求方式：POST

请求头：Content-Type: application/json;charset=utf-8

请求地址：/movies

请求数据：

```json
{
  "name": "name",
  "duration": 123,
  "directors": "",
  "actors": "",
  "releaseDate": "",
  "categoryIds": [1,2],
  "status": "",
  "plot": "",
  "poster": "",
  "country": ""
}
```

| 参数值      | 参数类型    | 是否必须 | 说明                 |
| ----------- | ----------- | -------- | -------------------- |
| name        | String      | 是       | 电影名称             |
| duration    | int         | 是       | 时长                 |
| directors   | String      | 是       | 导演                 |
| actors      | String      | 是       | 演员                 |
| releaseDate | Date/String | 是       | 上映日期             |
| categoryIds | int[]       | 是       | 类别id，多个类别     |
| status      | int/String  | 否       | 上映状态，默认未上映 |
| plot        | String      | 是       | 剧情                 |
| poster      | String      | 是       | 电影海报链接         |
| country     | String      | 是       | 国家                 |

#### 删除电影

请求方式：DELETE

请求头：Content-Type: application/json;charset=utf-8

请求地址：/movies/{id}

路径参数：

| 参数值 | 参数类型 | 是否必须 | 说明 |
| ------ | -------- | -------- | ---- |
| id     | String   | 是       | id   |

### 类别管理

#### 获取类别列表（分页）

请求方式：GET

请求地址：/categories

请求参数：

| 参数值 | 参数类型 | 是否必须   | 说明     |
| ------ | -------- | ---------- | -------- |
| page   | int      | 否，默认1  | 页码     |
| size   | int      | 否，默认20 | 每页大小 |

返回数据格式：

```json
{
    "total": 3,
    "list": [
        {
            "id": 1,
            "name": "动作"
        },
        ...
    ],
    "pageNum": 1,
    "pageSize": 20,
    "size": 3,
    "startRow": 1,
    "endRow": 3,
    "pages": 1,
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
        1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1
}
```

#### 创建类别

请求方式：POST

请求头：Content-Type: application/json;charset=utf-8

请求地址：/categories

请求数据：

```
{
  "name": "value"
}
```

| 参数值 | 参数类型 | 是否必须 | 说明     |
| ------ | -------- | -------- | -------- |
| name   | String   | 是       | 类别名称 |

#### 删除类别

请求方式：DELETE

请求头：Content-Type: application/json;charset=utf-8

请求地址：/categories/{id}

路径参数：

| 参数值 | 参数类型 | 是否必须 | 说明   |
| ------ | -------- | -------- | ------ |
| id     | int      | 是       | 类别id |

### 资讯管理

#### 获取资讯（分页）

请求方式：GET

请求地址：/news

请求参数：

| 参数值 | 参数类型 | 是否必须   | 说明     |
| ------ | -------- | ---------- | -------- |
| page   | int      | 否，默认1  | 页码     |
| size   | int      | 否，默认20 | 每页大小 |

返回数据格式：

```json
{
    "total": 1,
    "list": [
        {
            "id": 2,
            "title": null,
            "content": "信息",
            "createTime": "2019-08-24T14:20:33.000+0000"
        },
        ...
    ],
    "pageNum": 1,
    "pageSize": 20,
    "size": 1,
    "startRow": 1,
    "endRow": 2,
    "pages": 1,
    "prePage": 0,
    "nextPage": 0,
    "isFirstPage": true,
    "isLastPage": true,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "navigatePages": 8,
    "navigatepageNums": [
        1
    ],
    "navigateFirstPage": 1,
    "navigateLastPage": 1
}
```

#### 添加资讯

请求方式：POST

请求头：Content-Type: application/json;charset=utf-8

请求地址：/news

请求数据：

```
{
  "content": "value"
}
```

| 参数值  | 参数类型 | 是否必须 | 说明 |
| ------- | -------- | -------- | ---- |
| content | String   | 是       | 资讯 |

#### 删除资讯

请求方式：DELETE

请求头：Content-Type: application/json;charset=utf-8

请求地址：/news/{id}

路径参数：

| 参数值 | 参数类型 | 是否必须 | 说明 |
| ------ | -------- | -------- | ---- |
| id     | String   | 是       | id   |

### 场次管理

#### 获取场次列表（分页）

请求方式：GET

请求地址：/scenes

请求参数：

| 参数值 | 参数类型 | 是否必须   | 说明     |
| ------ | -------- | ---------- | -------- |
| page   | int      | 否，默认1  | 页码     |
| size   | int      | 否，默认20 | 每页大小 |

#### 获取上映的电影（不分页）

请求方式：GET

请求地址：/movies/released

返回数据格式：

```json
[
    {
        "id": 2,
        "name": "乘风破浪",
        "duration": 120,
        "directors": "韩寒",
        "actors": "邓超",
        "releaseDate": "2017-06-07T16:00:00.000+0000",
        "plot": null,
        "poster": null,
        "country": "中国",
        "status": "on",
        "categories": []
    },
    ...
]
```

#### 创建场次

请求方式：POST

请求头：Content-Type: application/json;charset=utf-8

请求地址：/scenes

请求数据：

```
{
  "movieId": 1,
  "price": 20,
  "showtime": "12:10"
}
```

| 参数值   | 参数类型    | 是否必须 | 说明         |
| -------- | ----------- | -------- | ------------ |
| movieId  | int         | 是       | 电影id       |
| price    | int         | 是       | 该场次的价格 |
| showtime | String/Date | 是       | 播放时间     |

#### 删除场次

请求方式：DELETE

请求头：Content-Type: application/json;charset=utf-8

请求地址：/scenes/{id}

路径参数：

| 参数值 | 参数类型 | 是否必须 | 说明 |
| ------ | -------- | -------- | ---- |
| id     | String   | 是       | id   |