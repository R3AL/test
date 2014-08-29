var http = require("http");
var url  = require("url");
var exec = require('child_process').exec;

http.createServer(
	function(request, response) 
	{
		var parsedUrl = url.parse(request.url);

		exec('test.exe ' + parsedUrl.pathname,
			{ maxBuffer: 5000*1024 },
			function (error, stdout, stderr)
			{
				response.writeHead(200, {"Content-Type": "text/plain"});
				
				if( error !== null )
				{
					response.write("Error occured ! " + error);
					
				}
				else
				{
					response.write( stdout );
				}

				response.end();
			});

		// console.log("Request for " + parsedUrl.pathname + " received.");
		// console.log("Query and hash " + parsedUrl.query + " " + parsedUrl.hash);

		// response.write("Hello World");

	}).listen(80);