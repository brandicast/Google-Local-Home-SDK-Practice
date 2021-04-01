const {smarthome} = require('actions-on-google') ;

const app = smarthome();
const util = require ('util') ;

module.exports  =  app ;

app.onSync((body, headers) => {
    // TODO Get devices for user
    console.log ('onSync is called');
    return {
      requestId: body.requestId,
      payload: {
        agentUserId: "1836.15267389",
        devices: [{
          id: "123",
          type: "action.devices.types.OUTLET",
          traits: [
            "action.devices.traits.OnOff"
          ],
          name: {
            defaultNames: ["My Outlet 1234"],
            name: "Night light",
            nicknames: ["wall plug"]
          },
          willReportState: false,
          roomHint: "kitchen",
          deviceInfo: {
            manufacturer: "lights-out-inc",
            model: "hs1234",
            hwVersion: "3.2",
            swVersion: "11.4"
          },
          /*otherDeviceIds: [{
            deviceId: "local-device-id"
          }],*/
          customData: {
            fooValue: 74,
            barValue: true,
            bazValue: "foo"
          }
        },{
            id: "7890",
            type: "action.devices.types.SETTOP",
            traits: [
              "action.devices.traits.OnOff",
              "action.devices.traits.Volume",
              "action.devices.traits.AppSelector",
              "action.devices.traits.MediaState",
              "action.devices.traits.Channel",
              "action.devices.traits.TransportControl"
                // there are more traits to add
            ],
            name: {
              defaultNames: ["My Home+ STB"],
              name: "home+",
              nicknames: ["CNS"]
            },
            //roomHint: "office",
            willReportState: false,
            attributes: {
              volumeMaxLevel: 15,
              volumeCanMuteAndUnmute:true,
              volumeDefaultPercentage: 40,
              levelStepSize: 1,
              availableApplications: [{
                  key: 'EPG',
                  names: [{
                      name_synonym: [
                          'epg'
                      ],
                      lang: 'en'
                  }]
              }
              ],
              availableChannels: [
                {
                  key: "ktvu2",
                  names: [
                    "Fox",
                    "KTVU"
                  ],
                  number: "2"
                },
                {
                  key: "abc1",
                  names: [
                    "ABC",
                    "ABC East"
                  ],
                  number: "702.4-11"
                },
                {
                    key: "WinTV",
                    names: [
                        "Win TV",
                        "momo 台",
                        "富邦台"
                    ]
                }
              ]
            },
            /*states: {
                currentApplication: 'EPG'
            },*/
            deviceInfo: {
              manufacturer: "cns",
              model: "ATV",
              hwVersion: "1.2",
              swVersion: "5.4"
            },
            customData: {
              fooValue: 12,
              barValue: false,
              bazValue: "bar",
              port: 5555
            },
            otherDeviceIds:[{
                deviceId: 'local-home+-id'
            }],
          }
        ]
      }
    };
  });

app.onQuery ((body, headers) => {
      console.log ('onQuery is called !');
      console.log (util.inspect(body));
      console.log (util.inspect(body.inputs[0].payload));

      return {
          requestId: body.requestId,
          payload: {
              devices: {
                  123: {
                      on:true,
                      online: true
                  },
                  7890:{
                      status: 'SUCCESS',
                      online: true,
                      on: false,
                      currentApplication: 'EPG',
                      activityState: 'ACTIVE',
                      playbackState: 'PLAY'
                  }
              }
          }

      }
});

app.onExecute ((body, headers) => {
    console.log ('onExecute is called !');
    return {
        requestId: body.requestId,
        payload: {
            commands: [{
                ids:['123'],
                status: 'SUCCESS',
                states: {
                    on: true,
                    online: true
                }
            },{
                ids:['456'], 
                status: 'ERROR',
                errorCode: 'deviceTurnedOff'
           },{
            ids:['789'],
            status: 'SUCCESS',
            states: {
                on: true,
                online: true
            }
        }            
            ]
        }

    }
});
    
app.onDisconnect ((body, headers) => {
    console.log ('onDisconnect is called');

});


/*  JWT is required
app.reportState (() => {
    console.log ('reportState is called') ;
});

app.requestSync (() => {
    console.log ('requestSync is called') ;
});
*/
