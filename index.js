const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
// const fetch = require('node-fetch');
var request = require('request');



try {
console.log("Current directory:", __dirname);
let payloadFile = fs.readFileSync('/home/runner/work/_actions/AubreySine0/DEMO---TP-Repo/main/src/analytics-autogenerated/plan.json');
let payloadJSON = JSON.parse(payloadFile);
delete payloadJSON["name"];
delete payloadJSON["create_time"];
delete payloadJSON["update_time"];

const segmentAuthToken = core.getInput('Segment-Token');
const trackingPlanType = core.getInput('Tracking-Plan-Type');
let payloadURL = 'https://platform.segmentapis.com/v1beta/workspaces/protocols-diffs/tracking-plans/rs_2R7oWFgqh1kmzrmvFfPES6OlvSC';
if (trackingPlanType == 'QA'){
    payloadURL = 'https://platform.segmentapis.com/v1beta/workspaces/protocols-diffs/tracking-plans/rs_2R7oXdlWuwB6fIgODWQaTANBtwT';   
}
let bearerToken = 'Bearer ' + segmentAuthToken;
    
let newJSON = {};
newJSON["update_mask"] = {
    "paths": [
      "tracking_plan.rules",
    ]
  };
newJSON["tracking_plan"] = payloadJSON;
var json = JSON.stringify(newJSON);

var options = {
    'method': 'PUT',
    'url': payloadURL,
    'headers': {
      'Authorization': bearerToken,
      'Content-Type': 'application/json'
    },
    body: json
    };

request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    });

} catch (error) {
  core.setFailed(error.message);
}
