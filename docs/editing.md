# Creating New Content

There are three files and two folders you need to edit when creating new content.

* app/content/content.json - Main content file
* app/content/vigs.json - Popup bubbles on maps
* app/vigs/*.html - Content inside vignette modals
* app/images - Images for the entire piece, note the folder /vigs for small images
* app/media - Media files (audio, video) for the piece

## Main Content

#### FILE - app/content/content.json

The four sections here are:

* Main
* History
* Problem
* Hope

##### Main

	"main": {
		"title": "Conserving the Platte",
		"subhed": "A community of organizations work to conserve the Platte.",
		"credits": "By Platte Basin Timelapse",

		"nav": {
			"one": {
				"h1": "History",
				"h2": "1800s"
			},
			"two": {
				"h1": "Problem",
				"h2": "1930s - 1970s"
			},
			"three": {
				"h1": "Hope",
				"h2": "1970s - today"
			}
		}
	}

Here, you can change the **title**, **subhead**, and **credits**. You can also change the nav titles.

##### Three Sections

	"history": {
		"hed": "A Wild Prairie River",
		"subhed": "What the Platte Used to Look Like",
		"meta": "March 7, 2015",
		"content": [
			{ "graf":

				"“For approximately 40,000 years, in a period pre-dating human development of the Platte River basin, climate has been the dominant extrinsic factor shaping the Platte River”"

			},{ "graf":

				"reductions in average flows which creates size (width) of river, and peak flows, like spring floods, that scours channels, reforms sandbars and removes vegetation. Both of those factors lead to increased growth of vegetation in river channels, thus further narrowing of river width and sandbar habitat for wildlife"

			},{ "image":
				{
					"src": "intro.jpg",
				  	"caption": "This is the caption.",
				  	"align": "right",
				  	"size": "medium"
				}
			}
		]
	}

In the three sections, you can change the **title**, the **subhead**, and **meta**.

You will also create an array of content inside the `[]` brackets. This is composed of a key : value pair. You have two choices:

* "graf" : "TEXT GOES IN HERE"
* "image" : { IMAGE INFO GOES HERE }

Make sure the key and value pair always have surrounded quotes.

Remember to always close any open brackets or braces. And note any red errors in text editor when accidentally deleting commas, quotes, or spacing. White space doesn't matter but it helps make things readable!


## Vignette Content

#### FILE - app/content/vigs.json


	{
	    "all": [
	        {
	            "title": "A Title Goes Here",
	            "page": "one",
	            "section":"1",
	            "lat": "40.9",
	            "long":"-98.8",
	            "image": "intro.jpg"
	        },{
	            "title": "A Title Goes Here Two",
	            "page": "two",
	            "section":"1",
	            "lat": "40.65",
	            "long":"-99.16",
	            "image": "test.jpg"
	        },{
	            "title": "Some Title",
	            "page": "three",
	            "section":"1",
	            "lat": "40.659",
	            "long":"-99.5",
	            "image": "intro.jpg"
	        },{
	            "title": "Sample Content",
	            "page": "sample",
	            "section":"1",
	            "lat": "40.683514",
	            "long":"-99.320652",
	            "image": "intro.jpg"
	        },{
	            "title": "Planting Prairie",
	            "page": "tnc-seeding",
	            "section":"3",
	            "lat": "40.739531",
	            "long":"-98.573713",
	            "image": "DawnIcyPlatte.jpg"
	        },{
	            "title": "Bridges",
	            "page": "bridges",
	            "section":"1",
	            "lat": "40.926396",
	            "long":"-98.342012",
	            "image": "intro.jpg"
	        }
	    ]
	}

In this file, you'll create a new JSON object which is wrapped in curly brackets, `{}`. Each Vignette is separate by a `,`.

You'll need to include key : value pairs for:

* title - The copy that appears on the map on hover state
* page - The refereced vig/*.html files created below. This string should be a unique single word, all lowercase.
* lat - Latitude of vignette
* long - Longitude of vignette
* image - Name of the image file located in app/images/vigs folder, only needs to be a small file, ~300px width ~100kb

#### FILE - app/vigs/*.html

In the app/vigs folder, create a new file called `PAGE.html` where PAGE is the same phrase exactly as used above in the vigs.json file.

This file contains the content actually displayed in the modal popup (vignette).

This is the base template:

	<div class="modal-dialog"><div class="modal-content"><div class="modal-heder"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="vig-meta clearfix">


	                META INFORMATION HERE


	</div></div><div class="modal-body">


	            	ACTUAL CONTENT HERE


	</div><button class="btn btn-defalt vig-close" data-dismiss="modal" aria-label="Close">Return to Map</button></div></div>

					SCRIPTS GO HERE

	<script>
	</script>

The `sample.html` file in this folder contains all sections of content that can be added which includes:

* Title
* Title with image
* Basic copy
* Copy with inline video
* Copy with inline image
* Featured Image
* Featured Video
* Audio
* Interactive

Copy and paste the entire `<section>` to `</section>` tag in each case. Delete comments where necessary. Adjust as needed.

#### DIRECTORY - app/images/ & app/media

We do not push media files to our repository, so as to protect access to them. Because of this, we have a separte Dropbox folder called `ccp-media` for all of these things.

You do need to make sure you are always uploading images to the Dropbox folder as well. So that way, all editors can use them in their local version of the site.

Be sure to **copy** files from the Dropbox folder into the appropriate folder in your local version when beginning work. Otherwise you'll have unlinked media.

Available media types:

* **Full** - jpg, width 1600px, used for full screen image (probably only intro page)
* **Featured** - jpg, width 1200px, used for full width modal vignettes
* **Pano** - jpg, width: 1200px, cropped to shorter than featured, used for full width modal vignettes
* **Main** - jpg, width: 800px, used in main content panel or aside images
* **Thumbnail** - jpg, width: 300px, used on map popup
* **Audio** - mp3, used for audio embeds

**ALWAYS** resize images to necessary dimensions. Try to minimize file size. Clean up directory of unused images regularly.

## Final Notes

These content pieces are rough drafts. Steven will continue to edit when returned. We simply want to be able to edit/add content incrementally. To evolve the site as the story evolves.

These steps will be used in March when publishing new vignettes during crane season.

If there are any major issues, delete the entire problem area and start over with templated items.

Good luck!

Rock on, code on!