function ALightBox(options) {
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
    docTitle = document.title,
    galleryTitle = "",
    itemSelector = "alb-item",
    index = 0,
    items = document.getElementsByClassName(itemSelector),
    totalItems = items.length,
    totalItemsCount = 0,
    lightboxOpen = false;
  
  var JOSH=function(){"use strict";return{parse:function(r){if("object"==typeof r){var n="";for(var t in r){n+=t+"{";for(var e in r[t])n+=e+":"+r[t][e]+";";n+="}"}return n}}}}();
  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.textContent = JOSH.parse({
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
      "height": "48px",
      "background": "rgba(0, 0, 0, 0.5)"
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
      "padding": "8px",
      "width": "32px",
      "height": "32px",
      "fill": "#fff"
    },
    "#alb-i-prev:hover, #alb-i-close:hover, #alb-i-next:hover": {
      "opacity": "1"
    }
  });

  head.appendChild(style);

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
  var albOverlay = document.createElement("div");
  albOverlay.id = "alb-overlay";

  var albContent = document.createElement("div");
  albContent.id = "alb-content";

  function animationEnd() {
    if(arguments[0].animationName === "close-animation" && albOverlay.classList.contains("closing")) {
      albOverlay.classList.remove("closing");
      albContent.innerHTML = "";
      lightboxOpen = false;
    }
    else if(arguments[0].animationName === "open-animation" && albOverlay.classList.contains("opening")) {
      lightboxOpen = true;
    }
  }

  albOverlay.addEventListener("webkitAnimationEnd", animationEnd, false);
  albOverlay.addEventListener("animationend", animationEnd, false);
  albOverlay.addEventListener("oanimationend", animationEnd, false);

  var nav = document.createElement("nav");

  var albPrev = document.createElement("span");
  albPrev.id = "alb-i-prev";
  albPrev.title = language[settings.language]["prev"];
  albPrev.innerHTML = "<svg height='32' viewBox='0 0 512 512' width='32' xmlns='http://www.w3.org/2000/svg'><polygon points='352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 '/></svg>";

  var albClose = document.createElement("span");
  albClose.id = "alb-i-close";
  albClose.title = language[settings.language]["close"];
  albClose.innerHTML = "<svg height='32' viewBox='0 0 48 48' width='32' xmlns='http://www.w3.org/2000/svg'><path d='M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z'/><path d='M0 0h48v48h-48z' fill-opacity='0'/></svg>";

  var albNext = document.createElement("span");
  albNext.id = "alb-i-next";
  albNext.title = language[settings.language]["next"];
  albNext.innerHTML = "<svg height='32' viewBox='0 0 512 512' width='32' xmlns='http://www.w3.org/2000/svg'><polygon points='160,128.4 192.3,96 352,256 352,256 352,256 192.3,416 160,383.6 287.3,256 '/></svg>";

  nav.appendChild(albPrev);
  nav.appendChild(albClose);
  nav.appendChild(albNext);

  var albFooter = document.createElement("div");

  albOverlay.appendChild(nav);  
  albOverlay.appendChild(albContent);
  albOverlay.appendChild(albFooter);
  
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(albOverlay);

  function open(obj) {
    if(!lightboxOpen) {
      lightboxOpen = true;
      galleryTitle = obj.target.parentNode.dataset["title"];
      index = getIndex(obj.target.id, "alb-item"); //Doesn't work on a-tags yet
      
      if(!albOverlay.classList.contains("closing")) {
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

    items[i].onclick = function(e) {
      itemClicked(e);
    };
  }

  function getIndex(item, collection) {
    return [].slice.call(document.getElementsByClassName(collection)).indexOf(document.getElementById(item));
  }

  function loadContent(item) {
    var tag = item.localName;

    if (tag === "a") {
      var videoID = $(item).attr("href").match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];
      albContent.innerHTML = "<iframe src='https://www.youtube.com/embed/' + videoID + '?badge=0&html5=1' width='1280' height='720' frameborder='0' allowfullscreen></iframe>";
    } else if (tag === "img") {
      albContent.innerHTML = "<img src='' + item.src + ''/>";
    }
    return false;
  }

  function update() {
    loadContent(items[index]);

    if (items[index].dataset.title && settings.showImageTitle) {
      document.title = docTitle + " - " + items[index].dataset.title;
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
      
      albOverlay.classList.remove("opening");
      albOverlay.classList.add("closing");
      
      if (document.title !== docTitle) {
        document.title = docTitle;
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

  document.addEventListener("touchstart", function(e) {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  });

  document.addEventListener("touchmove", function(e) {
    if (!touchX || !touchY)
      return;

    var diffX = touchX - e.touches[0].clientX;
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