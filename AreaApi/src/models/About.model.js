var Service = require('./ServiceDetail.model')

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
        const services = await Service.GetAllServiceDetail();
        // const actions = await Action.getAll();
        // const reactions = await Reaction.getAll();

        services.forEach(element => {
            var currentService = {
                name: element.name,
                actions: [],
                reactions: []
            }
            element.actions.forEach(elementAction => {
                currentService.actions.push({name: elementAction.name, description: elementAction.description});
            });
            element.reactions.forEach(elementReaction => {
                currentService.reactions.push({name: elementReaction.name, description: elementReaction.description});
            });
            aboutDetails.server.services.push(currentService);
        });
        return aboutDetails;
    }
}

module.exports = AboutJs;