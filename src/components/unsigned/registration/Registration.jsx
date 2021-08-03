import {Button, Form, Input} from "antd";
import './registration.scss';
import InputItem from "../../ReusableComponents/InputItem/InputItem";
import paths from "../../../router/paths";
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {registerUserAction} from "../../../store/actions/authActions";
import {messageType, showMessage} from "../../../services/utilities";

const Registration = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    const isRegistered = await dispatch(registerUserAction(values)).unwrap();

    if (isRegistered) {
      showMessage(messageType.success, 'You have registered successfully. Now please login!');
      history.push(paths.login);
    }
  };

  return (
    <div className={'registration_page'}>
      <p className={'title'}>Registration</p>
      <div className={'form_div'}>
        <Form layout="vertical" onFinish={onFinish}>
          <InputItem name={'fullName'} label={'Full Name'} required={true}/>
          <InputItem name={'email'} required={true} type={'email'}/>
          <InputItem name={'password'} required={true} type={'password'}/>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form>

        <span className={'navigate_text'}>Have an account with us? <b
          onClick={() => history.push(paths.login)}>Sign In</b></span>
      </div>
    </div>
  )
};

export default Registration;
