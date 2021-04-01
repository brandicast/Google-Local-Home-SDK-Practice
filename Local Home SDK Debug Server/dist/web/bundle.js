"use strict";
/// <reference types="@google/local-home-sdk" />
const app = new smarthome.App("1.0.0")
    .onIdentify((request) => {
        console.log ('here!')
    console.log("IDENTIFY request:", request);
    const device = request.inputs[0].payload.device;
    if (device.udpScanData === undefined) {
        throw Error("Missing discovery response");
      }
      const scanData = device.udpScanData.data;
      console.log ('scanData : ' + scanData) ;
  
      // Decode scan data to obtain metadata about local device
      const verificationId = hex_to_ascii(scanData) ;
      console.log ('verification id : ' + verificationId) ;

    return new Promise((resolve, reject) => {
      
        const response = {
            intent: smarthome.Intents.IDENTIFY,
            requestId: request.requestId,
            payload: {
                device: {
                    id: device.id || "",
                    verificationId,
                },
            },
        };
        console.log("IDENTIFY response", response);
        resolve(response);
    });
})
    .onQuery((request) =>{
        console.log("QUERy request:", request);
        return new Promise((resolve, reject) => {
      
            const response = {
                //intent: smarthome.Intents.IDENTIFY,
                requestId: request.requestId,
                payload: {
                    devices: {
                        7890: {
                            on: true,
                            online: true
                        }
                    },
                },
            };
            console.log("QUERy response", response);
            resolve(response);
        });


})
    .onExecute((request) => {
    console.log("EXECUTE request", request);
    const response = new smarthome.Execute.Response.Builder()
        .setRequestId(request.requestId);
    const command = request.inputs[0].payload.commands[0];
    console.log ("Request to execute command : " + command.execution[0].command + ":" + command.execution[0].params.on + " on device: " + command.devices[0].id) ;
    
    return Promise.all(command.devices.map((device) => {
        // TODO: send device command.
        // TODO: set response success/errorState.
        response.setSuccessState(command.devices[0].id, {online: true});
    })).then(() => {
        console.log("EXECUTE response", response);
        return response.build();
    });
})
    .listen()
    .then(() => {
    console.log("Ready !!");
});


function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }