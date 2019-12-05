# generator-blennder

> Generator for Blennder Theme Components

Version `1.5.3`

## Installation

First, install [Yeoman](http://yeoman.io) and generator-blennder using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g https://github.com/blenndiris/generator-blennder.git
```

## New Projects

To Generate a new project run the following command. Use `--force` flag to auto confirm overwrite files.

```bash
yo blennder --force
```



You Will be asked the following questions:
```bash
     _-----_     ╭──────────────────────────╮
    |       |    │      Welcome to the      │
    |--(o)--|    │    generator-blennder    │
   `---------´   │    project generator!    │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

? Your Client Name: (Client)
? What is your site URL? (client.local)
? Which Stack are you using? (Use arrow keys)
❯ MAMP
  Valet
  Flywheel
? What is your Database Table Name? (client)
? What is your Database User Name? (root)
? What is your Database Password? (root)
? What is your Wordpress Admin Username? (Ninjas)
? Auto Generate Password? (n/Y)
? What is your Wordpress Admin Email? (Ninjas@blennd.com)
? Please Enter a Wordpress Site Description: (Some New Site Description)
```

### Components & Widgets

To create a new component, run the following command from within your theme folder (not the web root):

```bash
yo blennder:component
```

To create a new widget, run the following command from within your theme folder (not the web root):

```bash
yo blennder:widget
```

This will start a prompt of commands to create a new component. It will ask you for a name. You can enter this in any format.

```bash
     _-----_     ╭──────────────────────────╮
    |       |    │      Welcome to the      │
    |--(o)--|    │    generator-blennder    │
   `---------´   │   Component generator!   │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `
? Your Component Name: example
? Generate README File?: Y/n
? Generate SASS File?: Y/n
? Generate JS File?: y/N
```

It will scaffold out 3 files for you that are required for any component.

**Note**: The output will be the same for widgets except they will be placed in the `widgets` folder

```bash
  create components/example/example.php
  create components/example/example-acf.php
  create components/example/README.md
  create components/example/js/example.js
  create components/example/scss/_example.scss
```
