var img = document.getElementById("searchImg");
var input = document.getElementById("search");
document.getElementById("bar").addEventListener("click", input.focus());

var closeSettings;
function resetTimer() {
    clearTimeout(closeSettings);
    closeSettings = setTimeout(function(){if(isExtended){changeHeight();}}, 30000);
}

input.blur();

input.addEventListener("focus", focus);
input.addEventListener("blur", blur);

var blurInput;
function focus() {
    input.classList.add("shadow");
    input.focus();
    clearTimeout(blurInput);
    resetTimer();
}
function blur() {
    input.classList.remove("shadow");
    blurInput = setTimeout(function(){input.value = ""}, 10000);
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(varName) {
    var b = document.cookie.match('(^|;)\\s*' + varName + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

var selectedApp = "";
var appUrl = "";
var engineUrl = "";
var application = getCookie("selectedApp");
if (application == "" || application == null) {
    setCookie("selectedApp", "safari", 15000);
    app("safari");
} else {
    document.getElementById(application).classList.add("selected");
    app(application);
}

var selectedEngine = "";
var engine = getCookie("selectedEngine");
if (engine == "" || engine == null) {
    setCookie("selectedEngine", "googleEngine", 15000);
    searchEngine("googleEngine");
} else {
    document.getElementById(engine).classList.add("selected");
    searchEngine(engine);
}

function app(clicked) {
    if(clicked === selectedApp) {
        changeHeight();
    } else {
        resetTimer();
        try {document.getElementById(selectedApp).classList.remove("selected"); } catch (e) { }
        document.getElementById(clicked).classList.add("selected");
        selectedApp = clicked;
        setCookie("selectedApp", selectedApp, 15000);
        
        switch(selectedApp) {
            case "safari":
                input.placeholder = "Search ...";
                appUrl = "x-web-search://";
                engineUrl = "?";
                img.setAttribute("src", "icons/safari.png");
                break;
            case "google":
                input.placeholder = "Search ...";
                appUrl = "google://";
                engineUrl = "search?q=";
                img.setAttribute("src", "icons/google.png");
                break;
            case "chrome":
                appUrl = "googlechromes://";
                engineUrl = getSelectedEngineUrl();
                img.setAttribute("src", "icons/chrome.png");
                break;
            case "firefox":
                appUrl = "firefox://open-url?url=https://";
                engineUrl = getSelectedEngineUrl();
                img.setAttribute("src", "icons/firefox.png");
                break;
            case "opera":
                appUrl = "touch-https://";
                engineUrl = getSelectedEngineUrl();
                img.setAttribute("src", "icons/opera.png");
                break;
            case "edge":
                appUrl = "microsoft-edge-https://";
                engineUrl = getSelectedEngineUrl();
                img.setAttribute("src", "icons/edge.png");
                break;
            case "duckduckgo":
                input.placeholder = "Search ...";
                appUrl = "ddgQuickLink://";
                engineUrl = "";
                img.setAttribute("src", "icons/duckduckgo.png");
                break;
            case "aloha":
                appUrl = "alohabrowser://open?link=";
                engineUrl = getSelectedEngineUrl();
                img.setAttribute("src", "icons/aloha.png");
                break;
            case "appStore":
                input.placeholder = "Search ...";
                appUrl = "itms-apps://";
                engineUrl = "search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?media=software&term=";
                img.setAttribute("src", "icons/appstore.png");
                break;
            case "youTube":
                input.placeholder = "Search ...";
                appUrl = "youtube://";
                engineUrl = "m.youtube.com/results?search_query=";
                img.setAttribute("src", "icons/youtube.png");
                break;
            case "spotify":
                input.placeholder = "Search ...";
                appUrl = "spotify:";
                engineUrl = "search:";
                img.setAttribute("src", "icons/spotify.png");
                break;
            case "instagramHashtag":
                input.placeholder = "Hashtag page ...";
                appUrl = "instagram://";
                engineUrl = "tag?name=";
                img.setAttribute("src", "icons/instagram1.png");
                break;
            case "instagramProfil":
                input.placeholder = "Profil page ...";
                appUrl = "instagram://";
                engineUrl = "user?username=";
                img.setAttribute("src", "icons/instagram2.png");
                break;
            case "snapchat":
                input.placeholder = "Add with username ...";
                appUrl = "snapchat://";
                engineUrl = "add/";
                img.setAttribute("src", "icons/snapchat.png");
                break;
            case "twitter":
                input.placeholder = "Search ...";
                appUrl = "twitter://";
                engineUrl = "search?query=";
                img.setAttribute("src", "icons/twitter.png");
                break;
            case "cydia":
                input.placeholder = "Add repo with url ...";
                appUrl = "cydia://url/https://cydia.saurik.com/api/share#?source=";
                engineUrl = "url/https://cydia.saurik.com/api/share#?source=";
                img.setAttribute("src", "icons/cydia.png");
                break;
        }
    }
}

function searchEngine(clicked) {
    if(clicked === selectedEngine) {
        changeHeight();
    } else {
        resetTimer();
        try { document.getElementById(selectedEngine).classList.remove("selected"); } catch (e) { }
        document.getElementById(clicked).classList.add("selected");
        selectedEngine = clicked;
        setCookie("selectedEngine", selectedEngine, 15000);
        
        switch(selectedApp){
            case "chrome":
            case "firefox":
            case "opera":
            case "edge":
            case "aloha":
                engineUrl = getSelectedEngineUrl();
        }
    }
}

function getSelectedEngineUrl() {
    switch(selectedEngine) {
        case "googleEngine":
            input.placeholder = "Google ...";
            return "google.com/search?q=";
        case "bing":
            input.placeholder = "Bing ...";
            return "www.bing.com/search?q=";
        case "yahoo":
            input.placeholder = "Yahoo ...";
            return "search.yahoo.com/search?p=";
        case "yandex":
            input.placeholder = "Yandex ...";
            return "yandex.ru/search/?text=";
        case "baidu":
            input.placeholder = "Baidu ...";
            return "www.baidu.com/s?wd=";
        case "duckduckgoEngine":
            input.placeholder = "DuckDuckGo ...";
            return "duckduckgo.com/?q=";
    }
}

//alert("test");
checkOptions();
function checkOptions() {
    var element = document.getElementById("optionsStyles");
    element.parentNode.removeChild(element);
    
    var styles = '.searchInput::placeholder { color: ' + Placeholder + '; }';
    styles += '.shadow {-webkit-box-shadow: inset 30px 0px 25px -20px ' + Other + ', inset -30px 0px 25px -20px ' + Other + ';} hr {background-color: ' + Other + ';} .selected { background-color: ' + Other + '; }';
    styles += '.searchInput {color: ' + Text + ';} .headline {color: ' + Text + ';}';
    styles += '.xenSearchBar {background: ' + Background + ';}';
    var css = document.createElement('style');
    css.type = 'text/css';
    css.id = 'optionsStyles';
    if (css.styleSheet) {
        css.styleSheet.cssText = styles;
    } else {
        css.appendChild(document.createTextNode(styles));
    }
    document.getElementsByTagName("head")[0].appendChild(css);
}

function search() {
    if (input.value === "") {
        input.blur();
    } else {
        window.location.href=appUrl+engineUrl+escape(input.value);

        input.value = "";
        input.blur();
        
        setTimeout(function() {location.reload();}, 500);
    }
}

input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    search();
  }
});

var isExtended = false;
function changeHeight(){
    if (isExtended) {
        document.getElementById("settingsDiv").style.opacity = "0";
        setTimeout(function(){document.getElementById("bar").style.height = "40px";}, 200);
        setTimeout(function(){document.getElementById("settingsDiv").style.display = "none";}, 400);
        clearTimeout(closeSettings);
        isExtended = false;
    } else {
        document.getElementById("settingsDiv").style.display = "block";
        document.getElementById("bar").style.height = "170px";
        setTimeout(function(){document.getElementById("settingsDiv").style.opacity = "1"}, 200);
        closeSettings = setTimeout(function(){if(isExtended){changeHeight();}}, 30000);
        isExtended = true;
    }
}
