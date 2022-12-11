import React,{useEffect, lazy,Suspense} from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
// import './App.scss';

import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import {connect} from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import { GlobalStyle } from './global.styles';

//making lazy request for slicing code means loading as needed
const HomePage=lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage=lazy(() => import('./pages/shop/shop.component'));

const App =({checkUserSession,currentUser})=>{

  useEffect(()=>{
    checkUserSession()
  },[checkUserSession]);

    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<div>... Loading</div>}>
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
            </Suspense>
          </ErrorBoundary>
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=>currentUser? (<Redirect to='/' />): (<SignInAndSignUpPage />)}  />
          
        </Switch>
      </div>
  
    );
  
}

const mapStateToProps=createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps=dispatch=>({
  checkUserSession: ()=> dispatch(checkUserSession())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
