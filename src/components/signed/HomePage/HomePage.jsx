import './homePage.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllProductsListAction} from "../../../store/actions/productsActions";
import {Table} from "antd";
import {productTableColumns} from "../../../constants/product.constants";

const HomePage = () => {
  const productsList = useSelector(state => state.products.list)
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getAllProductsListAction({}));
  }, [])

  return (
    <div className={'home-page_main_div'}>
      <p>All Products List</p>

      <Table dataSource={productsList} columns={productTableColumns} pagination={false} rowKey="id" />
    </div>
  )
};

export default HomePage;
