# n8n-nodes-bcryptjs

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

这是一个 [n8n](https://n8n.io/) 社区节点，让你可以在 n8n 工作流中使用 bcryptjs 进行密码哈希和验证操作。

[n8n](https://n8n.io/) 是一个[公平代码许可](https://docs.n8n.io/reference/license/)的工作流自动化平台。

[安装](#安装) • [操作](#操作) • [使用示例](#使用示例) • [资源](#资源)

## 安装

按照 n8n 社区节点文档中的[安装指南](https://docs.n8n.io/integrations/community-nodes/installation/)进行安装。

### 社区节点安装

1. 在 n8n 中，转到 **设置 > 社区节点**。
2. 选择 **安装**。
3. 输入 `@luka-cat-mimi/n8n-nodes-bcryptjs` 到 **npm 包名称** 字段。
4. 同意风险，然后选择 **安装**。

安装完成后，Bcryptjs 节点将出现在 **Cryptography** 类别中。

### 手动安装

要在本地安装节点，你可以使用 npm 包管理器：

```bash
# 对于 n8n self-hosted
npm install @luka-cat-mimi/n8n-nodes-bcryptjs

```

## 操作

此节点提供 bcryptjs 的所有异步函数功能：

### 支持的操作

| 操作 | 描述 |
|------|------|
| **Compare Password** | 异步比较密码与哈希值 |
| **Generate Salt** | 异步生成 salt 值 |
| **Get Rounds** | 获取哈希中使用的轮数 |
| **Get Salt** | 从哈希中提取 salt 部分 |
| **Hash Password** | 异步哈希密码 |
| **Test Truncation** | 测试密码是否会被截断（超过72字节） |

### 参数说明

#### Generate Salt
- **Rounds**: 处理数据的成本，默认值为 10
- **Minor Version**: bcrypt 的次要版本，'a' 或 'b'，默认为 'b'

#### Hash Password
- **Password**: 要哈希的密码
- **Salt or Rounds**: 用于哈希的 salt 值，或者指定轮数的数字

#### Compare Password
- **Password**: 要比较的原始密码
- **Hash**: 要与密码比较的哈希值

#### Get Rounds
- **Hash**: 要提取轮数的哈希值

#### Get Salt
- **Hash**: 要提取 salt 的哈希值

#### Test Truncation
- **Password**: 要检查的密码

### 选项

- **Output Field Name**: 结果保存的字段名，默认为 'result'

## 使用示例

### 示例 1: 密码哈希

创建用户时对密码进行哈希：

1. 设置操作为 **Hash Password**
2. 输入要哈希的密码
3. 设置轮数（推荐 10-12）
4. 节点将返回哈希后的密码

**输入**:
```json
{
  "password": "mySecretPassword"
}
```

**输出**:
```json
{
  "password": "mySecretPassword",
  "result": "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
}
```

### 示例 2: 密码验证

用户登录时验证密码：

1. 设置操作为 **Compare Password**
2. 输入原始密码和存储的哈希值
3. 节点将返回 true 或 false

**输入**:
```json
{
  "password": "mySecretPassword",
  "hash": "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
}
```

**输出**:
```json
{
  "password": "mySecretPassword",
  "hash": "$2b$10$N9qo8uLOickgx2ZMRZoMye...",
  "result": true
}
```

### 示例 3: 自定义输出字段

在选项中设置自定义输出字段名：

1. 展开 **Options** 部分
2. 设置 **Output Field Name** 为 `hashedPassword`
3. 结果将保存到指定字段

**输出**:
```json
{
  "password": "mySecretPassword",
  "hashedPassword": "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
}
```

## 安全注意事项

- bcrypt 只使用密码的前 72 字节，超出部分会被忽略
- 推荐使用异步版本以避免阻塞事件循环
- 轮数越高，安全性越高，但处理时间也越长
- 默认轮数 10 在大多数情况下是安全的
- 生产环境建议使用 12 轮或更高

## 开发

要开发或贡献此项目：

```bash
# 克隆仓库
git clone https://github.com/luka-mimi/n8n-nodes-bcryptjs.git
cd n8n-nodes-bcryptjs

# 安装依赖
npm install

# 构建项目
npm run build

# 运行代码检查
npm run lint

# 修复代码格式
npm run lintfix
```

## 资源

- [n8n 社区节点文档](https://docs.n8n.io/integrations/#community-nodes)
- [bcryptjs 文档](https://github.com/dcodeIO/bcrypt.js) - 底层加密库
- [bcrypt 算法说明](https://en.wikipedia.org/wiki/Bcrypt) - 了解 bcrypt 算法

## 许可证

[MIT](LICENSE.md) © luka-cat-mimi

---

**如果这个项目对你有帮助，请给它一个 ⭐️！**

**问题反馈**: [GitHub Issues](https://github.com/luka-mimi/n8n-nodes-bcryptjs/issues)
