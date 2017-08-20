(function($) {
  $.fn.ALightBox = function(options) {

    /*-- Plugin defaults --*/
    var defaults = {
      effectTime: 200,
      showImageTitle: true,
      showGalleryTitle: true,
      language: navigator.language.substr(0, 2),
      roundRobin: true,
      showYoutubeThumbnails: false
    }

    /*-- Variables --*/
    var settings = $.extend({}, defaults, options);
    var docTitle = document.title;
    var galleryTitle = '';
    var itemSelector = '.alb-item';
    var index = 0;
    var items = $(this).find(itemSelector);
    var totalItems = items.length;

    /*-- Languages --*/
    var language = {
      de: {
        prev: 'Vorheriges Bild',
        next: 'Nächstes Bild',
        close: 'Schließen'
      },
      en: {
        prev: 'previous image',
        next: 'next image',
        close: 'close'
      },
      fr: {
        prev: 'Image précédente',
        next: 'Image suivante',
        close: 'Fermer'
      },
      es: {
        prev: 'Imagen anterior',
        next: 'Siguiente imagen',
        close: 'Cerca'
      },
      it: {
        prev: 'Immagine precedente',
        next: 'Immagine successiva',
        close: 'Vicino'
      },
      zh: {
        prev: '上一张图片',
        next: '下一图片',
        close: '关'
      },
      ru: {
        prev: 'Предыдущее изображение',
        next: 'Следующее изображение',
        close: 'Закрыть'
      },
      da: {
        prev: 'Forrige billede',
        next: 'Næste billede',
        close: 'Tæt'
      },
      nl: {
        prev: 'Vorig beeld',
        next: 'Volgend beeld',
        close: 'Dichtbij'
      }
    }

    for (var i = 0; i < totalItems; i++) {
      /*-- Hide all hidden elements --*/
      if ($(items[i]).data('hidden') === true) {
        $(items[i]).css({
          display: 'none'
        });
      }

      var tag = $(items[i])[0].localName;

      /*-- Is the tag an a-tag? --*/
      if (tag == 'a' && settings.showYoutubeThumbnails) {
        var videoID = $(items[i]).attr('href').match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];

        $(items[i]).html('<img src="https://i.ytimg.com/vi/' + videoID + '/maxresdefault.jpg"/>');
        $('#alb-content').html('<iframe src="https://www.youtube.com/embed/' + videoID + '?badge=0&html5=1" width="1280" height="720" frameborder="0" allowfullscreen></iframe>');
      }
    }

    /*-- Append the actual lightbox to the HTML-body --*/
    $('body').append('<div id="alb-overlay"><nav><span id="alb-i-prev" title="' + language[settings.language]["prev"] + '"></span><span id="alb-i-close" title="' + language[settings.language]["close"] + '"></span><span id="alb-i-next" title="' + language[settings.language]["next"] + '"></span></nav><div id="alb-content"></div><div id="alb-footer"></div></div>');

    function open(obj) {
      galleryTitle = obj.parent().data('title');
      index = $(obj).parent().children(itemSelector).index(obj);

      update();
      $('#alb-overlay').fadeIn(settings.effectTime);

			return false;
    }

    function update() {
      loadContent($(items[index]));

      if ($(items[index]).data('title') && settings.showImageTitle)
        document.title = docTitle + ' - ' + $(items[index]).data('title');

      if ($(items[index]).parent().data('title') && settings.showGalleryTitle)
        $('#alb-footer').html(galleryTitle + ': ' + (index + 1) + ' / ' + totalItems);
      else
        $('#alb-footer').html(index + ' / ' + totalItems);

			return false;
    }

    function close() {
      $('#alb-overlay').fadeOut(settings.effectTime);
			$('#alb-content').html('');

      if (document.title != docTitle)
        document.title = docTitle;

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

    function loadContent(item) {
      var tag = $(item)[0].localName;

      if (tag == 'a') {
        var videoID = $(item).attr('href').match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];
        $('#alb-content').html('<iframe src="https://www.youtube.com/embed/' + videoID + '?badge=0&html5=1" width="1280" height="720" frameborder="0" allowfullscreen></iframe>');
      } else if (tag == 'img') {
        $('#alb-content').html('<img src="' + $(item).attr('src') + '"/>');
      }
			return false;
    }

    $(this).find(itemSelector).click(function(e) {
      e.preventDefault();
      open($(this));
    });

		var touchX = null;
		var touchY = null;

		document.addEventListener('touchstart', function(e) {
			touchX = e.touches[0].clientX;
			touchY = e.touches[0].clientY;
		});

		document.addEventListener('touchmove', function(e) {
			if (!touchX || !touchY)
				return;

			var diffX = touchX - e.touches[0].clientX;;
			var diffY = touchY - e.touches[0].clientY;

			if (Math.abs(diffX) > Math.abs(diffY)) {
					if (diffX > 0) {
						next();
					}
					else {
						previous();
					}
			}
			else {
				if (diffY > 0) {
					close();
				}
				else { }
			}

			touchX = null;
			touchY = null;
		});

    $('#alb-i-close').click(function() {
      close();
    });
    $('#alb-i-next').click(function() {
      next();
    });
    $('#alb-i-prev').click(function() {
      previous();
    });

    $(document).keypress(function(e) {
      if (e.keyCode == 39) next();
      if (e.keyCode == 37) previous();
      if (e.keyCode == 27) close();
    });
  };
}(jQuery));
