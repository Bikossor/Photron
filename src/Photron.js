function Photron(options) {
	"use strict";

	/*-- Plugin defaults --*/
	var defaults = {
		showImageTitle: true,
		showGalleryTitle: true,
		language: navigator.language.substr(0, 2),
		roundRobin: true,
		showYoutubeThumbnails: false
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

	/*-- Languages --*/
	var language = {
		de: {
			prev: "Vorheriges Bild",
			next: "Nächstes Bild",
			close: "Schließen"
		},
		en: {
			prev: "previous image",
			next: "next image",
			close: "close"
		},
		fr: {
			prev: "Image précédente",
			next: "Image suivante",
			close: "Fermer"
		},
		es: {
			prev: "Imagen anterior",
			next: "Siguiente imagen",
			close: "Cerca"
		},
		it: {
			prev: "Immagine precedente",
			next: "Immagine successiva",
			close: "Vicino"
		},
		zh: {
			prev: "上一张图片",
			next: "下一图片",
			close: "关"
		},
		ru: {
			prev: "Предыдущее изображение",
			next: "Следующее изображение",
			close: "Закрыть"
		},
		da: {
			prev: "Forrige billede",
			next: "Næste billede",
			close: "Tæt"
		},
		nl: {
			prev: "Vorig beeld",
			next: "Volgend beeld",
			close: "Dichtbij"
		}
	};

	/*-- Append the actual lightbox to the HTML-body --*/
	var albOverlay = doc.createElement("div");
	albOverlay.id = "photron-overlay";

	var albContent = doc.createElement("div");
	albOverlay.onanimationend = function (event) {
		if (event.animationName === "close-animation" && albOverlay.classList.contains("closing")) {
			albOverlay.classList.remove("closing");
			albContent.innerHTML = "";
			lightboxOpen = false;
		} else if (event.animationName === "open-animation" && albOverlay.classList.contains("opening")) {
			lightboxOpen = true;
		}
	};

	var albContent = doc.createElement("div");
	albContent.id = "photron-content";

	var nav = doc.createElement("nav");

	var albPrev = doc.createElement("span");
	albPrev.id = "photron-i-prev";
	albPrev.title = language[settings.language]["prev"];
	albPrev.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 128l-32-32-160 160 160 160 32-32-127-128z"/></svg>';
	albPrev.onclick = function () {
		previous();
	};

	var albClose = doc.createElement("span");
	albClose.id = "photron-i-close";
	albClose.title = language[settings.language]["close"];
	albClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M38 13l-3-3-11 11-11-11-3 3 11 11-11 11 3 3 11-11 11 11 3-3-11-11z"/><path fill="none" d="M0 0h48v48H0z"/></svg>';
	albClose.onclick = function () {
		close();
	};

	var albNext = doc.createElement("span");
	albNext.id = "photron-i-next";
	albNext.title = language[settings.language]["next"];
	albNext.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M160 128l32-32 160 160-160 160-32-32 127-128z"/></svg>';
	albNext.onclick = function () {
		next();
	};

	nav.appendChild(albPrev);
	nav.appendChild(albClose);
	nav.appendChild(albNext);

	var albFooter = doc.createElement("div");

	albOverlay.appendChild(nav);
	albOverlay.appendChild(albContent);
	albOverlay.appendChild(albFooter);

	var body = doc.getElementsByTagName("body")[0];
	body.appendChild(albOverlay);

	function loadContent(item) {
		var tag = item.localName;

		if (tag === "a") {
			var videoID = $(item).attr("href").match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];
			albContent.innerHTML = "<iframe src='https://www.youtube.com/embed/' + videoID + '?badge=0&html5=1' width='1280' height='720' frameborder='0' allowfullscreen></iframe>";
		} else if (tag === "img") {
			albContent.innerHTML = "<img src='" + item.src + "'/>";
		}
		return false;
	}

	function update() {
		loadContent(items[index]);

		if (items[index].dataset.title && settings.showImageTitle) {
			doc.title = docTitle + " - " + items[index].dataset.title;
		} else {
			doc.title = docTitle;
		}

		/* TODO:    
		if ($(items[index]).parent().data('title') && settings.showGalleryTitle)
		  $('#photron-footer').html(galleryTitle + ': ' + (index + 1) + ' / ' + totalItems);
		else
		  $('#photron-footer').html((index + 1) + ' / ' + totalItems);
		*/

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

			if (!albOverlay.classList.contains("closing")) {
				albOverlay.classList.add("opening");
			}

			update();
		}
		return false;
	}

	function itemClicked(item) {
		item.preventDefault();
		open(item);
	}

	for (var i = 0; i < totalItems; i++) {
		if (items[i].localName === "a" && settings.showYoutubeThumbnails) {
			var videoID = items[i].href.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];

			items[i].innerHTML = "<img src='https://i.ytimg.com/vi/' + videoID + '/maxresdefault.jpg'/>";
			albContent.innerHTML = "<iframe src='https://www.youtube.com/embed/' + videoID + '?badge=0&html5=1' width='1280' height='720' frameborder='0' allowfullscreen></iframe>";
		}

		items[i].id = totalItemsCount++;

		items[i].onclick = function (e) {
			itemClicked(e);
		};
	}

	function close() {
		if (lightboxOpen) {
			lightboxOpen = false;

			albOverlay.classList.remove("opening");
			albOverlay.classList.add("closing");

			if (doc.title !== docTitle) {
				doc.title = docTitle;
			}
		}
		return false;
	}

	function next() {
		if (index < totalItems - 1) {
			index++;
			update();
		} else if (settings.roundRobin) {
			index = 0;
			update();
		}
		return false;
	}

	function previous() {
		if (index > 0) {
			index--;
			update();
		} else if (settings.roundRobin) {
			index = totalItems - 1;
			update();
		}
		return false;
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