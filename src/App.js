import RoutesComponent from "./router/RoutesComponent";
import React, {useEffect} from "react";
import {getUserAction} from "./store/actions/authActions";
import {useDispatch} from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      dispatch(getUserAction({token: authToken}));
    }
  }, []);

  return <RoutesComponent/>
};

export default App;
