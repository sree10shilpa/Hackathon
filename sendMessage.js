console.log('Loading event');
var Alexa = require("alexa-sdk");
var twilio = require("twilio");

// Twilio Credentials 
var accountSid = 'AC022992ebb7a3282b7d5755ecf27514ea';
var authToken = '022ce9f84ec96cf7d5f247413dc62ba7';
var fromNumber = '+16172199532';//Twilio phone number - free account

var https = require('https');
var queryString = require('querystring');

// Lambda function:
exports.handler = function (event, context) {

    console.log('Running event');
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();

};

 var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
   
    'TextIntent': function () {
      var client = new twilio.RestClient('AC022992ebb7a3282b7d5755ecf27514ea', '022ce9f84ec96cf7d5f247413dc62ba7');
     var PhoneNumber = this.event.request.intent.slots.PhoneNumber.value;
     var message = this.event.request.intent.slots.message.value;
 // this.event.request;
// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
client.sms.messages.create({
   to: '+1' + PhoneNumber,
  from: '+16172199532',
  body: message
}, (error, message) => {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        // console.log(message.sid);
 
        console.log('Message sent on:');
        // console.log(message.dateCreated);
              this.emit(':tell', 'Message sent on:' + message.dateCreated);
        // this.emit('Message sent on:');// + message.dateCreated);
        // this.event.response.say('Message has been successfully sent');
    } else {
        console.log(error);
              // this.emit(':tell','Error');
        this.emit(':tell', PhoneNumber + message);
         // this.event.response.say('Error in sending message');

    }
});

},

'CallIntent': function()
{
    // Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
var accountSid = 'AC022992ebb7a3282b7d5755ecf27514ea';
var authToken = "022ce9f84ec96cf7d5f247413dc62ba7";
var client = require('twilio')(accountSid, authToken);

client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: "+16173521154",
    from: "+16172199532"
}, (err, call) => {
    process.stdout.write(call.sid);
    this.emit(':tell', 'Call was made');
});
}
}

