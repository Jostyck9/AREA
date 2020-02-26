import 'bootstrap/dist/css/bootstrap.min.css';
import tree from '../../images/tree.png';
import React from 'react';
import '../../css/site.css';
import { Button, Modal } from 'react-bootstrap'
import JSONPretty from 'react-json-pretty'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            areas: [],
            showmodal: false
        };
        this.showModal = e => {
            this.setState({showmodal: true});
        }
        this.onClose = e => {
            this.setState({showmodal: false});
          };
    }

    componentWillMount() {
        fetch(
            process.env.REACT_APP_SERVER_URI + '/area', {
            method: 'GET'
            }
        ).then(res => {
            if (res.status >= 200 && res.status <= 204) {
                res.json().then(data => {
                    this.setState({areas: data})
                })
            }
        })
    }

    printToken() {
       alert(JSON.parse(localStorage.getItem('currentUser')));
    }
    
    ModalComp() {
        return(
            <Modal show={this.state.showmodal}>
                <Modal.Header closeButton>
                <Modal.Title>Deleting All Areas...</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your Areas ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.setState({showmodal: false})}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={this.setState({showmodal: false})}>
                    Yes, Delete all areas
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    deleteAllAreas() {
        // this.state.areas.forEach(element => {
        //     fetch(
        //         process.env.REACT_APP_SERVER_URI + '/area/' + element.id, {
        //         method: 'DELETE'
        //         }
        //     ).then(res => {
        //         if (res.status >= 200 && res.status <= 204) {
        //             res.json().then(data => {
        //                 this.setState({areas: data})
        //             })
        //         }
        //     })
        // });
        alert("deletedAll")
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

        if (localStorage.getItem('currentUser') && this.state.areas)
            areas = <div><br/><Button variant="secondary" size="lg" active type="button" onClick={e => {this.showModal();}}>Delete all Areas</Button>
                <JSONPretty id="json-pretty" data={this.state.areas}></JSONPretty></div>
        else
            areas = <div><br/><img src={tree} className="tree-logo" alt="tree"/></div>

        return (
            <div class="text-center">
                <br/>
                {islogged}
                {areas}
                <Modal show={this.state.showmodal}>
                  <Modal.Header closeButton onClick={e => {this.onClose();}}>
                    <Modal.Title>Deleting All Areas...</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete your Areas ?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={e => {this.onClose();}}>
                      Close
                    </Button>
                    <Button variant="danger" onClick={this.deleteAllAreas}>
                      Yes, Delete all areas
                    </Button>
                  </Modal.Footer>
                </Modal>
            </div>
        );
    }
}