import './unsignedInnerPage.scss';
import Navbar from "../../ReusableComponents/navbar/Navbar";
import {useSelector} from "react-redux";
import {Spin} from "antd";

const UnsignedInnerPage = ({children}) => {
  const {isLoading} = useSelector(state => state.auth);

  return (
    <div className={'unsigned_inner_page'}>
      {isLoading && <Spin/>}
      <Navbar/>
      {children}
    </div>
  )
};

export default UnsignedInnerPage;
