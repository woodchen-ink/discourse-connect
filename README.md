# Discourse Connect

这是一个基于 [Next.js](https://nextjs.org/) 的项目，实现了使用 Discourse SSO (Single Sign-On) 用户系统的 OAuth 认证功能。

## 项目概述

本项目提供了一个 OAuth 认证系统，允许其他应用程序使用 Discourse 论坛的用户账号进行身份验证。这样可以让用户使用他们已有的 Discourse 账号登录到您的应用程序，无需创建新的账号。

主要特性:

- 基于 Discourse SSO 的用户认证
- OAuth 2.0 协议支持
- 使用 Next.js 框架构建，提供良好的性能和开发体验

## 开始使用

首先，运行开发服务器:

```bash
pnpm dev
# 或
pnpm turbo
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

您可以通过修改 `app/page.tsx` 来开始编辑页面。当您编辑文件时，页面会自动更新。

## 配置

要使用此 OAuth 系统，您需要进行以下配置:

1. 在您的 Discourse 论坛中启用 SSO 功能。
2. 设置环境变量:
   - `NEXT_PUBLIC_HOST_URL`: 应用程序的主机 URL（不要在末尾添加 "/"）
   - `DATABASE_URL`: 数据库连接字符串
   - `AUTH_SECRET`: Next Auth 的密钥
   - `DISCOURSE_HOST`: 您的 Discourse 论坛 URL
   - `DISCOURSE_SECRET`: 在 Discourse 中设置的 SSO secret

## 部署

### 使用 Docker 部署

本项目支持使用 Docker 进行部署。以下是使用 Docker Compose 部署的步骤：

1. 确保您的系统已安装 Docker 和 Docker Compose。

2. 在项目根目录下，运行以下命令启动服务：

   ```bash
   docker-compose up -d
   ```

   这将构建并启动 Web 应用和 PostgreSQL 数据库服务。

3. 应用将在 http://localhost:3000 上运行。

4. 要停止服务，运行：

   ```bash
   docker-compose down
   ```

### 使用 Vercel 部署

另一种部署 Next.js 应用程序的简单方法是使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

查看我们的 [Next.js 部署文档](https://nextjs.org/docs/deployment) 了解更多详情。

## OAuth 2.0 接口

本项目实现了基于 OAuth 2.0 协议的认证系统。以下是主要的 OAuth 接口及其使用说明：

### 1. 授权请求

**端点：** `/oauth/authorize`

**方法：** GET

**参数：**

- `response_type`: 必须为 "code"
- `client_id`: 您的客户端 ID
- `redirect_uri`: 授权后重定向的 URI
- `scope`: （可选）请求的权限范围

**示例：**

```
/oauth/authorize?response_type=code&client_id=your_client_id&redirect_uri=https://your-app.com/callback
```

### 2. 获取访问令牌

**端点：** `/api/oauth/access_token`

**方法：** POST

**参数：**

- `code`: 从授权请求中获得的授权码
- `redirect_uri`: 必须与授权请求中的 redirect_uri 相同

**响应：**

```json
{
  "access_token": "at_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "expires_in": 604800,
  "token_type": "bearer"
}
```

### 3. 获取用户信息

**端点：** `/api/oauth/user`

**方法：** GET

**请求头：**

- `Authorization: Bearer {access_token}`

**响应：**

```json
{
  "id": "user_id",
  "email": "user@example.com",
  "username": "username",
  "admin": false,
  "avatar_url": "https://example.com/avatar.jpg",
  "name": "User Name"
}
```

### 使用流程

1. 将用户重定向到授权页面（`/oauth/authorize`）。
2. 用户授权后，您的应用将收到一个授权码。
3. 使用授权码请求访问令牌（`/api/oauth/access_token`）。
4. 使用访问令牌获取用户信息（`/api/oauth/user`）。

注意：确保在生产环境中使用 HTTPS 来保护所有的 OAuth 请求和响应。

## 贡献

欢迎贡献代码、报告问题或提出改进建议。

## 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。
