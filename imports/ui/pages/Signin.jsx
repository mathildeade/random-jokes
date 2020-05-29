import {Meteor} from './node_modules/meteor/meteor';

import React, { Component } from 'react';
import {toast} from './node_modules/react-toastify';
import {Link} from './node_modules/react-router-dom';

import Container from './node_modules/react-bootstrap/Container';
import Form from './node_modules/react-bootstrap/Form';
import Button from './node_modules/react-bootstrap/Button';

class Signin extends Component {
    state={
        email:"",
        password:"",
    };
    handleSubmit = (event) => {
        event.preventDefault();
           
            if (this.state.email === ""){
                toast.error("Votre email n'est pas renseigné");
                return; 
            }
    
            if (this.state.password === ""){
                toast.error("Votre mot de passe n'est pas renseigné");  
                return; 
            }
    
            Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
                if (error) {
                    toast.error(error.reason);
                } else {
                    this.props.history.push('/room');
                }

            });
        };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render(){
    return (
        <Container>
        <Form onSubmit={this.handleSubmit}>
            <Form.Control 
            type="email" 
            name="email" 
            onChange={this.handleChange}
            value={this.state.email}
            placeholder="entrez votre email"
            />
            <Form.Control
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            placeholder="entrez votre mot de passe"
            />
            <Button variant="primary" type="submit">Connexion</Button>
            <button variant="secondary" as={Link} to="/signup">
                Je n'ai pas de compte
            </button>

        </Form>
        </Container>
    );
    }
};

export default Signin;