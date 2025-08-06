# @luka-cat-mimi/n8n-nodes-bcryptjs

This is an n8n community node that allows you to use bcryptjs for password hashing and verification operations in your n8n workflows.

bcryptjs is an optimized bcrypt implementation in pure JavaScript with zero dependencies and TypeScript support.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node provides all bcryptjs async function capabilities:

### Main Operations

- **Generate Salt** (`genSalt`) - Asynchronously generate salt value
- **Hash Password** (`hash`) - Asynchronously hash password
- **Compare Password** (`compare`) - Asynchronously compare password with hash
- **Get Rounds** (`getRounds`) - Get the number of rounds used in the hash
- **Get Salt** (`getSalt`) - Extract salt portion from hash
- **Test Truncation** (`truncates`) - Test if password will be truncated (over 72 bytes)

### Parameter Descriptions

#### Generate Salt (genSalt)
- **Rounds**: The cost of processing the data, default value is 10
- **Minor Version**: The minor version of bcrypt, 'a' or 'b', default is 'b'

#### Hash Password (hash)
- **Password**: The password to hash
- **Salt or Rounds**: Salt value to use for hashing, or number specifying rounds

#### Compare Password (compare)
- **Password**: The original password to compare
- **Hash**: The hash value to compare against the password

#### Get Rounds (getRounds)
- **Hash**: The hash value to extract rounds from

#### Get Salt (getSalt)
- **Hash**: The hash value to extract salt from

#### Test Truncation (truncates)
- **Password**: The password to check

### Options

- **Output Field Name**: Field name where the result will be saved, default is 'result'

## Usage Examples

### Example 1: Hash Password
1. Set operation to "Hash Password"
2. Enter the password to hash
3. Set rounds (e.g., 10)
4. The node will return the hashed password

### Example 2: Verify Password
1. Set operation to "Compare Password"
2. Enter the original password and hash value
3. The node will return true or false indicating if they match

### Example 3: Custom Output Field
1. In Options, set "Output Field Name" to your desired field name (e.g., "hashedPassword")
2. The result will be saved to that field instead of the default "result" field



## Security Considerations

- bcrypt only uses the first 72 bytes of a password, any extra bytes are ignored
- Recommend using async version to avoid blocking the event loop
- Higher rounds mean better security but longer processing time
- Default rounds of 10 is secure for most cases

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [bcryptjs documentation](https://github.com/dcodeIO/bcrypt.js)
* [bcrypt algorithm explanation](https://en.wikipedia.org/wiki/Bcrypt)

If this project helps you, please give it a ⭐️!

## Version History

### 0.1.0
- Initial release
- Implemented all bcryptjs async functions
- Support for getting values from input data fields
- Complete English user interface
