registerPlugin({
    name: 'Servergroup Switcher',
    version: '0.6',
    description: 'Removes specific servergroups if another specific ones has been given!',
author: 'Everlike <admin@everlike.de> | HUGE thaks to Diesmon -> https://forum.sinusbot.com/members/diesmon.3847/ ',
vars: [
    {
        name: 'removeifisself',
        title: 'Do you also want to automatically remove/add Servergroups if your Bot assigned the Servergroup?',
        type: 'select',
        placeholder: 'yes',
        options: [
        'yes',
        'no'
        ]
    },
{
    name: 'serverGroupsRe',
    title: 'General Settings (Remove)',
    type: 'array',
    vars: [
        {
            name: 'sgTrigger',
            title: 'Servergroups that trigger a remove when given',
            indent: 1,
            type: 'strings',
        },
        {
            name: 'sgToRemove',
            title: 'Servergroups to remove',
            indent: 1,
            type: 'strings'
        }
    ]
},
	{
    name: 'serverGroupsAdd',
    title: 'General Settings (Add)',
    type: 'array',
    vars: [
        {
            name: 'sgTrigger',
            title: 'Servergroups that trigger an add when given',
            indent: 1,
            type: 'strings',
        },
        {
            name: 'sgToAdd',
            title: 'Servergroups to add',
            indent: 1,
            type: 'strings'
        }
    ]
},
]
},  function (sinusbot, config) {
 
    var engine = require ('engine');
    var backend = require('backend');
    var event = require ('event');
 
    event.on('serverGroupAdded', function(ev)	{
		var removeifisself = config.removeifisself || 0;
		
		if (ev.invoker.isSelf() && removeifisself == 1) { 
		return};
		
		/*-------------------------------Remove Servergroups-------------------------------*/
        engine.log("Added groupID was: " + ev.serverGroup.id())
        var groupsToRemove = [];
        for (var serverGroup in config.serverGroupsRe) {
            for (var triggerGroup in config.serverGroupsRe[serverGroup].sgTrigger) {
                engine.log("Trigger group ID loop: " + config.serverGroupsRe[serverGroup].sgTrigger[triggerGroup])
                if (ev.serverGroup.id() == config.serverGroupsRe[serverGroup].sgTrigger[triggerGroup]) {
                    engine.log("Old groupsToRemove length: " + groupsToRemove.length)
                    groupsToRemove = groupsToRemove.concat(config.serverGroupsRe[serverGroup].sgToRemove)
                    engine.log("New groupsToRemove length: " + groupsToRemove.length)
                    break;
                }
            }
        }
        for (var group in groupsToRemove) {
            engine.log("Removing ID: " + groupsToRemove[group])
            ev.client.removeFromServerGroup(groupsToRemove[group]);
        }
		/*-------------------------------Add Servergroups-------------------------------*/
		var groupsToAdd = [];
        for (var serverGroup in config.serverGroupsAdd) {
            for (var triggerGroup in config.serverGroupsAdd[serverGroup].sgTrigger) {
                engine.log("Trigger group ID loop: " + config.serverGroupsAdd[serverGroup].sgTrigger[triggerGroup])
                if (ev.serverGroup.id() == config.serverGroupsAdd[serverGroup].sgTrigger[triggerGroup]) {
                    engine.log("Old groupsToAdd length: " + groupsToAdd.length)
                    groupsToAdd = groupsToAdd.concat(config.serverGroupsAdd[serverGroup].sgToAdd)
                    engine.log("New groupsToAdd length: " + groupsToAdd.length)
                    break;
                }
            }
        }
        for (var group in groupsToAdd) {
            engine.log("Adding ID: " + groupsToAdd[group])
            ev.client.addToServerGroup(groupsToAdd[group]);
        }
    });
});
