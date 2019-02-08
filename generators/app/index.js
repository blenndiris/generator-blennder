'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {


  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red('generator-blennder')} project generator!`)
    );

    const prompts = await this.prompt([
      {
        type    : 'input',
        name    : 'client_name',
        message : 'Your Client Name',
        default : 'Client' // Default to current folder name
      },
      {
        type    : 'input',
        name    : 'url',
        message : 'What is your site URL?',
        default : _.kebabCase(this.appname)+'.local'
      },
      {
        type    : 'list',
        name    : 'type',
        message : 'Which Stack are you using?',
        choices : ['MAMP', 'Valet', 'Flywheel']
      },
      {
        type    : 'input',
        name    : 'dbname',
        message : 'What is your Database Table Name?',
        default : _.kebabCase(this.appname),
        when : function(answers){
          if(answers.type == 'MAMP')
          return true;
        }
      },
      {
        type    : 'input',
        name    : 'dbuser',
        message : 'What is your Database User Name?',
        default : 'root',
        when : function(answers){
          if(answers.type == 'MAMP')
          return true;
        }
      },
      {
        type    : 'input',
        name    : 'dbpass',
        message : 'What is your Database Password?',
        default : 'root',
        when : function(answers){
          if(answers.type == 'MAMP')
          return true;
        }
      },
      {
        type    : 'input',
        name    : 'admin_user',
        message : 'What is your Wordpress Admin Username?',
        default : 'Ninjas',
        when : function(answers){
          if(answers.type == 'MAMP')
          return true;
        }
      },
      {
        type    : 'confirm',
        name    : 'autogen_pass',
        message : 'Auto Generate Password',
        default : false,
        when : function(answers){
          if(answers.type == 'MAMP')
          return true;
        }
      },
      {
        type    : 'password',
        name    : 'admin_password',
        message : 'What is your Wordpress Admin Password?',
        default : 'ninjas',
        when    : function(answers){
          if(answers.autogen_pass ==  false)
          return true;
        }
      },
      {
        type    : 'input',
        name    : 'admin_email',
        message : 'What is your Wordpress Admin Email?',
        default : 'seth@blennd.com',
        when : function(answers){
          if(answers.type == 'MAMP')
          return true;
        }
      },
      {
        type    : 'input',
        name    : 'blogdescription',
        message : 'Please Enter a Wordpress Site Description:',
        default : 'Some New Site Description',
        when : function(answers){
          if(answers.type == 'MAMP')
          return true;
        }
      },
    ]).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });;
  }

  configuring() {
    this.props.theme_key = _.kebabCase(this.appname);
    this.props.theme_title = _.startCase(this.appname);
  }

  blennder() {
    this.log('Begin Installing Blennder Theme...');
    this.spawnCommandSync('git', ['clone', '--depth=1', '--quiet', '--progress', 'git@github.com:blenndiris/blennder.git', '.']);
    this.spawnCommandSync('git', ['clone', '--depth=1', '--quiet', '--progress', 'git@github.com:blenndiris/blennd-plugins.git', './wp-content/plugins/']);
    this.spawnCommandSync('mv', ['./wp-content/themes/blennder', './wp-content/themes/'+this.props.theme_key]);
    this.spawnCommandSync('rm', ['-rf', './wp-content/themes/'+this.props.theme_key+'/app/vendor/']);
    this.spawnCommand('rm', ['-rf', '.git/']);
    this.spawnCommand('rm', ['-rf', './wp-content/plugins/.git']);
  }

  writing() {
    this.log('Begin Updating Files...');

    this.fs.copyTpl(
      this.templatePath( 'style.css' ),
      this.destinationPath( './wp-content/themes/'+this.props.theme_key+'/style.css' ),
      {
        theme : this.props.theme_title
      }
    );
    this.fs.copyTpl(
      this.templatePath( '_variables.scss' ),
      this.destinationPath( './wp-content/themes/'+this.props.theme_key+'/assets/scss/_variables.scss' ),
      {
        theme : this.props.theme_key
      }
    );
    this.fs.copyTpl(
      this.templatePath( '.gitignore' ),
      this.destinationPath( '.gitignore' ),
      {
        theme : this.props.theme_key
      }
    );
    this.fs.copyTpl(
      this.templatePath( 'composer.json' ),
      this.destinationPath( 'composer.json' ),
      {
        theme : this.props.theme_key
      }
    );
    this.fs.copyTpl(
      this.templatePath( 'package.json' ),
      this.destinationPath( 'package.json' ),
      {
        theme : this.props.theme_key
      }
    );
    this.fs.copyTpl(
      this.templatePath( 'webpack.mix.js' ),
      this.destinationPath( 'webpack.mix.js' ),
      {
        theme : this.props.theme_key,
        url : this.props.url
      }
    );
  }

  install() {
    this.log("Begin Installing Composer Pacakges...");
    this.spawnCommand('composer', ['install']);
    this.log("Begin Installing NPM Pacakges...");
    this.spawnCommandSync('npm', ['install', '--silent']);
  }

  end() {
    if(this.props.type == 'MAMP'){
      this.log("Begin Installing Wordpress...");
      this.spawnCommandSync('wp', ['core', 'download', '--skip-content']);
      this.spawnCommandSync('wp', ['config', 'create', '--dbname='+this.props.dbname, '--dbuser='+this.props.dbuser, '--dbpass='+this.props.dbpass]);
      this.spawnCommandSync('wp', ['db', 'create']);
      if(this.props.autogen_pass){
        this.spawnCommandSync('wp', ['core', 'install', '--url=http://'+this.props.url, '--title='+this.props.client_name, '--admin_user='+this.props.admin_user, '--admin_email='+this.props.admin_email, '--skip-email']);
      }else{
        this.spawnCommandSync('wp', ['core', 'install', '--url=http://'+this.props.url, '--title='+this.props.client_name, '--admin_user='+this.props.admin_user, '--admin_email='+this.props.admin_email, '--admin_password='+this.props.admin_password, '--skip-email']);
      }
      this.spawnCommandSync('wp', ['theme', 'activate', this.props.theme_key]);
      this.spawnCommandSync('wp', ['plugin', 'install', 'gravityformscli']);
      this.spawnCommandSync('wp', ['plugin', 'uninstall', 'gravityforms', '--deactivate']);
      this.spawnCommandSync('wp', ['plugin', 'activate', '--all']);
      this.spawnCommandSync('wp', ['plugin', 'deactivate', 'BlenndPreLoader']);
      this.spawnCommandSync('wp', ['plugin', 'deactivate', 'responsive-menu-pro']);
      this.spawnCommandSync('wp', ['plugin', 'deactivate', 'backupbuddy']);
      this.spawnCommandSync('wp', ['plugin', 'deactivate', 'wp-migrate-db-pro']);
      this.spawnCommandSync('wp', ['plugin', 'deactivate', 'wp-migrate-db-pro-media-files']);
      this.spawnCommandSync('wp', ['post', 'create', '--post_status=publish', '--post_title=Homepage', '--post_type=page']);
      this.spawnCommandSync('wp', ['post', 'create', '--post_status=publish', '--post_title=About', '--post_type=page', '--page_template=templates/template-page-builder.php']);
      this.spawnCommandSync('wp', ['post', 'create', '--post_status=publish', '--post_title=Contact', '--post_type=page', '--page_template=templates/template-page-builder.php']);
      this.spawnCommandSync('wp', ['post', 'create', '--post_status=publish', '--post_title=Style Guide', '--post_type=page', '--page_template=templates/template-style-guide.php']);
      this.spawnCommandSync('wp', ['post', 'create', '--post_status=publish', '--post_title=Form Styles', '--post_type=page', '--post_parent=7', '--page_template=templates/template-page-builder.php']);
      this.spawnCommandSync('wp', ['option', 'update', 'blogdescription', this.props.blogdescription]);
      this.spawnCommandSync('wp', ['option', 'update', 'blog_public', 0]);
      this.spawnCommandSync('wp', ['option', 'update', 'show_on_front', 'page']);
      this.spawnCommandSync('wp', ['option', 'update', 'page_on_front', 4]); //Find a way to get the homepage ID
      this.spawnCommandSync('wp', ['rewrite', 'structure', '/%postname%/', '--hard']);

      //Gravity Forms Setup
      this.spawnCommandSync('wp', ['gf', 'install', '--force', '--activate', '--key=caf504634830d624fc6c035a16380114']);
      this.spawnCommandSync('wp', ['gf', 'setup', '--force']);
      this.spawnCommandSync('wp', ['gf', 'form', 'import', this.templatePath('gf-test-forms.json')]);
      this.spawnCommandSync('wp', ['plugin', 'uninstall', 'gravityformscli', '--deactivate']);
    }else {
      this.log("Begin Installing Wordpress...");
      this.spawnCommandSync('wp', ['core', 'download', '--skip-content']);
    }

    this.log("Compiling Theme Files...");
    this.spawnCommandSync('npm', ['run', 'dev']);

    // Configure git
    this.log("Initializing GIT Repositor");
    this.spawnCommandSync('git', ['init']);
    this.spawnCommandSync('git', ['add', '.']);
    this.spawnCommandSync('git', ['commit', '-m', 'Initial Commit']);
    this.spawnCommandSync('git', ['checkout', '-b', 'staging']);
    this.spawnCommandSync('git', ['checkout', '-b', 'dev']);

    this.log("Opening Site...");
    this.spawnCommandSync('open', ['http://'+this.props.url]);
    // this.spawnCommandSync('npm', ['run', 'watch']);
  }

};
