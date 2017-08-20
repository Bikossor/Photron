# ALightBox
ALightBox is an easy-to-use jQuery-Plugin which provides a lightbox for your website.

## Features
- Supports 9 different languages
	- German *(de)*
	- English *(en)*
	- French *(fr)*
	- Spanish *(es)*
	- Italian *(it)*
	- Chinese *(zh)*
	- Russian *(ru)*
	- Danish *(da)*
	- Dutch *(nl)*
- Supports images
- Supports videos from YouTube
- Supports touch

## Getting started
- *Coming soon...*

### Requirements
- [jQuery](https://jquery.com/)

### Installing
- Just download the compressed *(recommended)* or uncompressed javascript file **and** the compressed *(also recommended)* stylesheet from the ``src/`` folder
- Next up reference the stylesheet in your HTML file by using:<br>
**Example:** ``<link rel="stylesheet" href="./[PATH]/[TO]/ALightBox-0.1.1.css">`` *(Make sure your path is correct!)*
in your ``head`` element.
- Now we have to include the jQuery library in the ``head`` element with the following code:<br>
``<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>`` *(I recommend to download this file to your server)*
- After that you'll also need to reference the javascript file in your HTML file by using:<br>
**Example:** ``<script src="./[PATH]/[TO]/ALightBox-0.1.1.js"></script>`` *(Make sure the jQuery library is chronologically before this script)*

### Usage
```html
<script type="text/javascript">
	$('.YourSelector').ALightBox({
		//-- Custom settings
	});
</script>
```

Setting | Datatype | Default | Description
------- | -------- | ------- | -----------
effectTime | int | 200 | How much milliseconds any animation of the ALightBox takes.
showImageTitle | boolean | true | Whether the ``data-title`` attribute of the ``img`` should be shown or not.
showGalleryTitle | boolean | true | Whether the ``data-title`` attribute of the ALightBox container *(e.g. ``.lightBox``)* should be shown or not.
language | string | Default language of the webbrowser | In which language the text should be translated. Possible languanges: **de** (German), **en** (English), **fr** (French), **es** (Spanish), **it** (Italian), **zh** (Chinese), **ru** (Russian), **da** (Danish) and **nl** (Dutch)
roundRobin | boolean | true | Whether the items in an ALightBox should begin at the start if the end was reached and vice versa.
showYoutubeThumbnails | boolean | false | Whether the thumbnails of embedded YouTube videos should be shown or not.

## Deployment
- *Coming soon...*

## Built with
- **Nothing else**

## Versioning
I am using [Semantic Versioning 2.0.0](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Bikossor/ALightBox/tags).

## Authors
- **André Lichtenthäler ([Bikossor](https://github.com/Bikossor))** - *Initial work*

## License
This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for more details.

## Changelog
### Version 0.2.0: (20th August, 2017)
- Renamed the CSS-IDs
- Improved CSS compatibility
- Every javascript function now returns false
- Added support for navigation via touch

### Version 0.1.1: (6th August, 2017)
- Fixed issue [#1](/issues/1) *(This time for real...)*
- Changed some lines from ES6 to ES5 *(For compatibility reasons)*
- The ``close``-Function now resets the ALightBox content explicitly
- Added a minified version of the stylesheet

### Version 0.1.0: (2nd July, 2017)
- First introduction

## Acknowledgments
- *Coming soon...*
