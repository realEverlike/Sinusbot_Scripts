registerPlugin({
    name: 'Decision Maker',
    version: '0.2',
    description: 'Simply helps you making decisions! => simple head or tale/Kopf oder Zahl',
    author: 'Everlike <admin@everlike.de>',
	
	vars: [
	{
		name: 'trigger',
		description: 'The comman which triggers the bot',
		type: 'string', 
		placeholder: '!decision'
	},
	{
		name: 'language',
		description: 'language',
		type: 'select',
		placeholder: 'english'
		options: [
		'english', 
		'german',
		'yes or no'
		]
	},
	{
		name: 'msgtype',
		description: 'Where to send answeres to.',
		type: 'select',
		placeholder: 'private chat'
		options: [
		'private chat',
		'channel chat', 
		'server chat'
		]
	},
]}, function (sinusbot, config)  {
	
	var event = require ('event');
	var backend = require ('backend');
	
	var trigger = config.trigger || '!decision';
	var language = config.language || 0;
	var msgtype = config.msgtype || 0;
	
	var head = 'head';
	var tale = 'tale';
	var headDE = 'Kopf';
	var taleDE = 'Zahl';
	var yes = 'yes';
	var no = 'no';
	
	event.on('chat', function (ev) {
		var HoTanswere = Math.floor(Math.random() * 2)
		var match = ev.text.match(trigger)
		var actualchannel = backend.getCurrentChannel()
			//english
//priv chat			
		if (match && HoTanswere == 0 && language == 0 && msgtype == 0) {
			ev.client.chat(head)
		}
		else if (match && HoTanswere == 1 && language == 0 && msgtype == 0) {
			ev.client.chat(tale)
		}
		//channel chat
		if (match && HoTanswere == 0 && language == 0 && msgtype == 1) {
			actualchannel.chat(head)
		}
		else if (match && HoTanswere == 1 && language == 0 && msgtype == 1) {
			actualchannel.chat(tale)
		}
		//server chat
		if (match && HoTanswere == 0 && language == 0 && msgtype == 2) {
			backend.chat(head)
		}
		else if (match && HoTanswere == 1 && language == 0 && msgtype == 2) {
			backend.chat(tale)
		}
		
			//german
//priv chat			
		if (match && HoTanswere == 0 && language == 1 && msgtype == 0) {
			ev.client.chat(headDE)
		}
		else if (match && HoTanswere == 1 && language == 1 && msgtype == 0) {
			ev.client.chat(taleDE)
		}
		//channel chat
		if (match && HoTanswere == 0 && language == 1 && msgtype == 1) {
			actualchannel.chat(headDE)
		}
		else if (match && HoTanswere == 1 && language == 1 && msgtype == 1) {
			actualchannel.chat(taleDE)
		}
		//server chat
		if (match && HoTanswere == 0 && language == 1 && msgtype == 2) {
			backend.chat(headDE)
		}
		else if (match && HoTanswere == 1 && language == 1 && msgtype == 2) {
			backend.chat(taleDE)
		}
			
			//yes or no 
			if (match && HoTanswere == 0 && language == 2 && msgtype == 0) {
			ev.client.chat(yes)
		}
		else if (match && HoTanswere == 1 && language == 2 && msgtype == 0) {
			ev.client.chat(no)
		}
		//channel chat
		if (match && HoTanswere == 0 && language == 2 && msgtype == 1) {
			actualchannel.chat(yes)
		}
		else if (match && HoTanswere == 1 && language == 2 && msgtype == 1) {
			actualchannel.chat(no)
		}
		//server chat
		if (match && HoTanswere == 0 && language == 2 && msgtype == 2) {
			backend.chat(yes)
		}
		else if (match && HoTanswere == 1 && language == 2 && msgtype == 2) {
			backend.chat(no)
}
});
});
