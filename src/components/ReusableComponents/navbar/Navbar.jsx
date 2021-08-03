import './navbar.scss';
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import paths from "../../../router/paths";
import {Button} from "antd";
import {logoutUserAction} from "../../../store/actions/authActions";
import {useCallback} from "react";

const Navbar = () => {
  const {id, email} = useSelector(state => state?.auth?.user);
  const isLogged = !!id;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutClick = useCallback(async () => {
    const unsigned = await dispatch(logoutUserAction({}));
    if (unsigned) {
      history.push(paths.login)
    }
  }, []);

  return (
    <div className={'nav_bar'}>
      {!!isLogged && (
        <>
          <Link to={paths.home}>Products</Link>
          <Link to={paths.products}>My Products</Link>
        </>
      )}
      <div className={'right_side'}>
        {isLogged ?
          <>
            <span>Hi {email}</span>
            <Button onClick={handleLogoutClick}>Logout</Button>
          </>
          :
          <>
            <Link to={paths.login}>Login</Link>
            <Link to={paths.registration}>Registration</Link>
          </>
        }
      </div>
    </div>
  )
};

export default Navbar;
