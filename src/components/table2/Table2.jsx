import { Space, Table, Tag } from 'antd';
import { deleteData, getData, putData } from '../../services';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchDatabase } from '../body/bodySlide';
import { ShowErrorToast, ShowInfoToast, ShowSuccessToast } from '../../hooks/toast/Tost';
import Confirm from '../confirm/Confirm';
const { Column, ColumnGroup } = Table;

const Table2 = () => {
  const [name , setName] = useState('')
  const [togle, setTogle] = useState(true);
  const [confirm , setConfirm] = useState(false)
  const [ttdl , setTtdl] = useState('')
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
    if (change == '' || change==null) {
      ShowInfoToast("Không được để trống")
    } else {
      getData(`http://localhost:3000/database/${id}`).then((data) => {
        let obj = {
          ...data,
          name: change,
        };
        putData(`http://localhost:3000/database/${id}`, obj);
        setTogle(!togle);
        ShowSuccessToast(`Tên đã thay đổi thành ${change} `)
      });
    }
  }
  function delete1() {
    deleteData(`http://localhost:3000/database/${ttdl.id}`);
    setTogle(!togle);
    setConfirm(false)
    ShowErrorToast(`Xóa thành công ${ttdl.name}`)
  }
  function updatedate(id) {
    let change = prompt('Nhập số ngày');
    if (change == ''|| change==null) {
      alert('Không được để trống');
    } else {
      getData(`http://localhost:3000/database/${id}`).then((data) => {
        let obj = {
          ...data,
          endDate: change,
        };
        putData(`http://localhost:3000/database/${id}`, obj);
        setTogle(!togle);
        ShowSuccessToast(`Cập nhật ngày thành công từ ${data.endDate} --> ${change} ngày`)
      });
    }
  }
  function tblo(id, name) {
    setName(name)
    let obj = {
      id,
      name
    }
    setTtdl(obj)
    setConfirm(true)
  }

  return (<>
    <Table dataSource={listSearch}>
      <Column title="Name" dataIndex="name" key="lastName" />
      <Column title="Status" dataIndex="status" key="age" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <a onClick={() => update1(record.id)}>Update Name</a>

            <a onClick={() => updatedate(record.id)}>Update ReturnDate</a>
            <a onClick={() =>tblo(record.id , record.name)}>Delete</a>
          </Space>
        )}
      />
      <Column title="EndDate" dataIndex="endDate" key="endDate" />
    </Table>
    <div style={confirm == true ? {}: {display:"none"}}>
      <Confirm onCancel={setConfirm} onConfirm={delete1} onName={name} ></Confirm>
    </div>
    
    </>
  );
};

export default Table2;
