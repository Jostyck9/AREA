import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import { Button, Form } from 'react-bootstrap'
import GitHub from '../../images/github_logo.png'
import io from 'socket.io-client'
const socket = io(process.env.REACT_APP_SERVER_AUTH)

export default class LogIn extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email : '',
            password: ''
        };
        this.popup = null
    }

    onSuccessTwitter(response) {
        response.json().then(body => {
          alert(JSON.stringify(body));
        });
    }
    
    onFailedTwitter(error) {
        alert(error);
    }
    
    componentDidMount() {
        socket.on('user', user => {
          this.popup.close()
          this.setState({user})
        })
      }
    
    checkPopup() {
    const check = setInterval(() => {
            const { popup } = this
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
            // this.setState({ disabled: ''})
            } else {
                popup.location.href.includes(process.env.REACT_APP_SERVER_AUTH + '/auth/github/callback')
                var content = popup.document.body.innerHTML
//                let content = popup.document.getElementById("token")
                // popup.close()
                alert(content)
                clearInterval(check)
            }
        }, 1000)
    }

    openPopup() {
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        
        const url = process.env.REACT_APP_SERVER_AUTH + '/auth/github'
    
        return window.open(url, '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, 
        scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
        height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth = () => {
        // if (!this.state.disabled) {  
        this.popup = this.openPopup()  
        this.checkPopup()
        // this.setState({disabled: 'disabled'})
        // }
    }

    closeCard() {
        this.setState({user: {}})
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
        fetch(process.env.REACT_APP_SERVER_URI + '/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.status >= 200 && res.status <= 204) {
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
                        <br/><Button variant="secondary" size="lg" className="divider" onClick={this.startAuth}>
                            <img src={GitHub} height="30" width="30" alt="GitHub" />    Github
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