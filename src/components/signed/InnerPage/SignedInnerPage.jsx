import Navbar from "../../ReusableComponents/navbar/Navbar";
import {useSelector} from "react-redux";
import {Spin} from "antd";

const SignedInnerPage = ({children}) => {
  const isLoading = useSelector(state => state.isLoading);

  return (
    <div>
      {!!isLoading && <Spin/>}
      <Navbar/>
      {children}
    </div>
  )
};

export default SignedInnerPage;
