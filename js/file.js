function loadHistory(e, callback) {
	var selectedFile = e.target.files[0];
	var reader = new FileReader();
	reader.readAsText(selectedFile);
	reader.addEventListener("load", function() {
		// console.log(reader.result);
		g_history = JSON.parse(reader.result)
		// console.log(g_history);
		callback();
	})
}

function saveHistory() {
	var jsonString = JSON.stringify(g_history);
	var blob = new Blob([jsonString],{type:"text/plain"});
	window.URL = window.URL || window.webkitURL;
	var saveElem = document.getElementById("btn-history-save");
	saveElem.setAttribute("href", window.URL.createObjectURL(blob));
	saveElem.setAttribute("download", "History_" + new Date());
}
