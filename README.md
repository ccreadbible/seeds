#ccMobile
A mobile project for ccreadbible.org website

## Installation

In project root directory, run
1. npm install
2. bower install

## Usage

### Run the app
Under seeds/, run **gulp**.

### Compile Stylus to CSS and minify it
**gulp stylus**

### Run TDD test 
**karma start seeds.conf.js

##Directory Structure
seeds/
----- hooks/        //ionic file
----- platforms/        //ionic file
----- plugins/        //ionic file
----- node_modules/        //dependencies stated in package.json
----- test/        //TDD tests  
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

##Tech Stacks
See package.json and bower.json
