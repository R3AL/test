var http = require("http");
var url  = require("url");
var exec = require('child_process').exec;
var path = require("path");
var os   = require("os");	

http.createServer(
	function(request, response) 
	{
		var parsedUrl = url.parse(request.url);
		var tempArr   = parsedUrl.pathname.split('/');
		var binPath   = parsedUrl.pathname.substr(1);
		var binName;
		
		if( tempArr[ tempArr.length - 1 ].length < 1 )
		{
			binName = tempArr[ tempArr.length - 2 ];
			binPath = binPath.substr(0, binPath.length - 1 );
		}
		else
		{
			binName = tempArr[ tempArr.length - 1 ];
		}

		var handlerPath = 'handlers' + path.sep + binPath + path.sep + binName;

		var isWin = (os.platform() === 'win32');

		if( isWin )
		{
			handlerPath += '.exe';
		}

		exec( handlerPath,
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

	}).listen(80);