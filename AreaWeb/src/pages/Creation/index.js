import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import { Button, Form , Col, Card,Modal} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'

import Twitter from '../../images/twitter_logo.png'
import Spotify from '../../images/spotify_logo.png'
import GitHub from '../../images/github_logo.png'
import Messenger from '../../images/messenger_logo.png'
import Discord from '../../images/discord_logo.png'
import Dropbox from '../../images/dropbox_logo.png'
import Mailing from '../../images/mail_logo.png'
import Timer from '../../images/timer_logo.png'


export default class Creation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        valueServAct: 'nothing',
        valueServRea: 'nothing',
        valueAct: 'nothing',
        valueRea: 'nothing',
        state: 0,
        data: [],
        id_act: [],
        id_rea: [],
        services: [],
        actions: [],
        reactions: [],
        params_action: [],
        params_reaction: [],
        params_actions: [],
        params_reactions: [],
        Map1: new Map(),
        Map2: new Map(),
        results_parsed: new Map(),
        AllLinkedAccount : [],
        images: new Map()
    };

        this.handleChangeAct = this.handleChangeAct.bind(this);
        this.handleChangeRea = this.handleChangeRea.bind(this);
        this.handleChangeServAct = this.handleChangeServAct.bind(this);
        this.handleChangeServRea = this.handleChangeServRea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkIfServiceIsLinked = this.checkIfServiceIsLinked.bind(this);
    }
    
    /**
     * Do things before the render
     */
    componentWillMount() {
        var services = []
        var id_act = []
        var id_rea = []
        var actions = new Map()
        var reactions = new Map()
        var linkedAccount = []
        const token = localStorage.getItem('currentUser').replace('"', '').replace('"', '')

        fetch(
            process.env.REACT_APP_SERVER_URI + '/services', {
            method: 'GET'
            }
        ).then(res => {
            if (res.status === 200) {
                res.json().then(data => {
                    this.setState({data: data})
                    data.forEach(element => {
                        services.push(element.name)
                        element.actions.forEach(element2 => {
                            actions.set(element2.name, element.name)
                            id_act.push(element2.id)
                            // alert("Service name = " + element.name + " ation name ? " + element2.name + " id ? = " + element2.id)
                        });
                        element.reactions.forEach(element2 => {
                            reactions.set(element2.name, element.name)
                            id_rea.push(element2.id)
                        });
                        this.setState({services: services, actions: actions, reactions: reactions, id_act: id_act, id_rea: id_rea})
                    });
                })
            }
        })

        this.state.images.set("twitter", Twitter)
        this.state.images.set("spotify", Spotify)
        this.state.images.set("github", GitHub)
        this.state.images.set("messenger", Messenger)
        this.state.images.set("discord", Discord)
        this.state.images.set("dropbox", Dropbox)
        this.state.images.set("mail", Mailing)
        this.state.images.set("timer", Timer)

        fetch(process.env.REACT_APP_SERVER_URI + '/me/auth', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                Authorization: "Bearer " + token
            }
        }).then(res => {
            if (res.status >= 200 && res.status <= 204) {
                res.json().then(datax => {
                    for (let i = 0; i < datax.length; i++) {
                        if (datax[i].isConnected === true)
                        linkedAccount.push(datax[i].name)
                    }
                    this.setState({AllLinkedAccount: linkedAccount})
                })
            }
        })



    }

    /**
     * Get specifics params 
    */
    getSpecificParams() {
        var ActParams = {}
        var ReaParams = {}
        var results = {}
        var load1 = new Map()
        var load2 = new Map()
        var results_parsed = new Map()

        this.state.data.forEach(element => {
            if (element.name === this.state.valueServAct) {
                element.actions.forEach(element2 => {
                    if (element2.name === this.state.valueAct) {
                        if (element2.results) {
                            results = (JSON.stringify(element2.results))
                            results = JSON.parse(results, (key, value) => {
                                if (key !== '')
                                    results_parsed.set(key, value)
                            })
//                            alert(results_parsed)
                        }
                        if (element2.parameters) {
                            ActParams = (JSON.stringify(element2.parameters))
                            ActParams = JSON.parse(ActParams, (key, value) => {
                                load1.set(key, value)
                            })
                            this.setState({Map1: load1})
                        }
                    }
                });
            }
            this.setState({results_parsed: results_parsed})
        })
        this.state.data.forEach(element => {
            if (element.name === this.state.valueServRea) {
                element.reactions.forEach(element2 => {
                    if (element2.name === this.state.valueRea) {
                        if (element2.parameters) {
                            ReaParams = (JSON.stringify(element2.parameters))
                            ReaParams = JSON.parse(ReaParams, (key, value) => {
                                load2.set(key, value)
                            })
                            this.setState({Map2: load2})
                        }
                    }
                });
            }
        })
    }

    /**
     * Handle the submit of the final form
     * @param test1 id of actions
     * @param test2 id of reactions
     */
    onSubmit = (test1, test2) => {
        var action_id;
        var reaction_id;
        var x = 0;
        var params_action = []
        var params_reaction = []
        var params_params_action = []
        var params_params_reaction = []
        var parameters_action = {}
        var parameters_reaction = {}

        const {valueAct, valueRea} = this.state;

        for (let i = 0; i < test1.length; i++)
            params_params_action.push(test1[i].split('.').pop())
        for (let i = 0; i < test2.length; i++)
            params_params_reaction.push(test2[i].split('.').pop())
        
        if (test1.length === 0)
            parameters_action = null
        if (test2.length === 0)
            parameters_reaction = null

        for (let i = 0; i < test1.length; i++)
            params_action.push(document.getElementById(test1[i]).value)
        for (let i = 0; i < test2.length; i++)
            params_reaction.push(document.getElementById(test2[i]).value)

        for (var [key1, value1] of this.state.actions) {
            if (key1 === valueAct)
                action_id = this.state.id_act[x]
            x += 1
        }
        x = 0
        for (var [key2, value1] of this.state.reactions) {
            if (key2 === valueRea)
                reaction_id = this.state.id_rea[x]
            x += 1
    }

    for (let i = 0; i < params_params_action.length; i++)
        parameters_action[params_params_action[i]] = params_action[i]
    for (let i = 0; i < params_params_reaction.length; i++)
        parameters_reaction[params_params_reaction[i]] = params_reaction[i]

    var token = localStorage.getItem('currentUser').replace('"', '').replace('"', '')

    fetch(process.env.REACT_APP_SERVER_URI + '/area', {
        method: 'POST',
        body: JSON.stringify({ action_id: action_id, reaction_id: reaction_id, parameters_action: parameters_action, parameters_reaction: parameters_reaction}),
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token
        }
    }).then(res => {
        if (res.status >= 200 && res.status <= 204) {
            res.json().then(data => {
                // global.token = data.token
                // global.signed = true
            })
        } else {
            res.json().then(data => {
                alert(data.message || 'Unknow server error')
            }).catch(err => {
                alert('Invalid data format for error')
            })
        }
    }).catch(err => {
        alert(err.message)
    })

    this.setState({state: 3, params_action: params_action, params_reaction, params_reaction})
    
    }

    //================================================
    // All Handles
    //================================================


    // Handle for service actions reactions 

    /**
     * Handle the change of service action and set the state of service action
     * @param event
     */
    handleChangeServAct(event) {
        this.setState({valueServAct: event.target.value});  
    }

    /**
     * Handle the change of service reaction and set the state of service reaction
     * @param event
     */
    handleChangeServRea(event) {
        this.setState({valueServRea: event.target.value});
    }

    // Handle for actions reactions 

    /**
     * Handle the change of action and set the state of action
     * @param event
     */
    handleChangeAct(event) {
        this.setState({valueAct: event.target.value});  
    }

    /**
     * Handle the change of reaction and set the state of reaction
     * @param event
     */
    handleChangeRea(event) {
        this.setState({valueRea: event.target.value});
    }
    
    /**
     * Handle the submit and check the state of actions reactions
     * @param event
     */
    handleSubmit(event) {
        if (this.state.state === 0 && this.state.valueServAct !== "nothing" && this.state.valueServRea !== "nothing") {
            this.setState({state: 1})
        }
        else if (this.state.state === 1 && this.state.valueAct !== "nothing" && this.state.valueRea !== "nothing") {
            this.getSpecificParams()
            this.setState({state: 2})
        }
        event.preventDefault();
    }





    //================================================
    // Under this, all pages
    //================================================

 
 

    /**
     * Return the page of choose params
     * @returns the page to render
     */
    ShowParamsPage()
    {

        let arrayactions = []
        let arrayreactions = []
        let arrayparams = []
        let array_for_act_pushing = []
        let array_for_rea_pushing = []
        let bracket1 = "{{"
        let bracket2 = "}}"

        for (var [key1, value1] of this.state.Map1) {
            if (key1 !== "") {
                arrayactions.push(<br></br>)
                arrayactions.push(<Form.Label>{key1}:</Form.Label>)
                let idAction = "action." + key1
                if (value1 === "string") {
                    arrayactions.push(<Form.Control id={idAction} placeholder="The value must be a string" required/>)
                    array_for_act_pushing.push(idAction)
                }
                else if (value1 === "int") {
                    arrayactions.push(<Form.Control id={idAction} type="number" placeholder="0" required/>)
                    array_for_act_pushing.push(idAction)
                }
                else;
            }
        }

        for (var [key2, value2] of this.state.Map2) {
            if (key2 !== "") {
                arrayreactions.push(<br></br>)
                arrayreactions.push(<Form.Label>{key2}:</Form.Label>)
                if (value2 === "string") {
                    let idReaction = "reaction." + key2
                    arrayreactions.push(<Form.Control id={idReaction} placeholder="The value must be a string" required/>)
                    array_for_rea_pushing.push(idReaction)
                }
                else if (value2 === "number")
                    arrayreactions.push(<Form.Control type="number" placeholder="0" required/>)
                else;
            }
        }
        if (this.state.results_parsed.size !== 0) {
            arrayparams.push(<Alert.Heading>There is things you don't know</Alert.Heading>)
            arrayparams.push(<p>You can use tag from you're action in your reactions.</p>)
            arrayparams.push(<hr/>)
            arrayparams.push(<p>Here for exemple you can use some cools stuffs to custom your differents reactions, so use it !</p>)
            arrayparams.push(<p>Here the different(s) parameter(s) :</p>)
            for (var [key3, value3] of this.state.results_parsed) {
                if (key3 !== "") {
                    arrayparams.push(<p>You can use {bracket1}{key3}{bracket2} from {this.state.valueServAct}</p>)
                }
            }
        }

        return (
            <div>
            <Form className="text-center" onSubmit={() => this.onSubmit(array_for_act_pushing, array_for_rea_pushing)}>

            <Form.Row>
                <Col>
                    <Form.Label>Pick your param(s) for the action : "{this.state.valueAct}" in : {this.state.valueServAct}:</Form.Label>
                    {arrayactions}
                </Col>


                <Col xs={2}></Col>

                <Col>
                    <Form.Label>Pick your param(s) for the reaction {this.state.valueRea} in {this.state.valueServRea}:</Form.Label>
                    {arrayreactions}
                </Col>
            </Form.Row>

            <br></br>

            <Button variant="secondary" size="lg" active type="submit" value="Submit">Valid your parameters</Button><br/>
            </Form>
            <br></br>
            <br></br>
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="20%"></td>
                    <td width="60%">
                        <Alert variant="success">
                        {arrayparams}
                        </Alert>
                        </td>
                    <td width="20%"></td>
                </tr>
            </table>
          </div>
        );
    }

    /**
     * Return the page of choose actions reactions
     * @returns a page to render
     */
    ChooseActionsReactions()
    {
        let arrayactions = []
        for (var [key1, value1] of this.state.actions) {
            if (value1 === this.state.valueServAct) {
                arrayactions.push(<option value={key1}>{key1}</option>)
            }
        }
        let arrayreactions = []
        for (var [key2, value2] of this.state.reactions) {
            if (value2 === this.state.valueServRea) {
                arrayreactions.push(<option value={key2}>{key2}</option>)
            }
        }
        if (arrayactions.length === 0)
            arrayactions.push(<option value="No reaction">No reactions</option>)
        if (arrayreactions.length === 0)
            arrayreactions.push(<option value="No reaction">No reactions</option>)

        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="10%"></td>
                    <td width="80%">
                        <Form className="text-center" onSubmit={this.handleSubmit}>

                        <Form.Row>
                            <Col>
                                <Form.Label>Pick your action for {this.state.valueServAct}:</Form.Label>
                                <Form.Control as="select" value={this.state.valueArea} onChange={this.handleChangeAct}>
                                    <option selected="selected" value="nothing"></option>
                                    {arrayactions}
                                </Form.Control>
                            </Col>

                            <Col xs={2}></Col>

                            <Col>
                                <Form.Label>Pick your reaction for {this.state.valueServRea}:</Form.Label>
                                <Form.Control as="select" value={this.state.valueArea} onChange={this.handleChangeRea}>
                                    <option selected="selected" value="nothing"></option>
                                    {arrayreactions}
                                </Form.Control>
                            </Col>
                        </Form.Row>

                        <br></br>

                        <Button variant="secondary" size="lg" active type="submit" value="Submit">Valid your actions/reactions</Button><br/>
                        </Form>
                    
                    </td>
                    <td width="10%"></td>
                    </tr>
                </table>
        );
    }

    /**
     * Return the page of choose services
     * @returns {boolean}
     */
    checkIfServiceIsLinked(HaveToCheck) {
        for (let i = 0; i < this.state.AllLinkedAccount.length; i++) {
            if (HaveToCheck === this.state.AllLinkedAccount[i])
                return (true)
        }
        return (false);
    }

    /**
     * Return the page of choose services
     * @returns a page to render
     */
    ChooseServices()
    {
        let arrayAct = []
        let arrayRea = []
        let array = []
        let check = false

        for (let i = 0; i < this.state.services.length; i++) {
            for (var [key1, value1] of this.state.actions) {
                if (check === false && this.state.services[i] === value1 && this.checkIfServiceIsLinked(this.state.services[i]) === true) {
                    arrayAct.push(<option value={this.state.services[i]}>{this.state.services[i]}</option>)
                    check = true

                }
            }
            check = false
        }
        for (let i = 0; i < this.state.services.length; i++) {
            for (var [key2, value2] of this.state.reactions) {
                if (check === false && this.state.services[i] === value2 && this.checkIfServiceIsLinked(this.state.services[i]) === true) {
                    arrayRea.push(<option value={this.state.services[i]}>{this.state.services[i]}</option>)
                    check = true
                }
            }
            check = false
        }
        array.push(<div class="alert alert-warning alert-dismissible text-center"><strong>Missing services ? You're not probably logged to all services !</strong> <div>Go to your account and connect yourself ! You need help to log yourself. Go here <a href="account">Account</a></div></div>)
        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="10%"></td>
                    <td width="80%">
                        <br></br>
                        {array}
                        <br></br>
                        <Form className="text-center" onSubmit={this.handleSubmit}>
                        
                        <Form.Row>
                            <Col>
                                <Form.Label>Pick your action service:</Form.Label>
                                <Form.Control as="select" value={this.state.valueServ} onChange={this.handleChangeServAct}>
                                    <option value="nothing"></option>
                                    {arrayAct}
                                </Form.Control>
                            </Col>

                            <Col xs={4}></Col>

                            <Col>
                                <Form.Label>Pick your reaction service:</Form.Label>
                                <Form.Control as="select"  value={this.state.valueServ} onChange={this.handleChangeServRea}>
                                    <option value="nothing"></option>
                                    {arrayRea}
                                </Form.Control>
                            </Col>
                        </Form.Row>


                        <br></br>

                        <Button variant="secondary" size="lg" active type="submit" value="Submit">Valid your services</Button><br/>
                        </Form>

                    </td>
                    <td width="10%"></td>
                    </tr>
                </table>
        );
    }

    /**
     * Render the error page
     * @returns the error page
     */

    ErrorPage() {
        return (
            <div>Error</div>
        )
    }

    /**
     * Show on the page the action reaction card that you've just created
     * @returns a page with the final card
     */
    createAreasCard() {
        let array = []
        let arrayactions = []
        let arrayreactions = []
        let x = 0;


        for (var [key1, value1] of this.state.Map1) {
            if (key1 !== "") {
                arrayactions.push(<u>{key1}:</u>)
                arrayactions.push(<b> </b>)
                arrayactions.push( this.state.params_action[x])
                arrayactions.push(<br/>)
                x++;
            }
        }
        x = 0;
        for (var [key2, value1] of this.state.Map2) {
            if (key2 !== "") {
                arrayreactions.push(<u>{key2}:</u>)
                arrayreactions.push(<b> </b>)
                arrayreactions.push( this.state.params_reaction[x])
                arrayreactions.push(<br/>)
                x++;
            }
        }
        if (arrayactions.length === 0)
            arrayactions.push(<b>X</b>)
        if (arrayreactions.length === 0)
            arrayreactions.push(<b>X</b>)

        array.push(
            <Card className="mb-3">
                <Card.Header>
                    <table width="100%" height="100%" border="0">
                        <tr height="100%">
                            <td width="10%"></td>
                            <td width="30%">
                                <div class="columnEnd">
                                    <img src={this.state.images.get(this.state.valueServAct)} height="170" width="170" alt=""/>
                                </div>
                            </td>
                            <td width="20%"></td>
                            <td width="30%">
                                <div class="columnEnd">
                                    <img src={this.state.images.get(this.state.valueServRea)} height="170" width="170" alt=""/>
                                </div>
                            </td>
                            <td width="10%"></td>
                        </tr>
                    </table>
                </Card.Header>
                <Card.Body>
                    <h4 class={this.state.valueServAct} >{this.jsUcfirst(this.state.valueServAct)}:</h4><br/><br/>
                    <h5 class={this.state.valueServAct}>Action: {this.state.valueAct}</h5><br/><br/>
                    <h5 class={this.state.valueServAct}>Parameters: </h5><br/>
                    {arrayactions}
                </Card.Body>
                <Card.Body>
                    <h4 class={this.state.valueServRea} >{this.jsUcfirst(this.state.valueServRea)}:</h4><br/><br/>
                    <h5 class={this.state.valueServRea}>Reaction: {this.state.valueRea}</h5><br/><br/>
                    <h5 class={this.state.valueServRea}>Parameters: </h5><br/>
                    {arrayreactions}
                </Card.Body>
            </Card>
        )
        array.push(<Button variant="secondary" size="lg" active href='home'>Return to home</Button>)
        return (
            <div>
                <br></br>
                <table width="100%" height="100%" border="0">
                    <tr height="100%">
                        <td width="25%"></td>
                        <td width="50%">
                            <div class="text-center">
                                {array}
                            </div>
                        </td>
                        <td width="25%"></td>
                    </tr>
                </table>
            </div>
        )
    }

    // Show a choosen page from a state

    /**
     * Render the page by a state
     * @returns a page
     */
    showFromState()
    {
        if (this.state.state === 0)
            return (this.ChooseServices())
        else if (this.state.state === 1)
            return (this.ChooseActionsReactions())
        else if (this.state.state === 2)
            return (this.ShowParamsPage())
        else if (this.state.state === 3)
            return (this.createAreasCard())
        else
            return (this.ErrorPage())
    }

    /**
     * Change the first letter into a maj
     * @returns a string
     */
    jsUcfirst(string) 
    {
        if (string)
            return (string.charAt(0).toUpperCase() + string.slice(1))
    }

    /**
     * Render the creation page
     * @returns the creation page
     */
    render() {
        return (this.showFromState());
    }
}
// HOW TO TO THE REQUEST

// params_action : JSON.stringify({serveur: zefzf})

// body: JSON.stringify({ actionid: email, reaction_id: password, params_action, params_reaction}),