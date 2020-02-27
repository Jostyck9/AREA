import 'bootstrap/dist/css/bootstrap.min.css';
import tree from '../../images/tree.png';
import React from 'react';
import '../../css/site.css';
import { Button, Modal, Card } from 'react-bootstrap'
import Twitter from '../../images/twitter_logo.png'
import Spotify from '../../images/spotify_logo.png'

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
            InfoDisplay: [],
            showmodalDeletion: false,
            showmodalInfo: false
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
        };
    }

    componentWillMount() {

        // Get all services informations //

        var actions = new Map()
        var reactions = new Map()
        var actionsNames = new Map()
        var reactionsNames = new Map()
        var actionsDescs = new Map()
        var reactionsDescs = new Map()

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

                    var token = JSON.parse(localStorage.getItem('currentUser'));
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
                })
            }
        })

    }
    
    resetAreas() {
        var token = JSON.parse(localStorage.getItem('currentUser'));
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

    deleteAllAreas() {
        var token = JSON.parse(localStorage.getItem('currentUser'))
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

    deleteArea(id) {
        var token = JSON.parse(localStorage.getItem('currentUser'))
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

    jsUcfirst(string) 
    {
        if (string)
            return (string.charAt(0).toUpperCase() + string.slice(1))
    }
    
    ModalInfo() {
        return(
            <Modal id="modalAreaInformation" show={this.state.showmodalInfo}>
                <Modal.Header closeButton onClick={e => {this.onCloseInfo();}}>
                    <Modal.Title>Area informations</Modal.Title>
                </Modal.Header>
                <Modal.Body>Service: Action: Description: Parameters:
                Service: Reaction: Description: Parameters:
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e => {this.onCloseInfo();}}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    createAreasCard() {
        let array = []

        this.state.areas.forEach(element => {
            array.push(
                <Card className="mb-3" style={{ width: '18rem', margin: '45px' }}>
                    <Card.Header onClick={element => {this.showModalInfo();}}>
                        <img src={Twitter} height="100" width="100" alt="twitter_logo"/>
                        <img src={Spotify} height="100" width="100" alt="spotify_logo"/>
                    </Card.Header>
                    <Card.Body className="bg_twitter" onClick={element => {this.showModalInfo();}}>
                        <h4 class="twitter dispinline" >{this.jsUcfirst(this.state.actions.get(element.action_id))}</h4>
                        <h4 class="dispinline" > x </h4>
                        <h4 class="spotify dispinline" >{this.jsUcfirst(this.state.reactions.get(element.reaction_id))}</h4>
                        <Card.Text>
                            {this.state.actionsDesc.get(element.action_id)}<br/>
                            {this.state.reactionsDesc.get(element.reaction_id)}
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Button text="white" variant="danger" id="deletebutton" onClick={() => this.deleteArea(element.id)}>Delete</Button>
                    </Card.Body>
                </Card>
            )
        });
        return (array)
    }

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