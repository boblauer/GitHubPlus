var s = document.createElement('script');
s.src = chrome.extension.getURL("js/ghplus.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
console.log(s.src);
(document.head||document.documentElement).appendChild(s);
