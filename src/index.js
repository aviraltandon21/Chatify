import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import firebase from './firebase'
import Spinner from './components/Spinner'
import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  withRouter,
} from 'react-router-dom'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import 'semantic-ui-css/semantic.min.css';
import store from './store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from './store/auth/actions'

const Root = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.user.isLoading)


  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user))
        history.push('/')
      } else {
        history.replace('/register')
        dispatch(clearUser())
      }
    })
  }, [history,dispatch])


  return isLoading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  )
}
const RootWithRouter = withRouter(Root)
ReactDOM.render(
  
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
  <RootWithRouter />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
