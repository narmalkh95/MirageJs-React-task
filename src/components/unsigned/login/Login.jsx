import {Button, Form} from "antd";
import './login.scss';
import InputItem from "../../ReusableComponents/InputItem/InputItem";
import paths from "../../../router/paths";
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {getUserAction} from "../../../store/actions/authActions";
import {useCallback} from "react";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = useCallback(async (values) => {

    const isLogged = await dispatch(getUserAction(values)).unwrap();

    if (isLogged) {
      history.push(paths.home);
    }
  }, []);

  return (
    <div className={'login_page'}>
      <p className={'title'}>Login</p>
      <div className={'form_div'}>
        <Form layout="vertical" onFinish={onFinish}>
          <InputItem name={'email'} required={true} type={'email'}/>
          <InputItem name={'password'} required={true} type={'password'}/>

          <Button type="primary" htmlType="submit">
            Sign In
          </Button>

        </Form>
        <span className={'navigate_text'}>Dont have an account yet? <b onClick={() => history.push(paths.registration)}>Sign Up</b></span>
      </div>
    </div>
  )
};

export default Login;
