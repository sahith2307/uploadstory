import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'

import LoginForm from './components/login'
import MainPage from './components/maniPage'
import ProtectedRoute from './components/protectedRoute'
import NotFound from './components/notFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={MainPage} />
      <Route path="/bad-path" component={NotFound} />
      <Redirect to="/bad-path" />
    </Switch>
  </BrowserRouter>
)

export default App
