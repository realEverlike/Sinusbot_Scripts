registerPlugin({
    name: '!register Notificator',
    version: '0.3',
    description: 'Lets you know if someone has registered for your Sinusbot!',
    author: 'Everlike <admin@everlike.de>',
	
	vars: [
	{
            name: 'grps',
            title: 'Enter Servergroups ID(s)! The Client with one of the following servergroups get noticed when someone just registered himself:',
            type: 'strings',
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
		placeholder: 'A user registered himself when you were offline! check it out.'
	},
	]
},
function (sinusbot, config) {
	var engine = require ('engine');
	var backend = require ('backend');
	var event =require ('event');
	var store = require('store');
	
	var missed = 'missed';
	var grps = config.grps;
	
	var notificationMsg = config.notificationMsg || 'A user has just registered himself.';
	var missednotificationMsg = config.missednotificationMsg || 'A user registered himself when you were offline! check it out.';
		
event.on('chat', function (ev) {
	var match = ev.text.indexOf('!register');
    if (match >= 0) {
        getClientsInGroups(grps).forEach(function (client) {
            client.chat(notificationMsg);
        })
    }
	if (match >= 0 && getClientsInGroups(grps) == 0) {
		store.set(missed, true);
	}
	
});

	event.on('clientMove', function (ev) {
		clientSgs = ev.client.getServerGroups();
		if (checkIfClientIsInGroups(grps, clientSgs) != 0 && ev.fromChannel == null && store.get(missed) == true) {
			ev.client.chat(missednotificationMsg);
			store.set(missed, false);
		}
	}); 
	
	
	/*Functions*/
	/*The following 7 lines were made by Multivitamin -> https://gamers.wtf/ or https://forum.sinusbot.com/members/multivitamin.93/ */
function getClientsInGroups(grps, clients) {
    return (clients || backend.getClients()).filter(function (client) {
        return client.getServerGroups().some(function (group) {
            return grps.indexOf(group.id()) >= 0
        })
    })
};

function checkIfClientIsInGroups(grps, clientSgs) {
	return clientSgs.filter(function (group) {
			return grps.indexOf(group.id()) >= 0
		})
};

});
