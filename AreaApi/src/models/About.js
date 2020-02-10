var Service = require('./Service')
var Action = require('./Action')
var Reaction = require('./Reaction')

class AboutJs {
    constructor(ipClient) {
        this.client = ipClient;
        this.current_time = new Date().getTime();
    }

    async getAboutJson() {
        var aboutDetails = {
            client: {
                host: this.client
            },
            server: {
                current_time: this.current_time,
                services: []
            }
        }

        const services = await Service.getAll();
        const actions = await Action.getAll();
        const reactions = await Reaction.getAll();

        services.forEach(element => {
            var currentService = {
                name: element.name,
                actions: [],
                reactions: []
            }
            actions.forEach(elementAction => {
                if (elementAction.service.toString() === element._id.toString()) {
                    currentService.actions.push({name: elementAction.name, description: elementAction.description});
                }
            });
            reactions.forEach(elementReaction => {
                if (elementReaction.service.toString() === element._id.toString()) {
                    currentService.reactions.push({name: elementReaction.name, description: elementReaction.description});
                }
            });
            aboutDetails.server.services.push(currentService);
        });
        return aboutDetails;
    }
}

module.exports = AboutJs;