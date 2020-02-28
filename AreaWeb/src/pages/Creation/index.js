import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import { Button, Form , Col} from 'react-bootstrap'
import JSONPretty from 'react-json-pretty'


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
        params_actions: [],
        params_reactions: [],
        Map1: new Map(),
        Map2: new Map()
    };

        this.handleChangeAct = this.handleChangeAct.bind(this);
        this.handleChangeRea = this.handleChangeRea.bind(this);
        this.handleChangeServAct = this.handleChangeServAct.bind(this);
        this.handleChangeServRea = this.handleChangeServRea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount() {
        var services = []
        var id_act = []
        var id_rea = []
        var actions = new Map()
        var reactions = new Map()
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
    }

    getSpecificParams() {
        var ActParams = {}
        var ReaParams = {}
        var load1 = new Map()
        var load2 = new Map()

        this.state.data.forEach(element => {
            if (element.name === this.state.valueServAct) {
                element.actions.forEach(element2 => {
                    if (element2.name === this.state.valueAct) {
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
        
        if (test1.length === 0) {
            alert("test1 set to null")
            parameters_action = null
        }
        if (test2.length === 0) {
            alert("test2 set to null")
            parameters_reaction = null
        }

        for (let i = 0; i < test1.length; i++) {
            alert(document.getElementById(test1[i]).value)
            params_action.push(document.getElementById(test1[i]).value)
        }
        alert("HERE : " + params_action)
        for (let i = 0; i < test2.length; i++) {
            alert(document.getElementById(test2[i]).value)
            params_reaction.push(document.getElementById(test2[i]).value)
        }

        for (var [key1, value1] of this.state.actions) {
                if (key1 === valueAct) {
                    action_id = this.state.id_act[x]
                    alert("Action = " + action_id)
                }

                x += 1
        }
        x = 0
        for (var [key2, value1] of this.state.reactions) {
            if (key2 === valueRea) {
                reaction_id = this.state.id_rea[x]
                alert("Reaction = " + reaction_id)
            }
            x += 1
    }

    for (let i = 0; i < params_params_action.length; i++) {
        alert("need to be server : " + params_params_action[i] + "need to be my dudes" + params_action[i])
        parameters_action[params_params_action[i]] = params_action[i]
    }
    for (let i = 0; i < params_params_reaction.length; i++) {
        alert("need to be server : " + params_params_reaction[i] + "need to be my dudes" + params_reaction[i])
        parameters_reaction[params_params_reaction[i]] = params_reaction[i]
    }
    var token = localStorage.getItem('currentUser');
    fetch(process.env.REACT_APP_SERVER_URI + '/area', {
        method: 'POST',
        body: JSON.stringify({ action_id: action_id, reaction_id: reaction_id, parameters_action: parameters_action, parameters_reaction: parameters_reaction}),
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + token
        }
    }).then(res => {
        alert(res.status)
        if (res.status >= 200 && res.status <= 204) {
            res.json().then(data => {
                alert(data.token)
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
    this.setState({state: 3})
    // HAVE TO FIX REACTIONS (test with Discord for actions and Twitter for reactions)
    }

    //================================================
    // All Handles
    //================================================


    // Handle for service actions reactions 

    handleChangeServAct(event) {
        this.setState({valueServAct: event.target.value});  
    }

    handleChangeServRea(event) {
        this.setState({valueServRea: event.target.value});
    }

    // Handle for actions reactions 

    handleChangeAct(event) {
        this.setState({valueAct: event.target.value});  
    }

    handleChangeRea(event) {
        this.setState({valueRea: event.target.value});
    }
    
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

 
 

    
    ShowParamsPage()
    {

        let arrayactions = []
        let arrayreactions = []
        let array_for_act_pushing = []
        let array_for_rea_pushing = []

        for (var [key1, value1] of this.state.Map1) {
            if (key1 !== "") {
                arrayactions.push(<br></br>)
                arrayactions.push(<Form.Label>{key1}:</Form.Label>)
                if (value1 === "string") {
                    let idAction = "action." + key1
                    arrayactions.push(<Form.Control id={idAction} placeholder="The value must be a string" required/>)
                    array_for_act_pushing.push(idAction)
                }
                else if (value1 === "number")
                    arrayactions.push(<Form.Control type="number" placeholder="0" required/>)
                else;
            }
        }

        for (var [key2, value2] of this.state.Map2) {
            if (key1 !== "") {
                arrayreactions.push(<br></br>)
                arrayreactions.push(<Form.Label>{key2}:</Form.Label>)
                if (value2 === "string") {
                    let idReaction = "reaction." + key2
                    arrayreactions.push(<Form.Control id={key2} placeholder="The value must be a string" required/>)
                    array_for_rea_pushing.push(idReaction)
                }
                else if (value2 === "number")
                    arrayreactions.push(<Form.Control type="number" placeholder="0" required/>)
                else;
            }
        }

        alert("Here1 : " + array_for_act_pushing)

        return (
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
        );
    }

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

    ChooseServices()
    {
        let arrayAct = []
        let arrayRea = []
        let check = false
        for (let i = 0; i < this.state.services.length; i++) {
            for (var [key1, value1] of this.state.actions) {
                if (check === false && this.state.services[i] === value1) {
                    arrayAct.push(<option value={this.state.services[i]}>{this.state.services[i]}</option>)
                    check = true
                }
            }
            check = false
        }
        for (let i = 0; i < this.state.services.length; i++) {
            for (var [key2, value2] of this.state.reactions) {
                if (check === false && this.state.services[i] === value2) {
                    arrayRea.push(<option value={this.state.services[i]}>{this.state.services[i]}</option>)
                    check = true
                }
            }
            check = false
        }

        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="10%"></td>
                    <td width="80%">
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

    ErrorPage() {
        return (
            <div>Error</div>
        )
    }

    succes()
    {
        return (
            <div>Hello</div>
        )
    }


    // Show a choosen page from a state

    showFromState()
    {
        if (this.state.state === 0)
            return (this.ChooseServices())
        else if (this.state.state === 1)
            return (this.ChooseActionsReactions())
        else if (this.state.state === 2)
            return (this.ShowParamsPage())
        else if (this.state.state === 3)
            return (this.succes())
        else
            return (this.ErrorPage())
    }

    render() {
        return (this.showFromState());
    }
}
// HOW TO TO THE REQUEST

// params_action : JSON.stringify({serveur: zefzf})

// body: JSON.stringify({ actionid: email, reaction_id: password, params_action, params_reaction}),