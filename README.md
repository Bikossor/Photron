[![Build Status](https://travis-ci.org/Bikossor/ALightBox.svg?branch=master)](https://travis-ci.org/Bikossor/ALightBox)
# ALightBox
An easy-to-use lightbox.

## Features
- Supports 9 different languages
	- German,
	- English,
	- French,
	- Spanish,
	- Italian,
	- Chinese,
	- Russian,
	- Danish,
	- Dutch
- ~~Supports videos from YouTube~~ **(Currently WIP)**
- Supports touch gestures for navigation
- Completly vanilla and standalone


## Getting started
- *Coming soon...*

### Installing
- Just download the compressed javascript file from the ``dist/`` folder
- After that you'll also to reference the javascript file in your HTML file by using:<br>
```html
<script src="./[PATH]/[TO]/ALightBox-1.0.0.js"></script>
```
- Last you add the ``.alb-item`` class to every item inside the gallery

### Usage
```html
<script type="text/javascript">
	new ALightBox({
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
- André Lichtenthäler ([Bikossor](https://bikossor.de)) - *Initial work*

## License
This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for more details.

## Changelog
### Version 1.0.0: (3rd February, 2018)
- [Change] ``ALightBox`` is now completly vanilla and standalone
- [Added] Opening and closing animations of the overlay

### Version 0.2.1: (4th September, 2017)
- [Fixed] Issue [#2](https://github.com/Bikossor/ALightBox/issues/2)
- [Added] A custom [GitHub Page](https://bikossor.github.io/ALightBox)

### Version 0.2.0: (20th August, 2017)
- Renamed the CSS-IDs
- Improved CSS compatibility
- Every javascript function now returns false
- Added support for navigation via touch

### Version 0.1.1: (6th August, 2017)
- Fixed issue [#1](https://github.com/Bikossor/ALightBox/issues/1) *(This time for real...)*
- Changed some lines from ES6 to ES5 *(For compatibility reasons)*
- The ``close``-Function now resets the ALightBox content explicitly
- Added a minified version of the stylesheet

### Version 0.1.0: (2nd July, 2017)
- First introduction

## Acknowledgments
- *Coming soon...*
