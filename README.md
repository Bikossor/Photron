# Photron
An easy-to-use lightbox.

[![Build Status](https://travis-ci.org/Bikossor/photron.svg?branch=develop)](https://travis-ci.org/Bikossor/photron)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/92dc4d00fa224240826dae2a48ed5cfd)](https://www.codacy.com/manual/Bikossor/ALightBox?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Bikossor/ALightBox&amp;utm_campaign=Badge_Grade)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Bikossor/Photron)
![GitHub file size in bytes](https://img.shields.io/github/size/Bikossor/Photron/dist/Photron.min.js?label=JS%20size)
![GitHub file size in bytes](https://img.shields.io/github/size/Bikossor/Photron/dist/Photron.min.css?label=CSS%20size)
![GitHub issues](https://img.shields.io/github/issues/bikossor/photron.svg)
![GitHub closed issues](https://img.shields.io/github/issues-closed/bikossor/photron.svg)
![GitHub](https://img.shields.io/github/license/bikossor/photron.svg)

## Features
- Supports touch gestures for navigation
- Completly vanilla and standalone

## Getting started
- *Coming soon...*

### Installing
- Just download the compressed javascript file from the ``dist/`` folder
- After that you'll also to reference the javascript file in your HTML file by using:<br>
```html
<script src="./[PATH]/[TO]/Photron.min.js"></script>
```
- Last you add the ``.photron-item`` class to every item inside the gallery

### Usage
```html
<script type="text/javascript">
	Photron({
		//-- Custom settings
	});
</script>
```

Setting | Datatype | Default | Description
------- | -------- | ------- | -----------
showImageTitle | boolean | true | Whether the ``data-title`` attribute of the ``img`` should be shown or not.
showGalleryTitle | boolean | true | Whether the ``data-title`` attribute of the Photron container *(e.g. ``.lightBox``)* should be shown or not.
roundRobin | boolean | true | Whether the items in an Photron should begin at the start if the end was reached and vice versa.
labelPrevious | string | "Previous image" | Set a custom text for the previous-button.
labelClose | string | "Close" | Set a custom text for the close-button.
labelNext | string | "Next image" | Set a custom text for the next-button.

## Versioning
I am using [Semantic Versioning 2.0.0](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Bikossor/Photron/tags).

## Authors
- André Lichtenthäler ([Bikossor](https://bikossor.de)) - *Initial work*

## License
This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for more details.

## Changelog
### Version 1.0.0: (3rd February, 2018)
- [Change] ``Photron`` is now completly vanilla and standalone
- [Added] Opening and closing animations of the overlay

### Version 0.2.1: (4th September, 2017)
- [Fixed] Issue [#2](https://github.com/Bikossor/Photron/issues/2)
- [Added] A custom [GitHub Page](https://bikossor.github.io/Photron)

### Version 0.2.0: (20th August, 2017)
- Renamed the CSS-IDs
- Improved CSS compatibility
- Every javascript function now returns false
- Added support for navigation via touch

### Version 0.1.1: (6th August, 2017)
- Fixed issue [#1](https://github.com/Bikossor/Photron/issues/1) *(This time for real...)*
- Changed some lines from ES6 to ES5 *(For compatibility reasons)*
- The ``close``-Function now resets the Photron content explicitly
- Added a minified version of the stylesheet

### Version 0.1.0: (2nd July, 2017)
- First introduction