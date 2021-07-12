import React,{useState} from 'react';
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
  import md5 from 'md5'
  import firebase from '../../firebase'
  import ParticlesBg from "particles-bg";

const Register = () => {

    const initialState = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }

      const [registerUserState, setRegisterUserState] = useState(initialState)
      const [errors, setErrors] = useState([])
      const [status, setStatus] = useState('')
      const [userRef] = useState(firebase.database().ref('/users'))
      const handleChange = event => {
        
        setRegisterUserState({
            ...registerUserState,
            [event.target.name]: event.target.value,
          })
      
      }

      const formIsValid = () => {
        let errors = []
        let error
        if (isFormEmpty(registerUserState)) {
          error = { message: 'Please fill in all the fields' }
          setErrors(errors.concat(error))
          return false
        } else if (!isPasswordValid(registerUserState)) {
          error = { message: 'Password is invalid' }
          setErrors(errors.concat(error))
          return false
        } else {
          return true
        }
      }
    
      const isFormEmpty = ({ userName, email, password, confirmPassword }) => {
        return !userName || !email || !password || !confirmPassword
      }
    
      const isPasswordValid = ({ password, confirmPassword }) => {
        if (password.length < 6 || confirmPassword.length < 6) {
          return false
        } else if (password !== confirmPassword) {
          return false
        } else {
          return true
        }
      }

      const handleInputError = (errors, inputName) => {
        return errors.some(err =>
          err.message.toLowerCase().includes(inputName.toLowerCase())
        )
          ? 'error'
          : ''
      }


      const onSubmit = async event => {
        event.preventDefault()
    if (formIsValid()) {
      const { email, password } = registerUserState
      const errors = []
      setErrors(errors)
      setStatus('PENDING')
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)

        try {
          await createdUser.user.updateProfile({
            displayName: userName,
            photoURL: `https://www.gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`,
          })
          await saveUser(createdUser)
          setStatus('RESOLVED')
          console.log(createdUser);
        } catch (err) {
          setStatus('RESOLVED')
          setErrors(errors.concat({ message: err.message }))
        }
      } catch (err) {
        setStatus('RESOLVED')
        setErrors(errors.concat({ message: err.message }))
      }
    }
      }

      const saveUser = createdUser =>
    userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      photoUrl: createdUser.user.photoURL,
    })


      const { userName, email, password, confirmPassword } = registerUserState

    return (
      <>
      <ParticlesBg type="color" bg={true}/>
        <Grid textAlign="center" verticalAlign="middle" className="log-reg-screen register-form-grid">
      <Grid.Column style={{ maxWidth: 450 }}>
      <Icon name="rocketchat" color="teal" size="massive"/>
        <Header as="h2" color="teal" textAlign="center">
          
          Register for Chatify
        </Header>
        <Form size="large" onSubmit={onSubmit} >
          <Segment stacked>
            <Form.Input
              fluid
              type="text"
              name="userName"
              icon="user"
              iconPosition="left"
              placeholder="User Name"
              value={userName}
              onChange={handleChange}
              className={handleInputError(errors, 'userName')}
            />
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
            <Form.Input
              fluid
              type="password"
              name="confirmPassword"
              icon="redo"
              iconPosition="left"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className={handleInputError(errors, 'password')}
            />
            <Button
              disabled={status === 'PENDING'}
              className={status === 'PENDING' ? 'loading' : ''}
              type="submit"
              fluid
              color="teal"
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
          Already have an account? <Link to="/login">Login</Link>{' '}
        </Message>
      </Grid.Column>
    </Grid> 
    </>
    )
}

export default Register;