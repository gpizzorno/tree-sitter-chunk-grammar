# Tree-sitter Chunk Grammar

[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

This repository contains a [Tree-sitter](https://github.com/tree-sitter/tree-sitter) parser for [NLTK](https://www.nltk.org) chunking grammars. It provides a robust and efficient way to parse and analyze chunking rulesets, which are commonly used in natural language processing (NLP) tasks for identifying and extracting meaningful phrases or patterns from text.

This project is inspired by and builds upon [tree-sitter-regex](https://github.com/tree-sitter/tree-sitter-regex), extending its capabilities to support chunking grammar syntax.

## Features

- **Grammar Parsing**: Supports parsing of chunking grammar rulesets, including chunk, chink, split, and merge rules.
- **Quantifiers and Assertions**: Handles quantifiers (`*`, `+`, `?`) and assertions (`^`, `$`, `\b`, `\B`) for pattern matching.
- **Character Classes**: Supports character classes, ranges, and escape sequences for flexible pattern definitions.
- **Tree-sitter Integration**: Provides a Tree-sitter-compatible parser for syntax highlighting, code navigation, and more.
- **NLTK Compatibility**: Designed to work seamlessly with NLTK chunking grammars.

## Repository Structure

The repository is organized as follows:

- **`grammar.js`**: Defines the Tree-sitter grammar for chunking rulesets. This includes rules for parsing chunk, chink, split, and merge rules, as well as patterns, assertions, and quantifiers.
- **`src/`**: Contains the C and C++ source code for the parser.
  - `parser.c`: Implements the core parsing logic for the grammar.
  - `binding.cc`: Provides Node.js bindings for the parser.
  - `tree_sitter/`: Includes header files for Tree-sitter integration.
- **`queries/`**: Contains Tree-sitter query files for syntax highlighting.
  - `highlights.scm`: Defines syntax highlighting rules for chunking grammar constructs.
- **`samples/`**: Includes example chunking grammar files for testing and demonstration.
  - `dev_chunk.chk`: A sample chunking grammar file.
- **`build/`**: Directory for build artifacts, including compiled bindings.
- **`package.json`**: Defines the project metadata, dependencies, and scripts.
- **`binding.gyp`**: Configuration file for building the native bindings using `node-gyp`.
- **`LICENSE`**: MIT license for the project.

## Grammar Overview

The grammar supports the following constructs:

- **Rulesets**: A collection of chunking rules, starting with an `iob_tag`.
- **Chunk Rules**: Define patterns to group tokens into chunks using `{}`.
- **Chink Rules**: Define patterns to exclude tokens from chunks using `}{`.
- **Split Rules**: Define patterns to split chunks using `}{`.
- **Merge Rules**: Define patterns to merge chunks using `{}`.
- **Patterns**: Support disjunctions (`|`), terms, and word tags.
- **Assertions**: Include start (`^`), end (`$`), boundary (`\b`), and non-boundary (`\B`) assertions.
- **Character Classes**: Support ranges, negations, and escape sequences.
- **Quantifiers**: Include zero-or-more (`*`), one-or-more (`+`), and optional (`?`) quantifiers.

## Installation

To install the parser, clone the repository and build the native bindings:

```bash
git clone https://github.com/gpizzorno/tree-sitter-chunk-grammar.git
cd tree-sitter-chunk-grammar
npm install
```

## Usage

### Node.js Integration

The parser can be used as a Node.js module:

```javascript
const chunkGrammar = require('tree-sitter-chunk-grammar');
```

### Tree-sitter CLI

You can test the grammar using the Tree-sitter CLI:

```bash
tree-sitter test
```

## Syntax Highlighting

The `queries/highlights.scm` file defines syntax highlighting rules for chunking grammar constructs. These can be used in editors that support Tree-sitter-based highlighting ([see here](https://github.com/gpizzorno/atom-language-chunkgrammar) for an example implementation for Atom).


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

