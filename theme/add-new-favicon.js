(function(){
    function setFavicon(iconUrl) {
      
        const existingIcons = document.querySelectorAll('link[rel*="icon"]');
        existingIcons.forEach(icon => icon.parentNode.removeChild(icon));

        
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/png';
        link.href = iconUrl;

       
        document.head.appendChild(link);
    }
    setFavicon("./theme/artem.jpg")
})()