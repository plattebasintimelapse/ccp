### How to Use this Repo
#### A Primer for PBT Journalists

## Pre-reqs
To work on this project, you need several things:

* A github account
* Admin access on your computer
* The project's shared Dropbox folder
* A copy of `secrets.json` and `app_config.json`
* A text editor (Sublime Text 2)
* Install [Node](http://nodejs.org/), [Bower](http://bower.io/), [Grunt](http://gruntjs.com/), [Sass](http://sass-lang.com/)
* Install [Github](https://mac.github.com/)
* Permissions to this repo

## Set-up
On **Github.com**, go the project repo [page](https://github.com/stvnspchr/ccp) and click **Clone to Desktop**

If not already done, create the folder at `~/username/Github/` and the save project.

In **Terminal**, `cd` into the project root, ~/username/Github/project

	cd Github/ccp

You have to install the grunt tasks from package.json with:

  	sudo npm install

Then install the front-end libraries in bower components from bower.json with:

  	bower install

Then you can run the site from your local machine with:

    grunt
    grunt serve

## Making Edits

If the site isn't already running, do the above steps.

Make sure you are working on the most recent version by opening **Github** and clicking `Sync` in the top right.

Also make sure you have all the new files in `app/media` or `app/images` from other editors.

In **Sublime Text 2**, open the project repository. The primary files that will be edited are

* app/content/content.json
* app/content/vigs.json
* app/vigs/*.html
* app/images/*
* app/media/*

Make any changes in these files and witness the live changes in your broswer at `localhost:9000`

## Committing Edits

Once you`ve made any changes or at the end of the day, you can push them back to Github for others to work on.

In **Github**, select the current project on the left panel. In the center panel, you'll see a list of all the changed files. In the right panel, you'll see the edits in the currently selected file.

You can commit all changes by typing in a **commit summary**.

* Make it short & sweet
* Describe what you did

Then click **Commit & Sync**.

## Finishing

Once you've made changes, saved files, and commited, you need to exit **Terminal** by typing

	Control+C
	exit

Then you can close out of Github.

Close out of Sublime Text 2. 

If you've made any changes to the `app/media` or `app/images` folder, make sure you upload those files to Dropbox for others to use in their project

YAAAYY! You're now hacking on shid.