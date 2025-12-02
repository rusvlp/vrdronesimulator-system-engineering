
(function() {
 

  const themeName = "Apple Liquid Glass";
  const themeId = "glass";



  function toggleVideoBackground(videoSrc = './theme/bg.mp4') {
    const html = document.documentElement;
    let video = document.querySelector('#background-video');
    let overlay = document.querySelector('#video-overlay');


    if (!video) {
      video = document.createElement('video');
      video.id = 'background-video';
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;

      const source = document.createElement('source');
      source.src = videoSrc;
      source.type = 'video/mp4';
      video.appendChild(source);

      overlay = document.createElement('div');
      overlay.id = 'video-overlay';

      document.body.prepend(video);
      document.body.prepend(overlay);
    }


    html.classList.toggle('video-active');
  }


  function restoreGradientBackground() {
    const html = document.documentElement;
    const video = document.querySelector('#background-video');
    const overlay = document.querySelector('#video-overlay');

    html.classList.remove('video-active');

    if (video && video.parentNode) video.parentNode.removeChild(video);
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
   
  }

  
  function registerTheme() {

    const select = document.getElementById("theme-list");


    let buttons = document.querySelector('.left-buttons')
    let apple_button = document.createElement('button')
    apple_button.className = 'icon-button'
    apple_button.id = 'apple-button'
    apple_button.textContent = 'Позвонить в службу поддержки Apple'

    let apple_logo = document.createElement('img')
    apple_logo.id = 'apple-logo'
    apple_logo.src = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Apple_logo_grey.svg'
  //  apple_button.appendChild(apple_logo)


    buttons.appendChild(apple_button)
    apple_button.style.visibility = 'hidden'


    apple_button.addEventListener('click', function(e){
      toggleVideoBackground()
    })

    if (select){ //&& !select.querySelector(`[data-theme="${themeId}"]`)) {
      const li = document.createElement("li")
      li.role = "none"

      const item = document.createElement("button");
      item.className = 'theme';
  
      item.textContent = themeName;
      item.id = themeId
      li.appendChild(item);
      select.appendChild(li);
    }
  }



  function loadGlassThemeCss(){
    console.log("linking custom css")
    addCSS('./theme/liquid-glass.css', 'lglass-css')
    let apple_button = document.getElementById('apple-button')
    apple_button.style.visibility = 'visible'
  }

  function unloadGlassThemeCss(){
    restoreGradientBackground()
    console.log("unlinking custom css")
    removeCSS('lglass-css')
    let apple_button = document.getElementById('apple-button')
    apple_button.style.visibility = 'hidden'
  
  }

  function applyGlassTheme(){
    const glassButton = document.getElementById('glass')
    glassButton.click()
  }

  function addCSS(href, id) {
    if (document.getElementById(id)) return; // Уже подключён
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.id = id;
    document.head.appendChild(link);
}

function removeCSS(id) {
    const link = document.getElementById(id);
    if (link) {
        link.parentNode.removeChild(link);
    }
}

  const observer = new MutationObserver(() => {
    if (document.getElementById("theme-list")) {
      registerTheme();
      observer.disconnect();
    }

    if (localStorage.getItem('is_glass_theme') === 'true'){
      applyGlassTheme()
    }
  });
  
  observer.observe(document.body, { childList: true, subtree: true });

  console.log("adding custom event listener")

  const themePopup = document.getElementById('theme-list');

  

  themePopup.addEventListener('click', function(e) {
      let theme;
      if (e.target.className === 'theme theme-selected') {
          theme = e.target.id;
      } else {
        return
      }
      if (theme === 'glass'){
        localStorage.setItem('is_glass_theme', 'true')
        loadGlassThemeCss()
      } else if (localStorage.getItem('is_glass_theme') === 'true'){
        localStorage.setItem('is_glass_theme', 'false')
        unloadGlassThemeCss()
      }

    });


})();