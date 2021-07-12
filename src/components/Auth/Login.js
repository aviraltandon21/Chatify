import React from 'react'
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import ParticlesBg from "particles-bg";

export default function Login() {
  const initialState = {
    email: '',
    password: '',
  }

  const [loginUserState, setRegisterUserState] = React.useState(initialState)
  const [errors, setErrors] = React.useState([])
  const [status, setStatus] = React.useState('')

  const handleChange = event => {
    setRegisterUserState({
      ...loginUserState,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = async event => {
    event.preventDefault()
    const errors = []
    if (formIsValid(loginUserState)) {
      const { email, password } = loginUserState
      setErrors(errors)
      setStatus('PENDING')

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        setStatus('RESOLVED')
        console.log("logineddd")
        
      } catch (err) {
        setStatus('RESOLVED')
        setErrors(errors.concat({ message: err.message }))
      }
    } else {
      let error = { message: 'Please fill the form' }
      setErrors(errors.concat(error))
    }
  }

  const formIsValid = ({ email, password }) => {
    return email && password
  }

  const handleInputError = (errors, inputName) => {
    return errors.some(err =>
      err.message.toLowerCase().includes(inputName.toLowerCase())
    )
      ? 'error'
      : ''
  }

  const { email, password } = loginUserState

  return (
    <>
    <ParticlesBg type="square" bg={true}/>
    <Grid textAlign="center" verticalAlign="middle" className="log-reg-screen login-form-grid">
      <Grid.Column style={{ maxWidth: 450 }}>
      <Icon name="user icon" color="violet" size='huge'/>
        <Header as="h2" color="violet" textAlign="center">
          
          Login for Chatify
        </Header>
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              type="email"
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className={handleInputError(errors, 'email')}
            />
            <Form.Input
              fluid
              type="password"
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className={handleInputError(errors, 'password')}
            />
            <Button
              disabled={status === 'PENDING'}
              className={status === 'PENDING' ? 'loading' : ''}
              type="submit"
              fluid
              color="violet"
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>
        {errors.length > 0 &&
          errors.map((err, i) => (
            <Message error key={i}>
              <p>{err.message}</p>
            </Message>
          ))}
        <Message>
          Don't have an account? <Link to="/register">Register</Link>{' '}
        </Message>
      </Grid.Column>
    </Grid>
    </>
  )
          }