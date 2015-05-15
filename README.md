#ccMobile

A mobile project for ccreadbible.org website

## Installation

Please make sure you have "npm" and "bower" installed.  
In project root directory, run  
1. npm install  
2. bower install  

## Usage

### Run the app
run *gulp serve*.

### Compile Stylus to CSS and minify it
run *gulp stylus*

### Run TDD test 
run *karma start seeds.conf.js*

##Directory Structure
seeds/  
----- hooks/        //ionic file  
----- platforms/        //ionic file  
----- plugins/        //ionic file  
----- node_modules/        //dependencies stated in package.json  
----- test/        //write all the TDD tests here  
----- www/        //this is where we compose our code  
---------- app/  
--------------- common/        //functions can be shared between modules  
-------------------- mixins/   
------------------------- homily.js  
------------------------- readings.js  
-------------------- common.js  
--------------- main/        //main business logic, each components are seperated in different folders. Each folder at least includes .html, .styl and .js  
-------------------- home/  
-------------------- homilies/  
-------------------- redings/  
-------------------- main.js  
-------------------- main.styl  
-------------------- main.tpl.html  
--------------- app.js  
--------------- style.styl  
---------- css/        //.styl will be compiled to .css and .min.css, they are saved here                 
---------- img/   
---------- lib/        //dependencies stated in bower.json  
---------- index.html        // entry file  
----- .bowerrc        //indicates the location of bower components		  
----- .gitignore        //files you don't wish to push to remote repository   
----- .bower.json        //list dependencies  
----- package.json        //list dependencies  
----- config.xml  
----- gulpfile.js         
----- seeds.conf.js        //TDD test configuration  
----- README.md  
----- ionic.project  

##Dependencies

angular-material": "0.6.0-rc3-master-98c3152
ionic: driftyco/ionic-bower#1.0.0-beta.14
bower: ^1.3.3
browser-sync: ^1.8.2
gulp: ^3.5.6
gulp-concat: ^2.2.0
gulp-minify-css: ^0.3.0
gulp-rename: ^1.2.0
gulp-util: ^2.2.14

###CSS preprocessor
gulp-stylus: ^1.3.4
nib: 1.1.0

###Test runner and test frameworks

karma: ^0.12.31
chai: ^2.2.0
karma-chai: ^0.1.0
karma-chrome-launcher: ^0.1.7
karma-mocha: ^0.1.10
karma-nyan-reporter: 0.0.60
mocha: ^2.2.4
shelljs: ^0.3.0


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request
