var contextMenu = require("sdk/context-menu"), word;
var googleSearch = contextMenu.Item({
  label: "Google",
  data: "https://translate.google.co.in/#auto/hi/"
});

var panel = require("sdk/panel");

var shabdkoshSearch = contextMenu.Item({
  label: "shabdkosh",
  data: "http://shabdkosh.com/hi/translate?e="
});

var hinKhojSearch = contextMenu.Item({
  label: "hinkhoj",
  data: "http://dict.hinkhoj.com/hindi-dictionary.php?scode=dict_home&word="
});

var searchMenu = contextMenu.Menu({
  label: "Find hindi meaning of with",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("context", function () {' +
                 '  word = window.getSelection().toString();' +
                 '  return "Find hindi meaning of `"+word+"` with";' +
                 '});' +
				 'self.on("click", function (node, data) {' +
                 '  var search = data + window.getSelection().toString();' +
                 '  self.postMessage(search)' +
                 '});',
  items: [googleSearch, shabdkoshSearch, hinKhojSearch],
  onMessage: function (url) {
	  var myPan = panel.Panel({
		  width: 700,
		  height: 600,
		  contentURL: url
		});
	myPan.show();
  }
});
