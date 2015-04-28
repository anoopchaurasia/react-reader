var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }
exec("corsproxy localhost 8081", puts);


var sys = require('sys'),
fs = require("fs");

var cnst;
function watch(path) {
	fs.watch(path, function (){
		clearTimeout(cnst);
		cnst = setTimeout(function (){
			sys.exec("cordova build browser", puts);
		}, 3000);
	});
}

	// watch(__dirname + "/www/js");
	// watch(__dirname + "/www/js/com/reader/page");
	// watch(__dirname + "/www/css");
	// watch(__dirname + "/www/js/jsfm");
	// watch(__dirname + "/www/html");
sys.exec("cordova build browser", puts);
sys.exec("cordova serve", puts);