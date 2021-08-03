import './myProductsPage.scss';
import {Button, Form, Input, Spin, Table} from "antd";
import Modal from "antd/es/modal/Modal";
import {useCallback, useEffect, useState} from "react";
import InputItem from "../../ReusableComponents/InputItem/InputItem";
import {useDispatch, useSelector} from "react-redux";
import {
  addProductAction,
  getMyProductsListAction
} from "../../../store/actions/productsActions";
import {defaultProductTableColumns} from "../../../constants/product.contants";

const MyProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const {myProductsList, isLoading} = products;
  const [addNewProductModalIsOpen, setNewProductModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if(!myProductsList?.length) {
      dispatch(getMyProductsListAction({}));
    }
  }, []);

  const handleAddNewProduct = useCallback(async (values) => {
    const added = await dispatch(addProductAction(values)).unwrap();
    if (added) {
      form.resetFields();
      setNewProductModal(false)
    }
  }, [])

  return (
    <div className={'my_products_main_page'}>
      {isLoading && <Spin/>}
      <Button onClick={() => setNewProductModal(true)} className={'add_product_btn'}>Create new product</Button>

      <Table dataSource={myProductsList} columns={defaultProductTableColumns} pagination={false}/>

      <Modal visible={addNewProductModalIsOpen} onCancel={() => setNewProductModal(false)} footer={null}>
        <Form onFinish={handleAddNewProduct} layout={"vertical"} form={form}>
          <InputItem name={'name'} required={true}/>
          <InputItem name={'description'} required={true}/>
          <InputItem name={'category'} required={true}/>
          <InputItem name={'price'} required={true} type={'number'}/>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      </Modal>
    </div>
  )
};

export default MyProductsPage;
