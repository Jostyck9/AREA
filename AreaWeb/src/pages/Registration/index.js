import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import { Button, Form } from 'react-bootstrap'
import Microsoft from '../../images/microsoft_logo.png'
import Twitter from '../../images/twitter_logo.png'

export default class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmpassword: '',

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
        const { email, username, password, confirmpassword } = this.state;
        if (password !== confirmpassword)
        alert("Passwords don't match");
        else {
            alert(process.env.REACT_APP_SERVER_URI)
            fetch(process.env.REACT_APP_SERVER_URI + '/auth/register', {
                method: 'POST',
                body: JSON.stringify({ name: username, email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        alert(data.token)
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
    }

    render() {
        return (
            <table width="100%" height="100%" border="0">
                <tr height="100%">
                    <td width="25%"></td>
                    <td width="50%">
                        <Form className="text-center" onSubmit={this.onSubmit}>
                            <h1>Registration</h1><br />
                            <Form.Group controlId="formBasicEmail">
                                Email address <Form.Control className='text-center' type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleInputChange} required />
                                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formUsername">
                                Username <Form.Control className='text-center' type="text" name="username" placeholder="Enter Username" value={this.state.username} onChange={this.handleInputChange} required />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                Password <Form.Control className='text-center' type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required />
                                <Form.Text className="text-muted">Must be 8-20 characters long..</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword">
                                Password confirmation <Form.Control className='text-center' type="password" name="confirmpassword" placeholder="Confirmed Password" value={this.state.confirmpassword} onChange={this.handleInputChange} required />
                            </Form.Group>
                            <Button variant="secondary" size="lg" active type="submit" value="Submit">Register</Button><br />
                        </Form>
                        <div class="text-center">
                            <br /><Button variant="secondary" size="lg" className="divider" active>
                                <img src={Microsoft} height="30" width="30" alt="Microsoft" />|Microsoft
                            </Button>
                            <Button variant="secondary" size="lg" className="divider" active>
                                <img src={Twitter} height="30" width="30" alt="Twitter" />|Twitter
                            </Button><br/>
                        </div>
                    </td>
                    <td width="25%"></td>
                </tr>
            </table>
        );
    }
}