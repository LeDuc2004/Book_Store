import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'tk',
    key: 'name',
    render: (text) => <a>{text}</a>
  },
  {
    title: 'Sách đang mượn',
    key: 'tags',
    dataIndex: 'borrow',
    render: (_, { borrow }) => (
      <>
        {borrow.map((tag) => {
          let color = tag.name.length > 10 ? 'green' : 'geekblue';
          return (
            <Tag color={color} key={tag}>
              {tag.name.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Sách đã Trả',
    key: 'tags',
    dataIndex: 'borrow',
    render: (_, { borrow }) => (
      <>
        {borrow.map((tag) => {
          let color = 'volcano';
          return (
            <Tag color={color} key={tag}>
              {tag.name.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Tổng',
    dataIndex: 'borrow',
    render: (borrow) => <h2 style={{color:"tomato"}}>{borrow.length}</h2>
  },
  {
    title: 'Tổng',
    dataIndex: 'borrow',
    render: (borrow) => <h2 style={{color:"tomato"}}>{borrow.length}</h2>
  }
  
  
];


const Table1 = (data1) => {
    console.log(data1.data);
  return(

<Table columns={columns} dataSource={data1.data} />
  )  
}
export default Table1;