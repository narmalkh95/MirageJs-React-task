import './homePage.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllProductsListAction} from "../../../store/actions/productsActions";
import {Spin, Table} from "antd";
import {defaultProductTableColumns} from "../../../constants/product.contants";

const HomePage = () => {
  const products = useSelector(state => state.products)
  const {list: productsList, isLoading} = products
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productsList?.length) {
      dispatch(getAllProductsListAction({}));
    }
  }, [])

  return (
    <div className={'home-page_main_div'}>
      {isLoading && <Spin/>}
      <p>All Products List</p>

      <Table dataSource={productsList} columns={defaultProductTableColumns} pagination={false}/>
    </div>
  )
};

export default HomePage;
