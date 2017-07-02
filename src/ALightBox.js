(function($) {
	$.fn.ALightBox = function(options) {

		var defaults = {
			effectTime: 200,
			showImageTitle: true,
			showGalleryTitle: true,
			language: navigator.language.substr(0,2),
			roundRobin: false
		}

		/*--Variables--*/
		var settings = $.extend({}, defaults, options);
		var imgActive = {};
		var imgSource = "";
		var imgSelector = "#alb_overlay #alb_content img";
		var docTitle = document.title;
		var galleryTitle = "";

		/*--New variables (02.07.2017)--*/
		var itemSelector = "img";
		var itemCurrent = 0;
		var items = $(this).find(itemSelector);
		var lightbox_content = "<img />";

		//https://www.youtube.com/embed/  ?badge=0&autoplay=1&html5=1

		var language = {
			de: {prev: "Vorheriges Bild", next: "Nächstes Bild", close: "Schließen"},
			en: {prev: "Previous image", next: "Next image", close: "Close"},
			fr: {prev: "Image précédente", next: "Image suivante", close: "Fermer"},
			es: {prev: "Imagen anterior", next: "Siguiente imagen", close: "Cerca"},
			it: {prev: "Immagine precedente", next: "Immagine successiva", close: "Vicino"},
			zh: {prev: "上一张图片", next: "下一图片", close: "关"},
			ru: {prev: "Предыдущее изображение", next: "Следующее изображение", close: "Закрыть"},
			da: {prev: "Forrige billede", next: "Næste billede", close: "Tæt"},
			nl: {prev: "Vorig beeld", next: "Volgend beeld", close: "Dichtbij"}
		}

		$('body').append(`
			<div id="alb_overlay">
				<nav>
					<span id="alb_icon_prev" title="${language[settings.language]["prev"]}"></span>
					<span id="alb_icon_close" title="${language[settings.language]["close"]}"></span>
					<span id="alb_icon_next" title="${language[settings.language]["next"]}"></span>
				</nav>
				<div id="alb_content">
					${lightbox_content}
				</div>
				<div id="alb_footer"></div>
			</div>
		`);

		function Open(lbObject) {
			imgActive = lbObject;
			imgSource = imgActive.attr('src');
			galleryTitle = imgActive.parent().attr('data-title');

			Update(imgActive);
			$(imgSelector).attr('src', imgSource);
			$('#alb_overlay').fadeIn(settings.effectTime);
		}

		function Update(lbObject) {
			if(lbObject.attr('data-title') && settings.showImageTitle) {
				document.title = docTitle + " - " + lbObject.attr('data-title');
			}

			itemCurrent = $(lbObject).parent().children(itemSelector).index(lbObject) + 1;

			if(lbObject.parent().attr('data-title') && settings.showGalleryTitle) {
				alb_footer.innerHTML = galleryTitle + ": " + itemCurrent + " / " + items.length;
			}
			else {
				alb_footer.innerHTML = itemCurrent + " / " + items.length;
			}
		}

		function Close() {
			$('#alb_overlay').fadeOut(settings.effectTime);

			if(document.title != docTitle)
				document.title = docTitle;
		}

		function NextItem(lbObject) {
			if($(lbObject).next().is(itemSelector)) {
				imgActive = $(lbObject).next();
				imgSource = imgActive.attr('src');
				Update(imgActive);
				$(imgSelector).attr('src', imgSource);
			}
			else if(settings.roundRobin) {
				imgActive = $(lbObject).parent().children(itemSelector).first();
				imgSource = imgActive.attr('src');
				Update(imgActive);
				$(imgSelector).attr('src', imgSource);
			}
		}

		function PreviousItem(lbObject) {
			if($(lbObject).prev().is(itemSelector)) {
				imgActive = $(lbObject).prev();
				imgSource = imgActive.attr('src');
				Update(imgActive);
				$(imgSelector).attr('src', imgSource);
			}
			else if(settings.roundRobin) {
				imgActive = $(lbObject).parent().children(itemSelector).last();
				imgSource = imgActive.attr('src');
				Update(imgActive);
				$(imgSelector).attr('src', imgSource);
			}
		}



		/*
				if(location.hash != "") {
					Open(items[location.hash.substr(1)]);
				}
		*/

		/*--Overlay öffnen--*/
		$(this).find(itemSelector).stop().click(function() {
			Open($(this));
		});

		/*--Overlay schließen--*/
		$('#alb_icon_close').stop().click(function() {
			Close();
		});

		/*--Nächstes Bild--*/
		$('#alb_icon_next').stop().click(function() {
			NextItem(imgActive);
		});

		/*--Vorheriges Bild--*/
		$('#alb_icon_prev').stop().click(function() {
			PreviousItem(imgActive);
		});

		/*--Pfeiltasten-Steuerung--*/
		$(document).keydown(function(e) {
			/*--Pfeil nach Rechts--*/
			if(e.keyCode == 39)
				NextItem(imgActive);
			/*--Pfeil nach Links--*/
			if(e.keyCode == 37)
				PreviousItem(imgActive);
			/*--ESC-Taste--*/
			if(e.keyCode == 27)
				Close();
		});
	};
}(jQuery));
