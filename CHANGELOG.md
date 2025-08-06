# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [1.0.1] - 2024-12-XX

### Changed
- 🔧 CI: Test trusted publishing works

### Fixed
- 📚 Updated documentation

## [1.0.0] - 2024-12-XX

### Added
- ✨ Complete bcryptjs async functions support
- ✨ 6 operations covering all bcryptjs functionality
- ✨ Password hashing, comparison, salt generation and validation
- ✨ Full TypeScript support with type definitions
- ✨ English interface for international users

### Operations
- **Compare Password**: Asynchronously compare password with hash
- **Generate Salt**: Asynchronously generate salt value
- **Get Rounds**: Get the number of rounds used in the hash
- **Get Salt**: Extract salt portion from hash
- **Hash Password**: Asynchronously hash password
- **Test Truncation**: Test if password will be truncated

---

## 📦 Installation

```bash
npm install @luka-cat-mimi/n8n-nodes-bcryptjs
```

For detailed usage instructions, see [README.md](https://github.com/luka-mimi/n8n-nodes-bcryptjs#readme) 