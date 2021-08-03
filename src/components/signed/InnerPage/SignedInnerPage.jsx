import Navbar from "../../ReusableComponents/navbar/Navbar";

const SignedInnerPage = ({children}) => {
  return (
    <div>
    <Navbar/>
      {children}
    </div>
  )
};

export default SignedInnerPage;
