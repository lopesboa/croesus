import 'bulma/css/bulma.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Balance from './components/Balance/Balance';
import ExpenseList from './components/ExpenseList/ExpenseList';
import Groups from './components/Groups/Groups';
import LiLinkRoute from './components/LiLinkRoute/LiLinkRoute';
import Login from './components/Login/Login';
import NavBar from './components/NavBar/NavBar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SignUp from './components/SignUp/SignUp';
import { AuthContext } from './contexts/authentication';
import useIsMobile from './hooks/useIsMobile';
import useLocalStorage from './hooks/useLocalStorage';
import useUserState from './hooks/useUserState';
import LOCAL_STORAGE_KEYS from './localStorageKeys.json';
import NAVIGATION from './navigation.json';

toast.configure();

function App() {
  const isMobile = useIsMobile();
  const [authToken, setAuthToken] = useLocalStorage(LOCAL_STORAGE_KEYS.token);
  const [user, setUser] = useUserState();

  const setToken = (token, newUser) => {
    setAuthToken(token);
    setUser(newUser);
  };

  const logOut = () => {
    setAuthToken();
    setUser();
  };

  return (
    <AuthContext.Provider value={{
      authToken, setAuthToken: setToken, logOut, user,
    }}
    >
      <Router>
        <div className="has-navbar-fixed-bottom has-background-white-ter is-full-height has-overflow-scroll">
          <header className="hero" style={{ backgroundColor: '#FFFFFF' }}>
            <NavBar isAuthenticated={!!authToken} />
            {authToken && (
            <nav
              className={isMobile
                ? 'is-fixed-bottom tabs is-fullwidth navbar has-background-white has-shadow'
                : 'tabs is-fullwidth navbar has-background-white has-shadow'}
            >
              <ul>
                <LiLinkRoute to={NAVIGATION.EXPENSES} fontAwesomeClassName="fa-credit-card" label="Dépenses" />
                <LiLinkRoute to={NAVIGATION.BALANCE} fontAwesomeClassName="fa-balance-scale" label="Équilibres" />
              </ul>
            </nav>
            )}
          </header>
          <ToastContainer />
          <Switch>
            <>
              <section className="mx-5 my-3 columns is-centered is-narrow">
                <div className="column">
                  <Route exact path={NAVIGATION.LOGIN}>
                    <Login />
                  </Route>
                  <Route exact path={NAVIGATION.SIGNUP}>
                    <SignUp />
                  </Route>
                  <PrivateRoute exact path={NAVIGATION.EXPENSES}>
                    <ExpenseList />
                  </PrivateRoute>
                  <PrivateRoute exact path={NAVIGATION.BALANCE}>
                    <Balance />
                  </PrivateRoute>
                  <PrivateRoute exact path={NAVIGATION.GROUPS}>
                    <Groups />
                  </PrivateRoute>
                </div>
              </section>
            </>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
