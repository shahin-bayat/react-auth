import React, { Fragment, useEffect } from 'react'
import './App.scss'
import Navbar from './components/layout/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home'
import Login from './components/auth/login'
import Products from './components/pages/Products'
import Product from './components/pages/Product'

import ProductState from './context/product/ProductState'
import AuthState from './context/auth/AuthState'
import PrivateRoute from './components/routing/PrivateRoute'
import setGlobalToken from './utils/setGlobalToken'
import LanguageWrapper from './context/language/LanguageWrapper'

import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'

// to set global token header for all requests

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setGlobalToken(localStorage.token)
    }
  }, [window.location.href])
  return (
    <LanguageWrapper>
      <AuthState>
        <ProductState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/login' component={Login} />
                  <PrivateRoute exact path='/products' component={Products} />
                  <Route
                    exact
                    path='/products/:productId'
                    component={Product}
                  />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </ProductState>
      </AuthState>
    </LanguageWrapper>
  )
}

export default App
