var Service = require('./ServiceDetail.model')

/**
* AboutJs class generate all the json informations
* @class
* @classdesc This class create a json specific for the about 
* @param {string} ipClient The ip of the client
*/
class AboutJs {
    constructor(ipClient) {
        this.client = ipClient;
        this.current_time = new Date().getTime();
    }

    /**
    * Create the about.json
    * @class
    */
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
                currentService.actions.push({ name: elementAction.name, description: elementAction.description });
            });
            element.reactions.forEach(elementReaction => {
                currentService.reactions.push({ name: elementReaction.name, description: elementReaction.description });
            });
            aboutDetails.server.services.push(currentService);
        });
        return aboutDetails;
    }
}

module.exports = AboutJs;