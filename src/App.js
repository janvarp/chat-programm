import './App.css';
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'react-bootstrap';
import { usePocket } from 'pocketbase';

const ChatApp = () => {
  const pocket = usePocket();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await pocket.auth.login(username, password);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await pocket.auth.register(username, password);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoggedIn) {
    return (
      <Container>
        <Row>
          <Col xs="12">
            <h1>Welcome to the Chat App!</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <p>Start chatting with your friends in real-time!</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col xs="12">
          <h1>Login or Register</h1>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          {error && <p className="text-danger">{error}</p>}
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button onClick={handleLogin}>Login</Button>{' '}
            <Button onClick={handleRegister}>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatApp;
