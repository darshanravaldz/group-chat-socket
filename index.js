var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/home.html');
  //res.send('Server Started...On http://192.168.0.104:3000');
});
app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/i.html');
});
io.on('connection', function(socket){
  console.log("Some client Connected..");

  socket.on('join_room', function(data){
    console.log("Name :",data.name);
    //console.log("Room :",data.room);
    socket.myData = {};
    socket.myData.name = data.name;
    //socket.myData.room = data.room;
    console.log("socket.mydata :",socket.myData);
    //socket.join(); // join room

    //io.to(data.room).emit('msg_broadcast', data.name+' Join This Room!');
    io.emit('msg_broadcast', socket.myData.name+' Join This Room!');

  });

  	socket.on('send_msg', function(msg){
    //io.to(socket.myData.room).emit('msg_broadcast', socket.myData.name+' Say :'+msg);
    io.emit('msg_broadcast', socket.myData.name+' Say :'+msg);
  });


});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
