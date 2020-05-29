import {Accounts} from './node_modules/meteor/accounts-base';

import React, { Component } from 'react';
import { toast } from './node_modules/react-toastify'; 
import { Link } from './node_modules/react-router-dom';

import Container  from './node_modules/react-bootstrap/Container';
import Form       from './node_modules/react-bootstrap/Form';
import Button     from './node_modules/react-bootstrap/Button';

class Signup extends Component {
    state = {
        email: "",
        username: "",
        password: "",
        verifyPassword: "",
    };

    handleSubmit = (event) => {
        event.preventDefault();
       
        if (this.state.email === ""){
            toast.error("Votre email n'est pas renseigné");
            return; 
        }
        if (this.state.username === this.state.verifyPassword){
            toast.error("La vérification ne correspond pas"); 
            return; 
        }

        if (this.state.password === ""){
            toast.error("Votre mot de passe n'est pas renseigné");  
            return; 
        }

        if (this.state.password !== this.state.verifyPassword){
            toast.error("Votre mot de passe ne correspond pas"); 
            return; 
        }

        Accounts.createUser({
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        }, (error, result) => {
            if (error) {
                toast.error(error.reason);
            } else {
                this.props.history.push('/room');
            }
        });
    }

    handleChange = () => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Control
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        placeholder="votre email"
                    />
                    <Form.Control
                        type="text"
                        name="username"
                        onChange={this.handleChange}
                        value={this.state.username}
                        placeholder="votre nom d'utilisateur"
                    />
                    <Form.Control
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        placeholder="votre mot de passe"
                    />
                    <Form.Control
                        type="password"
                        name="verifyPassword"
                        onChange={this.handleChange}
                        value={this.state.verifyPassword}
                        placeholder="vérifiez votre mot de passe"
                    />
                    <Button variant="primary" type="submit">Inscription</Button>
                    <Button variant="secondary" as={Link} to="/signin">
                        J'ai déja un compte
                    </Button>  
                </Form>
            </Container>
        ) ;
    };
};

export default Signup;



