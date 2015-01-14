PBT's Graphics Rig
===================

### About
This app template spits out flat HTML, CSS, JS files to the PBT Amazon S3 account. Editors can then embed those stories into the CMS, allowing for custom graphics and elements built outside the confounds of silly Drupal.

##### Requirements

* [Node](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [Sass](http://sass-lang.com/)

##### Uses
* [Pym.js](http://blog.apps.npr.org/pym.js/) (thanks NPR Team Visuals!)

##### Also needed
* A copy of secrets.json (or environment variables)
* Create app.json file, or edit existing

By Steven Speicher, November 2014

### Usage - Locally

Install above dependencies

To install grunt tasks from package.json

  	sudo npm install

To install bower components from bower.json

  	bower install

Run local server

    grunt serve

Build deployment to `dist` directory

    grunt

Make sure you have a copy of `secrets.json` and run

	grunt stage

to push to the staging url

Deploy the graphic with

	grunt deploy

### Usage - Deployment

**Follow NPR's tutorial for more information**
[here](http://blog.apps.npr.org/pym.js/)

In your CMS story, in source code view, add a `div` with an ID, like `chart` or `graph` or `turles`, where you would like the graphic:

	<div id="chart"></div>

In the CMS, at the bottom of the editor, in source code view, reference our copy of pym.js by copying this in:

	<script type="text/javascript" src="http://www.plattebasintimelapse.com/sites/all/themes/platte/scripts/pym.js"></script>

Then below that, create a new pymParent object:

	var pymParent = new pym.Parent('ID', 'URL', {});

The ID should be the ID you created above with your `div`. The URL will look something like

	http://projects.plattebasintimelapse.com/assets/static/pages/example/index.html

`example` would be the folder or production location you deployed your graphic. (HINT: The same as the PRODUCTION variable in the app.json file.)

Save the CMS story and visit your site live!
