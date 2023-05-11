import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Name',
    dataIndex: 'tk',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Sách đang mượn',
    key: 'tags',
    dataIndex: 'borrow',
    render: (_, { borrow }) => (
      <>
        {borrow.length == 0 ? (
          <h2 style={{ color: 'tomato' }}>0</h2>
        ) : (
          borrow.map((tag) => {
            let color = 'volcano';
            return (
              <Tag color={color} key={tag}>
                {tag.name.toUpperCase()}
              </Tag>
            );
          })
        )}
      </>
    ),
  },
  {
    title: 'Tổng sách đang mượn',
    dataIndex: 'borrow',
    render: (borrow) => <h2 style={{ color: 'tomato' }}>{borrow.length}</h2>,
  },
];

const Table1 = (data1) => {
  return <Table columns={columns} dataSource={data1.data} />;
};
export default Table1;
