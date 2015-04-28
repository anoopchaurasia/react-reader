fm.Package("com.reader.app");
fm.Interface("Config", function (){
	this.proxy_server = 'http://localhost:8081/';
	this.server = 'http://eventz.io:4321/';
	this.require_proxy = localStorage.require_proxy == 'true';
});