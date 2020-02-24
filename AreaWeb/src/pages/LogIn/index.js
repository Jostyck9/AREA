import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import { Button, Form } from 'react-bootstrap'
import Microsoft from '../../images/microsoft_logo.png'
import Twitter from '../../images/twitter_logo.png'

export default class LogIn extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
        email : '',
        password: ''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
        [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        fetch('http://10.29.124.139:8081/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        alert(data.token)
                        // global.token = data.token
                        // global.signed = true
                        localStorage.setItem('currentUser', JSON.stringify(data.token))
                        this.props.history.push('/');
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
    }

    render () {


        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="25%"></td>
                    <td width="50%">
                    <Form className="text-center" onSubmit={this.onSubmit}>
                        <h1>Log In</h1><br/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className='text-center' type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className='text-center' type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required/>
                        </Form.Group>
                        <Button variant="secondary" size="lg" active type="submit" value="Submit">Log In</Button><br/>
                    </Form>
                    <div class="text-center">
                        <br /><Button variant="secondary" size="lg" className="divider" active>
                            <img src={Microsoft} height="30" width="30" alt="Microsoft" />|Microsoft
                        </Button>
                        <Button variant="secondary" size="lg" className="divider" active>
                            <img src={Twitter} height="30" width="30" alt="Twitter" />|Twitter
                        </Button><br/>
                        <br/><p>No account ? <a href='registration'>Create a new account.</a></p>
                    </div>
                    </td>
                    <td width="25%"></td>
                </tr>
            </table>
        );
    }
}