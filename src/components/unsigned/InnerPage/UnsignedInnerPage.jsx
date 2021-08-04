import './unsignedInnerPage.scss';
import Navbar from "../../ReusableComponents/navbar/Navbar";
import {useSelector} from "react-redux";
import {Spin} from "antd";

const UnsignedInnerPage = ({children}) => {
  const isLoading = useSelector(state => state.isLoading);

  return (
    <div className={'unsigned_inner_page'}>
      {!!isLoading && <Spin/>}
      <Navbar/>
      <p className={'center'}>Login to access products or create one</p>
      {children}
    </div>
  )
};

export default UnsignedInnerPage;
