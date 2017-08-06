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
    var itemSelector = '.alb_item';
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
        $('#alb_content').html('<iframe src="https://www.youtube.com/embed/' + videoID + '?badge=0&html5=1" width="1280" height="720" frameborder="0" allowfullscreen></iframe>');
      }
    }

    /*-- Append the actual lightbox to the HTML-body --*/
    $('body').append('<div id="alb_overlay"><nav><span id="alb_icon_prev" title="' + language[settings.language]["prev"] + '"></span><span id="alb_icon_close" title="' + language[settings.language]["close"] + '"></span><span id="alb_icon_next" title="' + language[settings.language]["next"] + '"></span></nav><div id="alb_content"></div><div id="alb_footer"></div></div>');

    function open(obj) {
      galleryTitle = obj.parent().data('title');
      index = $(obj).parent().children(itemSelector).index(obj);

      update();
      $('#alb_overlay').fadeIn(settings.effectTime);
    }

    function update() {
      loadContent($(items[index]));

      if ($(items[index]).data('title') && settings.showImageTitle)
        document.title = docTitle + ' - ' + $(items[index]).data('title');

      if ($(items[index]).parent().data('title') && settings.showGalleryTitle)
        $('#alb_footer').html(galleryTitle + ': ' + (index + 1) + ' / ' + totalItems);
      else
        $('#alb_footer').html(index + ' / ' + totalItems);
    }

    function close() {
      $('#alb_overlay').fadeOut(settings.effectTime);
			$('#alb_content').html('');

      if (document.title != docTitle)
        document.title = docTitle;
    }

    function next() {
      if (index < totalItems - 1) {
        index++;
        update();
      } else if (settings.roundRobin) {
        index = 0;
        update();
      }
    }

    function previous() {
      if (index > 0) {
        index--;
        update();
      } else if (settings.roundRobin) {
        index = totalItems - 1;
        update();
      }
    }

    function loadContent(item) {
      var tag = $(item)[0].localName;

      if (tag == 'a') {
        var videoID = $(item).attr('href').match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];
        $('#alb_content').html('<iframe src="https://www.youtube.com/embed/' + videoID + '?badge=0&html5=1" width="1280" height="720" frameborder="0" allowfullscreen></iframe>');
      } else if (tag == 'img') {
        $('#alb_content').html('<img src="' + $(item).attr('src') + '"/>');
      }
    }

    $(this).find(itemSelector).click(function(e) {
      e.preventDefault();
      open($(this));
    });

    $('#alb_icon_close').click(function() {
      close();
    });
    $('#alb_icon_next').click(function() {
      next();
    });
    $('#alb_icon_prev').click(function() {
      previous();
    });

    $(document).keydown(function(e) {
      if (e.keyCode == 39) next();
      if (e.keyCode == 37) previous();
      if (e.keyCode == 27) close();
    });
  };
}(jQuery));
