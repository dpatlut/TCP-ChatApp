var net = require('net');
var fs = require('fs');
var prompt = require('prompt');
var port = 3000;
var users = []
var history = []

var server = net.createServer(function(c){
  	c.write('Welcome to Chat\r\n'+history+"\r\n");
  	console.log("connected");
  	users.push(c)

  	c.on('end', function(){
      console.log('client disconnected');
      for (var i=0;i<users.length;i++){
      	if (c === users[i]){ // delete user
      		users.splice(i,1);
      	}
      }
    });//end on End


//c.on('connection' ,function(){

// })

  c.on('data', function(data){
  	history.push(data.toString().trim()) // push history
    if (data.toString().trim().substring(0,5) === "/yell") {
      if(data.toString().trim().substring(6)===""){
        data = "******AHHHHHH!!!!\r\n"
      }
      data = data.toString().trim().substring(6).toUpperCase()+"\r\n";
    }
    if (data.toString().trim().substring(0,10) === "/tableflip") {
      data = "(╯°□°）╯︵ ┻━┻\r\n"
    }
  	for (var i = 0;i<users.length;i++){
  		if (c !== users[i]){ // writes to all users except ourselves
  			users[i].write(data);
  		}
  	}
	});//end on Data


});//end Create Server

server.listen(port, function(){
    console.log("Listening on port " + port)
});