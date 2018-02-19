function ALightBox(options) {
  "use strict";

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
  var settings = Object.assign(defaults, options),
    docTitle = document.title,
    galleryTitle = '',
    itemSelector = 'alb-item',
    index = 0,
    items = document.getElementsByClassName(itemSelector),
    totalItems = items.length,
    totalItemsCount = 0,
    lightboxOpen = false;
  
  var JOSH=function(){"use strict";var a,b,c=document,d=c.createElement("style"),e=function(e){if("head"===a)b=c.head;else if("body"===a)b=c.body;else throw new Error;d.textContent=e,b.appendChild(d)};return{parse(b,c="head"){if(a=c.toLowerCase(),!b)throw new Error;var d="";if("object"==typeof b&&1<=b.length){for(var f in b){for(var g in d+=f+"{",b[f])d+=g+":"+b[f][g]+";";d+="}"}e(d)}else if("string"==typeof b)e(b);else throw new Error;return!0}}}();
  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.innerHTML = JOSH.parse({
    "#alb-overlay": {
      "display": "flex",
      "position": "fixed",
      "top": 0,
      "left": 0,
      "z-index": 10000,
      "background": "rgba(0, 0, 0, 0.8)",
      "width": "100%",
      "height": "100%",
      "transform": "translateY(-100%)",
    },
    "#alb-overlay nav": {
      "-webkit-box-pack": "justify",
      "-ms-flex-pack": "justify",
      "display": "-webkit-box",
      "display": "-ms-flexbox",
      "display": "flex",
      "justify-content": "space-between",
      "width": "100%",
      "height": "48px"
    },
    "#alb-content": {
      "-webkit-box-align": "center",
      "-ms-flex-align": "center",
      "-webkit-box-pack": "center",
      "-ms-flex-pack": "center",
      "display": "-webkit-box",
      "display": "-ms-flexbox",
      "display": "flex",
      "position": "absolute",
      "top": "48px",
      "bottom": "48px",
      "align-items": "center",
      "justify-content": "center",
      "width": "100%",
      "overflow": "hidden"
    },
    "#alb-content img, #alb-content iframe": {
      "max-width": "calc(100% - 4rem)",
      "max-height": "100%"
    },
    "#alb-footer": {
      "position": "absolute",
      "bottom": 0,
      "width": "100%",
      "height": "48px",
      "color": "#fff",
      "font-family": "'Roboto', Arial",
      "font-size": "1.2rem",
      "line-height": "48px",
      "text-align": "center",
      "text-shadow": "1px 1px 2px #000"
    },    
    "#alb-i-prev, #alb-i-close, #alb-i-next": {
      "display": "inline-block",
      "opacity": "0.6",
      "cursor": "pointer",
      "margin": "8px",
      "width": "32px",
      "height": "32px"
    },
    "#alb-i-prev:hover, #alb-i-close:hover, #alb-i-next:hover": {
      "opacity": "1"
    },
    "#alb-i-prev": {
      "background": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wwTFTEn0VrCaAAAAAxpVFh0Q29tbWVudAAAAAAAvK6ymQAAAahJREFUeNrtm71Ow0AQhGcNQkhBUEVUQAk9z88bQA8FRVIhqiBFAoRgaFxEweCfnH17O2xp2Zbm2/Hd7Z4PEA2SjySpKHzFjTAh4WsAs+3rpio8PACSrwAO2+4ztYxvRxVI+HM9qs/6PGcRhAOYD32+Klj4ss74fJf3mFrGi3VAqowX5wCSSwBnY73fVIW7BTCVcHcAphbuBkAu4dkB5BaeDUDqebwYAN6ETwbAq/DRAXgXPhqAvvV47qhSZnxIPV68A0rLeDIAJFcATlB4mFrGBwMg+YWATVRTFd4KILrwXwGoCP8BgOQnAu0TdAZA8gPAPkSjUrJ72yfwDuBAFoDqWPDXNCgBostCKDSIPkvhkCA6CzKzPTMzAG+SDohaFaZoiLwAOJYFULoj/puiyYmaHdWD5YOkAxocsQBwLuOABkdceHZEjs1RV46YfGXnzREefpC4B3ApCyA3CDfFjZld1Z/GnaQDcjnCbXm74YgbSQc0OOIWwLUsgLFAFNsSTzVGRDgwsROI4nt8u06fEQ9NPQE4lQXQF4TCwclejogMYsGGkAch74hvE9kpVdZ2MIQAAAAASUVORK5CYII=') center center no-repeat",
      "background-size": "32px 32px"
    },
    "#alb-i-close": {
      "background": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wwTFTU234YnngAAAAxpVFh0Q29tbWVudAAAAAAAvK6ymQAAAqhJREFUeNrtm81twkAQRr8hoQskcuUSNxClB0Qb6SGiHA6BCpJDyDkSPaQLhCYXGzmwtvdvZuzglXwLaN8jnt3ZmSVmRsogIgx5THDjYxSQ8NkZgLk1ADNT6hfEPAtm3jDzlpkLQ/iinMOGmRdaAir4aphIqMFXI05CIryJBAd8vIQM8KoSWuDjJGSCV5HgAR8uISO8qIQA+DAJmeFFJETA+0sQgK9LIEN4PwlC8NXYlwBW8N0SBOH/vA7V9xvAt0twCMgJ75TQJUIAvi5h1pYLEICpwAq2BPAKoLgU74Iv/3YpMI8pgLuu/wAp++fA6Io7wr9888rUEAQlJ7JvkKAP37EMUjlZKQmFObzHRoikJ2YK77kVlpbwbQYfkAxJSrCDD0yHi4FICMtDAg9ECsHAqA8feSTW19chLgONPBTtm4RtdNIVKaBPEq7yjCARCQL6EBid8EEiEgVYSuiE9xFBqcXRckhmcK7xBeAZQPDkL4u5uQRoSoiGd4nIWRw9AFgB+BCE3wF4SYWvv/q5q8OPwr/+g0SxIdejFQyDgl9XUMwVAwjAJ4AnpSC4A7AuX7ukIHg/QHjUAq23hKZWntQYUAB4U4ZvPGhtAm/tYxrwLtB0K1zccjLU14ORqHQ4dBWwCHjBqwMRea8Ok4EEvKDAKHEkNpTzQJFDUUn49/Lp7bG4Rp1Q8qA1qTAiXrFRKsNFlcY04dXKcL4CLOB7Ux6fa8Mrdoec405bNngCcBTaoKzqJzlNCQoRHZh5fZH15RpHImKLJiniATVJ5W6Tiz50YaM2uZyNksndomzUKDm2ynJas3T2q2Rs1Cwd0y4vdo+OjdrlfSXsJeEDJIhcmPC5MqN2g5KNrsyMl6b4H16bS60M0dXWUl/CHMCJiH4sBIyXp4c+bl7AL1DfX7VzuAoBAAAAAElFTkSuQmCC') center center no-repeat",
      "background-size": "32px 32px"
    },
    "#alb-i-next": {
      "background": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wwTFTE3zO3SDAAAAAxpVFh0Q29tbWVudAAAAAAAvK6ymQAAAaFJREFUeNrlmrFOwzAURd91LQEqEhOIia79AH6fT8gHZGCgTMCCEEgVAsxQB0HUqBFx7Pd8zxi1Se/xtWtZkbDjVlgJf3lmy48QQthz/Q3AKbMAGhGHBHRsAZzUKMCN/NxxXCNeWQV0LKOIR7YpMMQTgAumBvQ5j43YsDbAfCNc4vuZa0TqBvS5B3DFLEC9iFwC1IrILUCdiFIC1IgoLaC4CC0Ciu0jtAnILkKrgGwitAuYXYQVAR3JT6ic2CL5eYS1BiRvhBPbLKce51tvwORG1CagIwBwzAJGi6hdwEERLAIGRTjhAvFf45O1AX0+nHADTxr8HcCRiAibgC8Ai98XPGtwFgGDwWsXcDB4rfuALXYsxn6hlgb8+1zAuoAXAGdTbuDZRty6ANpD0TYubsnfWdTegA2A1ZwPcMpHfDX3gzzbiGttQLYR19aAFsC65A/wrMFLTYEmVn2tZOpla0CrKXTOBtxoG/FcDWgAXFvYYnrW4KkFtJprPqcAs8GnLoKN9sVtrgY8ALiUivCswccKqDb4D2E/d8ICbfCeAL7gkW/gmA5/nYsoNwAAAABJRU5ErkJggg==') center center no-repeat",
      "background-size": "32px 32px"
    }
  });

  head.appendChild(style);

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

  /*-- Append the actual lightbox to the HTML-body --*/
  var alb_overlay = document.createElement("div");
  alb_overlay.id = "alb-overlay";
  alb_overlay.addEventListener("webkitAnimationEnd", animationEnd, false);
  alb_overlay.addEventListener("animationend", animationEnd, false);
  alb_overlay.addEventListener("oanimationend", animationEnd, false);

  var nav = document.createElement("nav");

  var alb_i_prev = document.createElement("span");
  alb_i_prev.id = "alb-i-prev";
  alb_i_prev.title = language[settings.language]["prev"];

  var alb_i_close = document.createElement("span");
  alb_i_close.id = "alb-i-close";
  alb_i_close.title = language[settings.language]["close"];

  var alb_i_next = document.createElement("span");
  alb_i_next.id = "alb-i-next";
  alb_i_next.title = language[settings.language]["next"];

  nav.appendChild(alb_i_prev);
  nav.appendChild(alb_i_close);
  nav.appendChild(alb_i_next);

  var alb_content = document.createElement("div");
  alb_content.id = "alb-content";

  var alb_footer = document.createElement("div");

  alb_overlay.appendChild(nav);  
  alb_overlay.appendChild(alb_content);
  alb_overlay.appendChild(alb_footer);
  
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(alb_overlay);

  var alb_content = document.getElementById("alb-content");

  for (var i = 0; i < totalItems; i++) {
    if (items[i].localName == 'a' && settings.showYoutubeThumbnails) {
      var videoID = items[i].href.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];

      items[i].innerHTML = '<img src="https://i.ytimg.com/vi/' + videoID + '/maxresdefault.jpg"/>';
      alb_content.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoID + '?badge=0&html5=1" width="1280" height="720" frameborder="0" allowfullscreen></iframe>';
    }

    items[i].id = totalItemsCount++;

    items[i].onclick = function(e) {
      itemClicked(e);
    };
  }

  function getIndex(item, collection) {
    return [].slice.call(document.getElementsByClassName(collection)).indexOf(document.getElementById(item));
  }

  function open(obj) {
    if(!lightboxOpen) {
      lightboxOpen = true;
      galleryTitle = obj.target.parentNode.dataset["title"];
      index = getIndex(obj.target.id, "alb-item"); //Doesn't work on a-tags yet
      
      if(!alb_overlay.classList.contains("closing")) {
        alb_overlay.classList.add("opening");
      }      
      
      update();  
    }
    return false;
  }
  
  function update() {
    loadContent(items[index]);

    if (items[index].dataset["title"] && settings.showImageTitle) {
      document.title = docTitle + ' - ' + items[index].dataset["title"];
    }
    else {
      document.title = docTitle;
    }
    
    /* TODO:    
    if ($(items[index]).parent().data('title') && settings.showGalleryTitle)
      $('#alb-footer').html(galleryTitle + ': ' + (index + 1) + ' / ' + totalItems);
    else
      $('#alb-footer').html((index + 1) + ' / ' + totalItems);
    */

    return false;
  }

  function close() {
    if(lightboxOpen) {
      lightboxOpen = false;
      
      alb_overlay.classList.remove("opening");
      alb_overlay.classList.add("closing");
      
      if (document.title != docTitle) {
        document.title = docTitle;
      }
    }
    return false;
  }

  function animationEnd() {
    if(arguments[0].animationName === "close-animation" && alb_overlay.classList.contains("closing")) {
      alb_overlay.classList.remove("closing");
      alb_content.innerHTML = "";
      lightboxOpen = false;
    }
    else if(arguments[0].animationName === "open-animation" && alb_overlay.classList.contains("opening")) {
      lightboxOpen = true;
    }
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
    var tag = item.localName;

    if (tag == 'a') {
      var videoID = $(item).attr('href').match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];
      alb_content.innerHTML = '<iframe src="https://www.youtube.com/embed/' + videoID + '?badge=0&html5=1" width="1280" height="720" frameborder="0" allowfullscreen></iframe>';
    } else if (tag == 'img') {
      alb_content.innerHTML = '<img src="' + item.src + '"/>';
    }
    return false;
  }

  function itemClicked(item) {
    item.preventDefault();
    open(item);
  };

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
        if (diffX > 0)
          next();
        else
          previous();
    }
    else {
      if (diffY > 0)
        close();
    }

    touchX = null;
    touchY = null;
  });

  document.getElementById("alb-i-close").onclick = function() {
    close();
  };
  document.getElementById("alb-i-next").onclick = function() {
    next();
  };
  document.getElementById("alb-i-prev").onclick = function() {
    previous();
  };

  document.onkeypress = function(e) {
    if (e.keyCode == 39) next();
    if (e.keyCode == 37) previous();
    if (e.keyCode == 27) close();
  };
};