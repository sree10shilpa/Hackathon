//Alexa Lamda function to talk to PACE API
var token = 'test';
exports.handler = (event, context) => {

    try {

        if (event.session.new) {
            // New Session
            console.log("NEW SESSION")
        }

        switch (event.request.type) {

            case "LaunchRequest":
                // Launch requests
                console.log(`LAUNCH REQUEST`)
                context.succeed(
                    generateResponse(
                        buildSpeechletResponse("Welcome to an Alexa Skill, this is running on a deployed lambda function", true),
                {}
                    )
                )
                break;

            case "IntentRequest":
                // Intent Request
                console.log('INTENT REQUEST');

                switch (event.request.intent.name) {
                    case "GetStaticPolicyPremium":
                        var p = "One hundred";
                        break;

                        //This is place holder intent
                    case "GetVideoViewCount":

                        //     console.log('before');
                        //The call to authenticate endpoint of Pace
                        authenticate();
                        //           console.log('Return value: ' + token);
                        break;

                    case "GetPolicyPremium":
                        console.log(event.request.intent.slots.SinceDate.value)
                        var endpoint = ""// ENDPOINT GOES HERE
                        var body = ""
                        https.get(endpoint, (response) => {
                            response.on('data', (chunk) => { body += chunk })
                            response.on('end', () => {
                                var data = JSON.parse(body)
                                var premium = "one hundred"
                                context.succeed(
                                    generateResponse(
                                        buildSpeechletResponse(`Current view count is $ { premium }`, true),
                                {}
                      )
                    )
                            })
                        })
                        break;

                    default:
                        throw "Invalid intent"
                }

                break;

            case "SessionEndedRequest":
                // Session Ended Request
                console.log(`SESSION ENDED REQUEST`)
                break;

            default:
                context.fail(`INVALID REQUEST TYPE: $ { event.request.type }`)

        }

    } catch (error) { context.fail(`Exception: $ { error }`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {

    return {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
    }

}

generateResponse = (speechletResponse, sessionAttributes) => {

    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    }

}


function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    jsonObject = JSON.stringify({
        "email": "shilpa.ganapathineedi@homesite.com",
        "password": "Policy@123"
    });

    var options = {
        hostname: 'paceapi.homesitep2.com',
        port: 443,
        path: '/auth',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
        }
    };

    //var token = '';
    var req = https.request(options, function (res) {

        //var abc = '';
        console.log('Status: ' + res.statusCode);
        console.log('Headers: ' + JSON.stringify(res.headers));
        console.log('body: ' + JSON.stringify(res.body));

        res.setEncoding('utf8');

        res.on('data', function (data) {

            console.log(JSON.parse(data));
            //   var jsonData = JSON.parse(data);
            // token = JSON.parse(jsonData.access_token);
            //console.log('In Auth');
            // console.log(token);
            //  return token.access_token;
        });

        // res.on('end', () => {

        //  console.log('endToken' +token.access_token);
        // return token.access_token;
        //});
    });
    //req.setTimeout(100000000);
    req.write(jsonObject, function (err) { req.end(); });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

}