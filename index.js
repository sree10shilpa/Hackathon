const Alexa = require('alexa-sdk');
const request = require('request-promise');
const https = require('https');


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('HelloWorldIntent');
    },

    'HelloWorldIntent': function () {
        this.emit(':tell', 'Hello Purnima!');
    },
    
    'GetNameIntent': function(){
        var sessionAttributes = {};
        const options = {  
         method: 'GET',
        uri: 'https://1lc6mdi0o6.execute-api.us-east-1.amazonaws.com/prod/LamdaAPI'
     }
  request(options)  
      .then((response) => {
        var responseObj = JSON.parse(response);
        this.emit(':tell', responseObj.name);

     })
     .catch((err) => {
      this.emit(':tell', 'Error Happened');
     });
  },



  'MakePaymentIntent': function(){
        //var name = this.event.request.intent.slots.firstname.value;
        const options = {  
        method: 'POST',
        body: { "name" : name},
        json: true,
        uri: 'https://1lc6mdi0o6.execute-api.us-east-1.amazonaws.com/prod/NameAPI'
     }
  request(options)  
      .then((response) => {
        //var responseObj = JSON.parse(response);
        console.log("PURNIMA");
        this.emit(':tell', response.lastname);
     })
     .catch((err) => {
      this.emit(':tell', 'Error');
     });
  },

'GetLastNameIntent': function(){
        var name = this.event.request.intent.slots.firstname.value;
        const options = {  
        method: 'POST',
        body: { "name" : name},
        json: true,
        uri: 'https://1lc6mdi0o6.execute-api.us-east-1.amazonaws.com/prod/NameAPI'
     }
  request(options)  
      .then((response) => {
        //var responseObj = JSON.parse(response);
        console.log("PURNIMA");
        this.emit(':tell', response.lastname);
     })
     .catch((err) => {
      this.emit(':tell', 'Error');
     });
  },
  'Authenticate': function(){
        // var email = this.event.request.intent.slots.email.value;
        // var password = this.event.request.intent.slots.password.value;
       var jsonObject = { "email" : "pjoshi@homesite.com",
                "password" : "Policy@123" };
        
        const options = {  
        method: 'POST',
        path: '/auth',
        uri: 'https://paceapi.homesitep2.com',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
        }
   
     };
  request(options)  
      .then((response) => {
        console.log(response);
        //var responseObj = JSON.parse(response);
        //this.emit(':tell', response.access_token);
        // this.emit(':tell', 'Hello Purnima!');
     })
      .catch((err) => {
        console.log(err);
      // this.emit(':tell', 'Error' +  err);
     });
  }
 };


handlers.Authenticate();

