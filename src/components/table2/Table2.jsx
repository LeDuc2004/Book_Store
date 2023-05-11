import { Space, Table, Tag } from 'antd';
import { deleteData, getData, putData } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchDatabase } from '../body/bodySlide';
const { Column, ColumnGroup } = Table;

const Table2 = () => {
  const [togle, setTogle] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDatabase());
  }, [togle]);
  let listSearch = useSelector((state) => {
    let product = state.listSp.database.slice().map((item) => {
      if (item.status == false) {
        return { ...item, status: 'Đang mượn' };
      } else if (item.status == true) {
        return { ...item, status: 'Chưa mượn' };
      }
    });

    return product;
  });

  function update1(id) {
    let change = prompt('Nhập tên mới');
    if (change == '') {
      alert('Không được để trống');
    } else {
      getData(`http://localhost:3000/database/${id}`).then((data) => {
        let obj = {
          ...data,
          name: change,
        };
        putData(`http://localhost:3000/database/${id}`, obj);
        setTogle(!togle);
      });
    }
  }
  function delete1(id) {
    deleteData(`http://localhost:3000/database/${id}`);
    setTogle(!togle);
  }

  return (
    <Table dataSource={listSearch}>
      <Column title="Name" dataIndex="name" key="lastName" />
      <Column title="Status" dataIndex="status" key="age" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <a onClick={() => update1(record.id)}>Update</a>
            <a onClick={() => delete1(record.id)}>Delete</a>
          </Space>
        )}
      />
    </Table>
  );
};

export default Table2;
