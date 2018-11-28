'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red('generator-blennder')} Widget generator!`)
    );

    const prompts = [
      {
        type    : 'input',
        name    : 'name',
        message : 'Your Widget Name',
        default : 'example'
      },
      {
        type    : 'confirm',
        name    : 'hasSASS',
        message : 'Does your widget require SASS?',
        default : false
      },
      {
        type    : 'confirm',
        name    : 'hasJS',
        message : 'Does your widget require Javascript?',
        default : false
      },
      {
        type    : 'confirm',
        name    : 'hasREADME',
        message : 'Generate README.md?',
        default : true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    var name = _.kebabCase(this.props.name),
        phpClass = _.upperFirst(_.camelCase(this.props.name)),
        jsConst = _.camelCase(this.props.name),
        label = _.startCase(this.props.name),
        key = _.snakeCase(this.props.name),
        hasSASS = this.props.hasSASS,
        hasJS = this.props.hasJS,
        hasREADME = this.props.hasREADME;

    this.fs.copyTpl(
      this.templatePath( 'template.php' ),
      this.destinationPath( './widgets/' + name + '/' + name + '.php'),
      {
        className     : name,
        label         : label
      }
    );
    this.fs.copyTpl(
      this.templatePath( 'acf.php' ),
      this.destinationPath('./widgets/' + name + '/' + name + '-acf.php' ),
      {
        label         : label,
        key           : key
      }
    );
    if(hasSASS){
      this.fs.copyTpl(
        this.templatePath( 'style.scss' ),
        this.destinationPath( './widgets/' + name + '/scss/_' + name + '.scss' ),
        {
          label         : label,
          className     : name,
        }
      );
    }
    if(hasJS){
      this.fs.copyTpl(
        this.templatePath('script.js'),
        this.destinationPath('./widgets/' + name + '/js/' + name + '.js'),
        {
          label: label,
          jsConst: jsConst,
        }
      );
    }
    if(hasREADME){
      this.fs.copyTpl(
        this.templatePath('readme.md'),
        this.destinationPath('./widgets/' + name + '/README.md'),
        {
          label: label
        }
      );
    }
  }
};
