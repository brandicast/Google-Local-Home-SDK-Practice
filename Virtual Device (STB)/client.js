var PORT = 5555;
var MCAST_ADDR = "225.255.255.255"; //same mcast address as Server
//var HOST = '192.168.0.15'; //this is your own IP
var dgram = require('dgram');
var server = dgram.createSocket({
    type: 'udp4',
    //reuseAddr: true
});

function makeDiscoveryData() {
    var discoveryData = {
      id: 'local-home+-id'
    };
    return discoveryData;
  }

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
    //server.setBroadcast(true)
    //server.setMulticastTTL(1);
    server.addMembership(MCAST_ADDR);
});

server.on('message', function (message, remote) {
    console.log('MCast Msg: From: ' + remote.address + ':' + remote.port + ' - ' + message);
    //broadcastNew('HelloLocalHomeSDK',remote.address, remote.port ) ;
    broadcastNew('local-home+-id',remote.address, remote.port ) ;
});

server.bind(PORT);


function broadcastNew(msg, addr, port) {
    
    //var message = Buffer.from(msg).toString('hex');
    var message = msg;
    //var message = Buffer.from(msg,'hex');
    
    server.send(message, port, addr, function() {
        console.log("Reply to " + addr + ":" + port+ " with '" + message + "'");
    });
}


/*
setInterval(broadcastNew, 3000, 'HelloLocalHomeSDK');
setInterval(broadcastNew, 5000,'local-home+-id');
setInterval(broadcastNew, 7000,makeDiscoveryData().toString());
*/