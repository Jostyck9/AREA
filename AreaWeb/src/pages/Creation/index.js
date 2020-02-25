import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import { Button, Form , Col} from 'react-bootstrap'

export default class Creation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {valueServAct: 'nothing', valueServRea: 'nothing', valueAct: 'nothing', valueRea: 'nothing', state: 0};
    
        this.handleChangeAct = this.handleChangeAct.bind(this);
        this.handleChangeRea = this.handleChangeRea.bind(this);
        this.handleChangeServAct = this.handleChangeServAct.bind(this);
        this.handleChangeServRea = this.handleChangeServRea.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
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
        if (this.state.state === 0) {
            alert('Service Action : ' + this.state.valueServAct + ' Service Reaction : ' + this.state.valueServRea);
            this.setState({state: 1})
         }
        else if (this.state.state === 1)
            alert('Action : ' + this.state.valueAct + ' Reaction : ' + this.state.valueRea);
        event.preventDefault();
    }

    ErrorPage() {
        return (
            <div>Error</div>
        )
    }

    ChooseParameters()
    {
        return (
            <div>Nothing</div>
        )
    }

    ChooseActionsReactions()
    {
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
                                    <option value="Send msg">Send msg</option>
                                    <option value="play music">Play music</option>
                                    <option value="bonjour">Bonjour</option>
                                    <option value="test">Test</option>
                                </Form.Control>
                            </Col>

                            <Col xs={2}></Col>

                            <Col>
                                <Form.Label>Pick your reaction for {this.state.valueServRea}:</Form.Label>
                                <Form.Control as="select" value={this.state.valueArea} onChange={this.handleChangeRea}>
                                    <option value="tag truc">Tag truc</option>
                                    <option value="play music">Play music</option>
                                    <option value="pull">Pull</option>
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
                                    <option value="twitter">Twitter</option>
                                    <option value="github">Github</option>
                                    <option value="discord">Discord</option>
                                    <option value="onedrive">Onedrive</option>
                                    <option value="trello">Trello</option>
                                    <option value="outlook">Outlook</option>
                                    <option value="spotify">Spotify</option>
                                </Form.Control>
                            </Col>

                            <Col xs={4}></Col>

                            <Col>
                                <Form.Label>Pick your reaction service:</Form.Label>
                                <Form.Control as="select"  value={this.state.valueServ} onChange={this.handleChangeServRea}>
                                    <option value="nothing"></option>
                                    <option value="twitter">Twitter</option>
                                    <option value="github">Github</option>
                                    <option value="discord">Discord</option>
                                    <option value="onedrive">Onedrive</option>
                                    <option value="trello">Trello</option>
                                    <option value="outlook">Outlook</option>
                                    <option value="spotify">Spotify</option>
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

    showFromState()
    {
        if (this.state.state === 0)
            return (this.ChooseServices())
        else if (this.state.state === 1)
            return (this.ChooseActionsReactions())
        else if (this.state.state === 2)
            return (this.ChooseParameters())
        else
            return (this.ErrorPage())
    }

    render() {
        return (this.showFromState());
    }
}