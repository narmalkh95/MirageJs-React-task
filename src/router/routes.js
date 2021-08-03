import paths from "./paths";
import Registration from "../components/unsigned/registration/Registration";
import Login from "../components/unsigned/login/Login";
import HomePage from "../components/signed/HomePage/HomePage";
import MyProductsPage from "../components/signed/MyProductsPage/MyProductsPage";

const Routes = [
    {
        path: paths.home,
        isPrivate: true,
        component: () => <HomePage/>
    },
    {
        path: paths.products,
        isPrivate: true,
        component: () => <MyProductsPage/>
    },
    {
        path: paths.registration,
        unauthorized: true,
        component: () => <Registration/>
    },

    {
        path: paths.login,
        unauthorized: true,
        component: () => <Login/>
    }
];

export default Routes;
