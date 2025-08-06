# n8n-nodes-bcryptjs

![n8n.io - Workflow Automation](https://raw.githubusercontent.com/n8n-io/n8n/master/assets/n8n-logo.png)

This is an [n8n](https://n8n.io/) community node that allows you to use bcryptjs for password hashing and verification operations in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation) • [Operations](#operations) • [Usage Examples](#usage-examples) • [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes Installation

1. In n8n, go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `@luka-cat-mimi/n8n-nodes-bcryptjs` in the **npm Package Name** field.
4. Agree to the risks, then select **Install**.

After installation, the Bcryptjs node will appear in the **Cryptography** category.

### Manual Installation

To install the node locally, you can use npm package manager:

```bash
# For n8n self-hosted
npm install @luka-cat-mimi/n8n-nodes-bcryptjs
```

## Operations

This node provides all bcryptjs async function capabilities:

### Supported Operations

| Operation | Description |
|-----------|-------------|
| **Compare Password** | Asynchronously compare password with hash |
| **Generate Salt** | Asynchronously generate salt value |
| **Get Rounds** | Get the number of rounds used in the hash |
| **Get Salt** | Extract salt portion from hash |
| **Hash Password** | Asynchronously hash password |
| **Test Truncation** | Test if password will be truncated (over 72 bytes) |

### Parameter Descriptions

#### Generate Salt
- **Rounds**: The cost of processing the data, default value is 10
- **Minor Version**: The minor version of bcrypt, 'a' or 'b', default is 'b'

#### Hash Password
- **Password**: The password to hash
- **Salt or Rounds**: Salt value to use for hashing, or number specifying rounds

#### Compare Password
- **Password**: The original password to compare
- **Hash**: The hash value to compare against the password

#### Get Rounds
- **Hash**: The hash value to extract rounds from

#### Get Salt
- **Hash**: The hash value to extract salt from

#### Test Truncation
- **Password**: The password to check

### Options

- **Output Field Name**: Field name where the result will be saved, default is 'result'

## Usage Examples

### Example 1: Password Hashing

Hash passwords when creating users:

1. Set operation to **Hash Password**
2. Enter the password to hash
3. Set rounds (recommended 10-12)
4. The node will return the hashed password

**Input**:
```json
{
  "password": "mySecretPassword"
}
```

**Output**:
```json
{
  "password": "mySecretPassword",
  "result": "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
}
```

### Example 2: Password Verification

Verify passwords during user login:

1. Set operation to **Compare Password**
2. Enter the original password and stored hash value
3. The node will return true or false

**Input**:
```json
{
  "password": "mySecretPassword",
  "hash": "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
}
```

**Output**:
```json
{
  "password": "mySecretPassword",
  "hash": "$2b$10$N9qo8uLOickgx2ZMRZoMye...",
  "result": true
}
```

### Example 3: Custom Output Field

Set a custom output field name in options:

1. Expand the **Options** section
2. Set **Output Field Name** to `hashedPassword`
3. The result will be saved to the specified field

**Output**:
```json
{
  "password": "mySecretPassword",
  "hashedPassword": "$2b$10$N9qo8uLOickgx2ZMRZoMye..."
}
```

## Security Considerations

- bcrypt only uses the first 72 bytes of a password, any extra bytes are ignored
- Recommend using async version to avoid blocking the event loop
- Higher rounds mean better security but longer processing time
- Default rounds of 10 is secure for most cases
- Production environments should consider using 12 rounds or higher

## Development

To develop or contribute to this project:

```bash
# Clone the repository
git clone https://github.com/luka-mimi/n8n-nodes-bcryptjs.git
cd n8n-nodes-bcryptjs

# Install dependencies
npm install

# Build the project
npm run build

# Run code quality checks
npm run lint

# Fix code formatting
npm run lintfix
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [bcryptjs documentation](https://github.com/dcodeIO/bcrypt.js) - The underlying crypto library
- [bcrypt algorithm explanation](https://en.wikipedia.org/wiki/Bcrypt) - Learn about the bcrypt algorithm

## License

[MIT](LICENSE.md) © luka-cat-mimi

---

**If this project helps you, please give it a ⭐️!**

**Issue Reports**: [GitHub Issues](https://github.com/luka-mimi/n8n-nodes-bcryptjs/issues)

**中文文档**: [README_CN.md](README_CN.md)
