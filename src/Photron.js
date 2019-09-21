function Photron(options) {
	"use strict";

	/*-- Plugin defaults --*/
	var defaults = {
		showImageTitle: true,
		showGalleryTitle: true,
		roundRobin: true,
		labelPrevious: "Previous image",
		labelClose: "Close",
		labelNext: "Next image"
	};

	/*-- Variables --*/
	var settings = Object.assign(defaults, options),
		doc = document,
		docTitle = doc.title,
		galleryTitle = "",
		itemSelector = "photron-item",
		index = 0,
		items = doc.getElementsByClassName(itemSelector),
		totalItems = items.length,
		totalItemsCount = 0,
		lightboxOpen = false;

	function buildElement(tagName, id) {
		var resElement = doc.createElement(tagName);

		if (id) {
			resElement.id = id;
		}

		return resElement;
	};

	function appendChildrens(parent, children) {
		children.forEach(function(child) {
			parent.appendChild(child);
		});
	};

	/*-- Append the actual lightbox to the HTML-body --*/
	var albOverlay = buildElement("div", "photron-overlay");
	var albContent = buildElement("div", "photron-content");

	var nav = buildElement("nav");

	function previous() {
		if (index > 0) {
			index--;
			update();
		} else if (settings.roundRobin) {
			index = totalItems - 1;
			update();
		}
	}

	var albPrev = buildElement("span", "photron-i-prev");
	albPrev.title = settings.labelPrevious;
	albPrev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 128l-32-32-160 160 160 160 32-32-127-128z"/></svg>';
	albPrev.onclick = previous;

	function close() {
		if (lightboxOpen) {
			lightboxOpen = false;

			albOverlay.classList.remove("open");

			if (doc.title !== docTitle) {
				doc.title = docTitle;
			}
		}
	}

	var albClose = buildElement("span", "photron-i-close");
	albClose.title = settings.labelClose;
	albClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38 13l-3-3-11 11-11-11-3 3 11 11-11 11 3 3 11-11 11 11 3-3-11-11z"/><path fill="none" d="M0 0h48v48H0z"/></svg>';
	albClose.onclick = close;

	function next() {
		if (index < totalItems - 1) {
			index++;
			update();
		} else if (settings.roundRobin) {
			index = 0;
			update();
		}
	}

	var albNext = buildElement("span", "photron-i-next");
	albNext.title = settings.labelNext;
	albNext.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 128l32-32 160 160-160 160-32-32 127-128z"/></svg>';
	albNext.onclick = next;

	appendChildrens(nav, [albPrev, albClose, albNext]);

	var albFooter = buildElement("div");

	appendChildrens(albOverlay, [nav, albContent, albFooter]);

	var body = doc.getElementsByTagName("body")[0];
	appendChildrens(body, [albOverlay]);

	function loadContent(item) {
		if(item.localName !== "img") {
			return;
		}

		albContent.innerHTML = "<img src='" + item.src + "'/>";
	}

	function update() {
		loadContent(items[index]);

		if (items[index].dataset.title && settings.showImageTitle) {
			doc.title = docTitle + " - " + items[index].dataset.title;
		} else {
			doc.title = docTitle;
		}

		return false;
	}

	function getIndex(item, collection) {
		return [].slice.call(doc.getElementsByClassName(collection)).indexOf(doc.getElementById(item));
	}

	function open(obj) {
		if (!lightboxOpen) {
			lightboxOpen = true;
			galleryTitle = obj.target.parentNode.dataset["title"];
			index = getIndex(obj.target.id, "photron-item"); //Doesn't work on a-tags yet

			albOverlay.classList.add("open");

			update();
		}
		return false;
	}

	function itemClicked(item) {
		item.preventDefault();
		open(item);
	}

	for (var i = 0; i < totalItems; i++) {
		items[i].id = totalItemsCount++;

		items[i].onclick = function (e) {
			itemClicked(e);
		};
	}

	var touchX = null;
	var touchY = null;

	doc.ontouchstart = function (event) {
		touchX = event.touches[0].clientX;
		touchY = event.touches[0].clientY;
	};

	doc.ontouchmove = function (event) {
		if (!touchX || !touchY)
			return;

		var diffX = touchX - event.touches[0].clientX;
		var diffY = touchY - event.touches[0].clientY;

		if (Math.abs(diffX) > Math.abs(diffY)) {
			if (diffX > 0) {
				next();
			} else {
				previous();
			}
		} else {
			if (diffY > 0) {
				close();
			}
		}

		touchX = null;
		touchY = null;
	};

	doc.onkeypress = function (e) {
		if (e.keyCode === 39) {
			next();
		}
		if (e.keyCode === 37) {
			previous();
		}
		if (e.keyCode === 27) {
			close();
		}
	};
}