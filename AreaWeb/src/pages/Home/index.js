import 'bootstrap/dist/css/bootstrap.min.css';
import tree from '../../images/tree.png';
import React from 'react';
import '../../css/site.css';
import { Button, Modal, Card } from 'react-bootstrap'
import Twitter from '../../images/twitter_logo.png'
import Spotify from '../../images/spotify_logo.png'
import GitHub from '../../images/github_logo.png'
import Messenger from '../../images/messenger_logo.png'
import Discord from '../../images/discord_logo.png'
import Dropbox from '../../images/dropbox_logo.png'
import Mailing from '../../images/mail_logo.png'
import Timer from '../../images/timer_logo.png'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: new Map(),
            reactions: new Map(),
            actionsName: new Map(),
            reactionsName: new Map(),
            actionsDesc: new Map(),
            reactionsDesc: new Map(),
            areas: [],
            InfoDisplay: new Map(),
            InfoParamAction: new Map(),
            InfoParamReaction: new Map(),
            showmodalDeletion: false,
            showmodalInfo: false,
            images: new Map(),
        };
        this.showModal = e => {
            this.setState({showmodalDeletion: true});
        }
        this.onClose = e => {
            this.setState({showmodalDeletion: false});
          };
        this.showModalInfo = e => {
            this.setState({showmodalInfo: true});

        }
        this.onCloseInfo = e => {
            this.setState({showmodalInfo: false});
            this.state.InfoDisplay.clear()
            this.state.InfoParamAction.clear()
            this.state.InfoParamReaction.clear()
        };
    }

    /**
     * Do things before the render
     */
    componentWillMount() {
        // Get all services informations //

        var actions = new Map()
        var reactions = new Map()
        var actionsNames = new Map()
        var reactionsNames = new Map()
        var actionsDescs = new Map()
        var reactionsDescs = new Map()

        this.state.images.set("twitter", Twitter)
        this.state.images.set("spotify", Spotify)
        this.state.images.set("github", GitHub)
        this.state.images.set("messenger", Messenger)
        this.state.images.set("discord", Discord)
        this.state.images.set("dropbox", Dropbox)
        this.state.images.set("mail", Mailing)
        this.state.images.set("timer", Timer)

        fetch(
            process.env.REACT_APP_SERVER_URI + '/services', {
            method: 'GET'
            }
        ).then(res => {
            if (res.status >= 200 && res.status <= 204) {
                res.json().then(data => {
                    data.forEach(element => {
                        element.actions.forEach(element2 => {
                            actions.set(element2.id, element.name)
                            actionsNames.set(element2.id, element2.name)
                            actionsDescs.set(element2.id, element2.description)
                        });
                        element.reactions.forEach(element2 => {
                            reactions.set(element2.id, element.name)
                            reactionsNames.set(element2.id, element2.name)
                            reactionsDescs.set(element2.id, element2.description)
                        });
                    });
                    
                    // Get all areas already created //
                    var token = localStorage.getItem('currentUser');
                    if (token !== null) {
                        fetch(
                            process.env.REACT_APP_SERVER_URI + '/area', {
                            method: 'GET',
                            headers: {
                                "content-type": "application/json",
                                Authorization: "Bearer " + token
                            }
                        }).then(res => {
                            if (res.status >= 200 && res.status <= 204) {
                                res.json().then(data => {
                                    this.setState({areas: data, actions: actions, reactions: reactions, actionsName: actionsNames,
                                        reactionsName: reactionsNames, actionsDesc: actionsDescs, reactionsDesc: reactionsDescs})
                                })
                            }
                        })
                    }
                })
            }
        })

    }
    
    /**
     * Removing a specific Area when calling (linked with a card)
     */
    resetAreas() {
        var token = localStorage.getItem('currentUser');
        fetch(
            process.env.REACT_APP_SERVER_URI + '/area', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token
            }
        }).then(res => {
            if (res.status >= 200 && res.status <= 204) {
                res.json().then(data => {
                    this.setState({areas: data})
                })
            }
        })
    }


    /**
     * Removing all Areas when called.
     */
    deleteAllAreas() {
        var token = localStorage.getItem('currentUser')
        this.state.areas.forEach(element => {
            fetch(
                process.env.REACT_APP_SERVER_URI + '/area/' + element.id, {
                method: 'DELETE',
                body: JSON.stringify({id: element.id}),
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + token
                }
            }).then(res => {
                if (res.status >= 200 && res.status <= 204) {
                    res.json().then(data => {
                        this.resetAreas()
                    })
                } else {
                    alert(res.status)
                }
            })
        });
    }

    /**
     * Remove a specific Area from an id
     * @param id
     */
    deleteArea(id) {
        var token = localStorage.getItem('currentUser')
        fetch(
            process.env.REACT_APP_SERVER_URI + '/area/' + id, {
            method: 'DELETE',
            body: JSON.stringify({id: id}),
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token
            }
        }).then(res => {
            if (res.status >= 200 && res.status <= 204) {
                res.json().then(data => {
                    this.resetAreas()
                })
            } else {
                alert(res.status)
            }
        })
    }

    /**
     * Change the first letter into maj
     * @returns a string
     */
    jsUcfirst(string) 
    {
        if (string)
            return (string.charAt(0).toUpperCase() + string.slice(1))
    }
    
    /**
     * Display all params from an action
     * @returns an array of paramters
     */
    DisplayParamsActionInfo() {
        var array = []
        if (this.state.InfoParamAction.size === 0) {
            array.push(
                <div class="text-center">
                    <h6><b>No parameters</b></h6>
                </div>
            )
            return(array)
        }
        for (var [key, value] of this.state.InfoParamAction) {
            array.push(
                <div class="text-center">
                    <u>{key}</u> : {value}
                </div>
            )
        }
        return (array)
    }

    /**
     * Display all params from an reaction
     * @returns an array of parameters
     */
    DisplayParamsReactionInfo() {
        var array = []
        if (this.state.InfoParamReaction.size === 0) {
            array.push(
                <div class="text-center">
                    <h6><b>No parameters</b></h6>
                </div>
            )
            return(array)
        }
        for (var [key, value] of this.state.InfoParamReaction) {
            array.push(
                <div class="text-center">
                    <u>{key}</u> : {value}
                </div>
            )
        }
        return (array)
    }

    /**
     * Create a modal
     * @returns a modal
     */
    ModalInfo() {
        return(
            <Modal id="modalAreaInformation" show={this.state.showmodalInfo} size="lg" centered>
                <Modal.Header closeButton onClick={e => {this.state.InfoDisplay.clear();this.onCloseInfo();}}>
                    <Modal.Title>Area informations</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <div class="mb-3 row">
                        <div class="col-md-4">
                            <img src={this.state.InfoDisplay.get("action_logo")} height="200" width="200" alt=""/>
                        </div>
                        <div class="col-md-8 card-body">
                            <h3 class={this.state.InfoDisplay.get("service_action")}><b>{this.jsUcfirst(this.state.InfoDisplay.get("service_action"))}</b></h3><br/>
                            <h4 class={this.state.InfoDisplay.get("service_action")}><u>Action</u> : </h4>
                            <h4 class={this.state.InfoDisplay.get("service_action")}>{this.state.InfoDisplay.get("action")}</h4><br/><br/>
                            <h5>{this.state.InfoDisplay.get("action_desc")}</h5><br/>
                                
                            <h4 class={this.state.InfoDisplay.get("service_action")}>Parameters :</h4>{this.DisplayParamsActionInfo()}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Body className="text-center">
                    <div class="mb-3 row">
                        <div class="col-md-4">
                            <img src={this.state.InfoDisplay.get("reaction_logo")} height="200" width="200" alt=""/>
                        </div>
                        <div class="col-md-8 card-body">
                            <h3 class={this.state.InfoDisplay.get("service_reaction")}><b>{this.jsUcfirst(this.state.InfoDisplay.get("service_reaction"))}</b></h3><br/>
                            <h4 class={this.state.InfoDisplay.get("service_reaction")}><u>Reaction</u> : </h4>
                            <h4 class={this.state.InfoDisplay.get("service_reaction")}>{this.state.InfoDisplay.get("reaction")}</h4><br/><br/>
                            <h5>{this.state.InfoDisplay.get("reaction_desc")}</h5><br/>
                            
                            <h4 class={this.state.InfoDisplay.get("service_reaction")}>Parameters :</h4> {this.DisplayParamsReactionInfo()}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => {this.state.InfoDisplay.clear();this.onCloseInfo();}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    /**
     * Get all actions and reactions to be displayed
     * @param element
     */
    fillInfoToDisplay(element) {
        this.state.InfoDisplay.set("action_logo", this.state.images.get(this.state.actions.get(element.action_id)))
        this.state.InfoDisplay.set("reaction_logo", this.state.images.get(this.state.reactions.get(element.reaction_id)))
        this.state.InfoDisplay.set("service_action", this.state.actions.get(element.action_id))
        this.state.InfoDisplay.set("service_reaction", this.state.reactions.get(element.reaction_id))
        this.state.InfoDisplay.set("action", this.state.actionsName.get(element.action_id))
        this.state.InfoDisplay.set("reaction", this.state.reactionsName.get(element.reaction_id))
        this.state.InfoDisplay.set("action_desc", this.state.actionsDesc.get(element.action_id))
        this.state.InfoDisplay.set("reaction_desc", this.state.reactionsDesc.get(element.reaction_id))
        if (element.parameters_action) {
            Object.keys(element.parameters_action).forEach(element2 => {
                this.state.InfoParamAction.set(element2, element.parameters_action[element2])
            });
        }
        if (element.parameters_reaction) {
            Object.keys(element.parameters_reaction).forEach(element2 => {
                this.state.InfoParamReaction.set(element2, element.parameters_reaction[element2])
            });
        }
    }

    /**
     * Create all card from state areas
     * @returns an array of card
     */
    createAreasCard() {
        let array = []

        this.state.areas.forEach(element => {
            array.push(
                <Card className="mb-3" style={{ width: '18rem', margin: '45px' }}>
                    <Card.Header onClick={e => {this.fillInfoToDisplay(element);this.showModalInfo()}}>
                        <img src={this.state.images.get(this.state.actions.get(element.action_id))} height="100" width="100" alt=""/>
                        <img src={this.state.images.get(this.state.reactions.get(element.reaction_id))} height="100" width="100" alt=""/>
                    </Card.Header>
                    <Card.Body className="bg_twitter" onClick={e => {this.fillInfoToDisplay(element);this.showModalInfo()}}>
                        <h4 class={this.state.actions.get(element.action_id)} >{this.jsUcfirst(this.state.actions.get(element.action_id))}</h4>
                        <h4 class="dispinline" > x </h4>
                        <h4 class={this.state.reactions.get(element.reaction_id)} >{this.jsUcfirst(this.state.reactions.get(element.reaction_id))}</h4>
                    </Card.Body>
                    <Card.Body>
                        <Button text="white" variant="danger" id="deletebutton" onClick={() => this.deleteArea(element.id)}>Delete</Button>
                    </Card.Body>
                </Card>
            )
        });
        return (array)
    }

    /**
     * Render the home page
     * @returns the home page
     */
    render() {
        var islogged;
        var areas;

        if (localStorage.getItem('currentUser'))
            islogged = <Button variant="secondary" size="lg" active href='creation'>Create an Area</Button>
        else {
            islogged = <div><h1 class="display-4">Welcome to AREA</h1>
                            <h5>You need to be connected first to manage your services.</h5></div>
        }

        if (localStorage.getItem('currentUser') && this.state.areas[0])
            areas = <div><br/><Button variant="secondary" size="lg" active type="button" onClick={e => {this.showModal();}}>Delete all Areas</Button></div>
        else
            areas = <div><br/><img src={tree} className="tree-logo" alt="tree"/></div>

        return (
            <div class="text-center">
                <br/>
                {islogged}
                {areas}
                <Modal id="modalDeleteAll" show={this.state.showmodalDeletion}>
                    <Modal.Header closeButton onClick={e => {this.onClose();}}>
                        <Modal.Title>Deleting All Areas...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete your Areas ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={e => {this.onClose();}}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => this.deleteAllAreas()}>
                            Yes, Delete all areas
                        </Button>
                    </Modal.Footer>
                </Modal>
                {this.ModalInfo()}
                <div class="row wrapper">
                    {this.createAreasCard()}
                </div>
            </div>
        );
    }
}