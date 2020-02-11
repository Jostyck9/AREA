import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/site.css';
import Microsoft from '../../images/microsoft_logo.png'
import Google from '../../images/google_logo.png'
import Twitter from '../../images/twitter_logo.png'
import { Button, Form } from 'react-bootstrap'

export default function Registration() {
    return (
        <table width="100%" height="100%" border="0">
            <tr height="100%">
                <td width="25%"></td>
                <td width="50%">
                <Form className="text-center">
                    <h1>Registration</h1><br/>
                    <Form.Group controlId="formBasicEmail">
                        Email address <Form.Control className='text-center' type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                         Username <Form.Control className='text-center' type="text" placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                         Password <Form.Control className='text-center' type="password" placeholder="Password" />
                        <Form.Text className="text-muted">Must be 8-20 characters long..</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        Password confirmation <Form.Control className='text-center' type="password" placeholder="Confirmed Password" />
                    </Form.Group>
                    <Button variant="secondary" size="lg" active>Register</Button><br/>
                    <br/><Button variant="secondary" size="lg" className="divider" active>
                        <img src={Microsoft} height="30" width="30" alt="Microsoft"/>|Microsoft
                    </Button>
                    <Button variant="secondary" size="lg" className="divider" active>
                        <img src={Google} height="30" width="30" alt="Google"/>|Google
                    </Button>
                    <Button variant="secondary" size="lg" className="divider" active>
                        <img src={Twitter} height="30" width="30" alt="Twitter"/>|Twitter
                    </Button>
                    </Form>
                </td>
                <td width="25%"></td>
            </tr>
        </table>
    );
}