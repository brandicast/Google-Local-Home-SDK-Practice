"use strict";
/// <reference types="@google/local-home-sdk" />
const app = new smarthome.App("1.0.0")
    .onIdentify((request) => {
    console.log("IDENTIFY request:", request);
    const device = request.inputs[0].payload.device;
    return new Promise((resolve, reject) => {
        const response = {
            intent: smarthome.Intents.IDENTIFY,
            requestId: request.requestId,
            payload: {
                device: {
                    id: device.id || "",
                },
            },
        };
        console.debug("IDENTIFY response", response);
        resolve(response);
    });
})
    .onExecute((request) => {
    console.log("EXECUTE request", request);
    const response = new smarthome.Execute.Response.Builder()
        .setRequestId(request.requestId);
    const command = request.inputs[0].payload.commands[0];
    return Promise.all(command.devices.map((device) => {
        // TODO: send device command.
        // TODO: set response success/errorState.
        console.log ("Hey, I am here !!!")
    })).then(() => {
        console.log("EXECUTE response", response);
        return response.build();
    });
})
    .listen()
    .then(() => {
    console.log("Ready");
});
