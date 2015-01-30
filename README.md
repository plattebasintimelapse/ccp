Conservation on the Central Platte
===================

By Steven Speicher, Ariana Brocious, & Peter Stegen

* [About](#about)
* [PBTers Start Here](#pbters-look-here)
* [What is This?](#what-is-this)
* [Usage](#usage)

## About
This app template spits out flat HTML, CSS, JS files to the PBT Amazon S3 account.

#### Requirements

* [Node](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [Sass](http://sass-lang.com/)

#### Also needed
* A copy of secrets.json (or environment variables)
* Create app_config.json file, or edit existing

By Steven Speicher, circa October 2014

## PBTers Look here
[How to Commit to the Repo](docs/commiting.md)

[How to Make Edits to the Project](docs/commiting.md)

## What is This?

#### Gruntfile.js
The gruntfile is a configuration file that loads modules that automate the building process. Your `grunt` commands are defined in here.

#### bower.json
The `bower.json` file are your front-end components used in the app. Bower makes it simple to load and tryout different tools.

#### package.json
`Package.json` contains a list of all the modules used in the `Gruntfile.js` file.

#### app/*
Most of the directories in here are self-explanatory. I'll explain the extras.

#### app/content
In here, you'll find a `copy.json` file that contains text for the entire app. It gets baked into the template files with the `grunt` command. There is also a `vigs.json` file that creates the map popups on each page.

#### app/data
Data used for the visualization are here. D3.js is used to load them into the page for rendering.

#### app/templates
In here, you'll find an assortment of `.html` template files which are used to spit out the various partials to the section directories.

Everything above gets minimized, concatinated, etc. when running the `grunt deploy` command.

Speaking of commands...


## Usage

To install grunt tasks from package.json

  	sudo npm install

To install bower components from bower.json

  	bower install

Build deployment to `dist` directory

    grunt

Run local server

    grunt serve

Make sure you have a copy of `secrets.json`. To push to the staging url, run:

	grunt stage

Deploy the project with:

	grunt deploy

Woop, woop!