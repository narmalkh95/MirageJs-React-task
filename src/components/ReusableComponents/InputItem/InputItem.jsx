import {Form, Input, InputNumber} from "antd";

const passwordRegexpToValidate = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");

const InputItem = ({name, label = '', required, type}) => {
  const rules = [];

  const validatePassword = (rule, value) => {
    if (value && !passwordRegexpToValidate.test(value)) {
      return Promise.reject('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!')
    }
    return Promise.resolve();
  }

  if (required) {
    rules.push(
      {
        required: true,
        message: `Please input ${name}!`,
      })
  }

  if (type === 'email') {
    rules.push({
      type: 'email',
      message: 'Please input valid email!'
    })
  } else if (type === 'password') {
    rules.push({validator: validatePassword},)
  }

  return (
    <Form.Item
      label={label || name}
      name={name}
      rules={rules}
    >
      {type === 'password' ? <Input.Password/> : type === 'number' ? <InputNumber/> : <Input/>}
    </Form.Item>
  )
};

export default InputItem;
