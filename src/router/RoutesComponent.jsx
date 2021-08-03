import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {useSelector} from "react-redux";
import paths from "./paths";
import Routes from "./routes";
import SignedInnerPage from "../components/signed/InnerPage/SignedInnerPage";
import UnsignedInnerPage from "../components/unsigned/InnerPage/UnsignedInnerPage";

const MainRouterComponent = () => {
  const isLogged = useSelector(state => state?.auth?.user?.id);

  const PrivateRoute = ({children, ...rest}) => {
    return (
      <Route
        {...rest}
        render={({location}) =>
          isLogged ? (
            <SignedInnerPage>
              {children}
            </SignedInnerPage>
          ) : (
            <Redirect
              to={{
                pathname: paths.login,
                state: {from: location}
              }}
            />
          )
        }
      />
    )
  };

  const UnauthorizedRoute = ({children, ...rest}) => {
    return (
      <Route
        {...rest}
        render={({location}) =>
          !isLogged ? (
            <UnsignedInnerPage>
              {children}
            </UnsignedInnerPage>
          ) : (
            <Redirect
              to={{
                pathname: paths.home,
                state: {from: location}
              }}
            />
          )
        }
      />
    )
  };

  return (
    <>
      <Router>
        <Switch>
          {Routes.map(({isPrivate, unauthorized, component, path}) => {
            return isPrivate ?
              (
                <PrivateRoute
                  path={path}
                  exact={true}
                  key={path}
                >
                  {component()}
                </PrivateRoute>
              ) :
              unauthorized ?
                (
                  <UnauthorizedRoute
                    path={path}
                    exact={true}
                    key={path}
                  >
                    {component()}
                  </UnauthorizedRoute>
                )
                :
                (
                  <Route
                    path={path}
                    component={component}
                    exact={true}
                    key={path}
                  />
                );
          })}
          <Route component={() => <h1>Page not found</h1>}/>
        </Switch>
      </Router>
    </>
  );
};

export default MainRouterComponent;
