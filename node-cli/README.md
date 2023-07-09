oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![GitHub license](https://img.shields.io/github/license/oclif/hello-world)](https://github.com/oclif/hello-world/blob/main/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g oclif-test
$ oclif-test COMMAND
running command...
$ oclif-test (--version)
oclif-test/0.0.0 darwin-arm64 node-v18.16.1
$ oclif-test --help [COMMAND]
USAGE
  $ oclif-test COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-test hello PERSON`](#oclif-test-hello-person)
* [`oclif-test hello world`](#oclif-test-hello-world)
* [`oclif-test help [COMMANDS]`](#oclif-test-help-commands)
* [`oclif-test plugins`](#oclif-test-plugins)
* [`oclif-test plugins:install PLUGIN...`](#oclif-test-pluginsinstall-plugin)
* [`oclif-test plugins:inspect PLUGIN...`](#oclif-test-pluginsinspect-plugin)
* [`oclif-test plugins:install PLUGIN...`](#oclif-test-pluginsinstall-plugin-1)
* [`oclif-test plugins:link PLUGIN`](#oclif-test-pluginslink-plugin)
* [`oclif-test plugins:uninstall PLUGIN...`](#oclif-test-pluginsuninstall-plugin)
* [`oclif-test plugins:uninstall PLUGIN...`](#oclif-test-pluginsuninstall-plugin-1)
* [`oclif-test plugins:uninstall PLUGIN...`](#oclif-test-pluginsuninstall-plugin-2)
* [`oclif-test plugins update`](#oclif-test-plugins-update)

## `oclif-test hello PERSON`

Say hello

```
USAGE
  $ oclif-test hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/rhdeck/oclif-test/blob/v0.0.0/dist/commands/hello/index.ts)_

## `oclif-test hello world`

Say hello world

```
USAGE
  $ oclif-test hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oclif-test hello world
  hello world! (./src/commands/hello/world.ts)
```

## `oclif-test help [COMMANDS]`

Display help for oclif-test.

```
USAGE
  $ oclif-test help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for oclif-test.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.11/src/commands/help.ts)_

## `oclif-test plugins`

List installed plugins.

```
USAGE
  $ oclif-test plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ oclif-test plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `oclif-test plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oclif-test plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oclif-test plugins add

EXAMPLES
  $ oclif-test plugins:install myplugin 

  $ oclif-test plugins:install https://github.com/someuser/someplugin

  $ oclif-test plugins:install someuser/someplugin
```

## `oclif-test plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ oclif-test plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ oclif-test plugins:inspect myplugin
```

## `oclif-test plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ oclif-test plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ oclif-test plugins add

EXAMPLES
  $ oclif-test plugins:install myplugin 

  $ oclif-test plugins:install https://github.com/someuser/someplugin

  $ oclif-test plugins:install someuser/someplugin
```

## `oclif-test plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ oclif-test plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ oclif-test plugins:link myplugin
```

## `oclif-test plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oclif-test plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oclif-test plugins unlink
  $ oclif-test plugins remove
```

## `oclif-test plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oclif-test plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oclif-test plugins unlink
  $ oclif-test plugins remove
```

## `oclif-test plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ oclif-test plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ oclif-test plugins unlink
  $ oclif-test plugins remove
```

## `oclif-test plugins update`

Update installed plugins.

```
USAGE
  $ oclif-test plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
