registerPlugin({
    name: '!register Notificator',
    version: '0.1',
    description: 'Lets you know if someone has registered for your Sinusbot!',
    author: 'Everlike <admin@everlike.de>',
	vars: [
	{
	name: 'toNoticeUID',
	title: 'The Client with the following UID should get noticed when someone just registered himself:'
	type: 'string'
	},
	{
		name: 'notificationMsg',
		title: 'Message, the Admin gets when someone has just registered himslef.',
		type: 'string',
		placeholder: 'A user has just registered himself.'
	},
	{
		name: 'missednotificationMsg',
		title: 'Message, the Admin gets when someone has registered himslef and he was not online at this time.',
		type: 'string',
		placeholder: 'A user registered himself when you was offline! check it out.'
	},
	]

},
function (sinusbot, config) {
	var engine = require ('engine');
	var backend = require ('backend');
	var event =require ('event');
	var store = require('store');
	
	var notificationMsg = config.notificationMsg || 'A user has just registered himself.';
	var missednotificationMsg = config.missednotificationMsg || 'A user registered himself when you was offline! check it out.';
	var toNoticeUID = config.toNoticeUID
	var missed = 'missed'

	event.on('chat', function (ev) {
		var match = ev.text.indexOf('!register') 
		var client = backend.getClientByUID(toNoticeUID)
		if (match == 0 && client != null) {
			client.chat(notificationMsg)
		} 
		else if (match == 0 && client == null) {
			store.set(missed, true)
		}
		});
			event.on('clientMove', function(ev) {
				var client = backend.getClientByUID(toNoticeUID)
				if (ev.fromChannel == null && client != null && store.get(missed) == true) {
					client.chat(missednotificationMsg);
					store.set(missed, false);
				}
	});
});
