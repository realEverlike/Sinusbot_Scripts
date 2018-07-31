registerPlugin({
    name: 'PizzaTimer',
    version: '0.5.1',
    description: 'Do never forget your pizza in the oven again!',
    author: 'Everlike <everlikezz@gmail.com>',
    vars: [
       	{
		name: 'triggermsg',
		title: 'Command or Message which triggers the bot to set the timer.',
		type: 'string', 
		placeholder: '!pizza'
	},
	   {
            name: 'msg',
            title: 'The bot will send the following message to remind the client.',
            type: 'string',
            placeholder: 'Your pizza is ready! Stop gaming now and get the pizza out of the oven!'
        },
    {
        name: 'msgorpoke',
        title: 'Message or Poke the client when the pizza is ready?',
        type: 'select',
        placeholder: 'message',
        options: [
        'message',
        'poke'
        ]
    },
    {
        name: 'confirmmsg',
        title: 'Confirmation message that the timer has been set, and the bot will write a message to the client.',
        type: 'string',
        placeholder: 'Alright, I´ll write you a message when your pizza is ready!'
    },
    {
        name: 'confirmpoke',
        title: 'Confirmation message that the timer has been set, and the bot will poke the client.',
        type: 'string',
        placeholder: 'Alright, I´ll poke you when your pizza is ready!'
    },
	{
		name: 'defaulttime',
		title: 'The bot will poke the client in the following amount of time by default in minutes.',
		type: 'number',
		placeholder: 13
	},
]
},  function (sinusbot, config) {
   
    var engine = require ('engine');
    var backend = require ('backend');
    var event = require ('event');
 
    var msg = config.msg || 'Your pizza is ready! Stop gaming now and get the pizza out of the oven!';
    var msgorpoke = config.msgorpoke || 1;
    var confirmmsg = config.confirmmsg || 'Alright, I´ll write you a message when your pizza is ready!';
    var confirmpoke = config.confirmpoke || 'Alright, I´ll poke you when your pizza is ready!';
	var defaulttime = config.defaulttime || 13;
	var t1 = '^';
	var t2 = ' *(\\d*)$';
	if (config.triggermsg != 0) {
	var triggermsg = t1 + config.triggermsg + t2;
	}
	else {
		var triggermsg = t1 + '!pizza' + t2;
	}
	
    event.on('chat', function (ev) {
		var match = ev.text.match(new RegExp(triggermsg))
		
        if (match && msgorpoke == 0) {
            {
                ev.client.chat(confirmmsg)
            }
            setTimeout(function(){
                ev.client.chat(msg)
            }, parseInt(match[1] || defaulttime) * 60000)
        }
		else if (match && msgorpoke == 1) {
            {
                ev.client.chat(confirmpoke)
            }
            setTimeout(function(){
                ev.client.poke(msg)
            }, parseInt(match[1] || defaulttime) * 60000)
        }		
    });
});
