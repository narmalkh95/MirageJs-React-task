import './myProductsPage.scss';
import {Button, Form, Table} from "antd";
import Modal from "antd/es/modal/Modal";
import {useCallback, useEffect, useState} from "react";
import InputItem from "../../ReusableComponents/InputItem/InputItem";
import {useDispatch, useSelector} from "react-redux";
import {
  addProductAction,
  getMyProductsListAction
} from "../../../store/actions/productsActions";
import {productTableColumns} from "../../../constants/product.constants";

const MyProductsPage = () => {
  const dispatch = useDispatch();
  const myProductsList = useSelector(state => state.products.myProductsList);
  const [addNewProductModalIsOpen, setNewProductModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getMyProductsListAction({}));
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
      <Button onClick={() => setNewProductModal(true)} className={'add_product_btn'}>Create new product</Button>

      <Table dataSource={myProductsList} columns={productTableColumns} pagination={false} rowKey="id"/>

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
