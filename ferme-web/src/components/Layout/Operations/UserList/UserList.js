import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Col, Button, Card, Table, Tag, Space, Skeleton, Select } from 'antd';
import 'antd/dist/antd.css';
import classes from './UserList.module.css'
import {
  FileSearchOutlined,
} from '@ant-design/icons';
const UserList = (props) => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    axios
    .get('https://localhost:5001/api/user/roles/all')
    .then((response) => {
      console.log('response :>> ', response);
      setUsers(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log('bills :>> ', users);
  }, [users]);

  const selectedItemHandler = (val) => {
    props.selectedItem(val);
  };


  const columns = [
    {
      title: <span style={{ fontSize: '.7rem' }}>ID</span>,
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: <span style={{ fontSize: '.7rem' }}>Rol</span>,
      dataIndex: 'userRole',
      key: 'userRole',
      render: (userRole) => (
        <>
          {userRole === 'ADMIN' && <Tag color="blue">ADMNISTRADOR</Tag>}
          {userRole === 'PROVIDER' && <Tag color="purple">PROVEEDOR</Tag>}
          {userRole === 'EMPLOYEE' && <Tag color="volcano">EMPLEADO</Tag>}
          {userRole === 'CUSTOMER' && <Tag color="red">CLIENTE PERSONA NATURAL</Tag>}
          {userRole === 'COMPANY' && <Tag color="magenta">CLIENTE EMPRESA</Tag>}
        </>
      ),
    },
    {
      title: <span style={{ fontSize: '.7rem' }}>Email</span>,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <span style={{ fontSize: '.7rem' }}>Nombre</span>,
      dataIndex: 'userFullName',
      key: 'userFullName',
    },
    {
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <>
          <Space size="middle">
            <a
              style={{
                color: '#0918EB',
                cursor: 'pointer',
                fontSize: '.8rem'
              }}
            >
              <FileSearchOutlined /> Ver Detalle
            </a>
          </Space>
        </>
      )
    }
  ];

  return (
    <div className={classes['user-list']}>
      <div className={classes.container}>
        <Card
          style={{ padding: '0px' }}
          type="inner"
          title="Usuarios"
          extra={
            <Button
              onClick={() => selectedItemHandler(0)}
            >
              Volver
            </Button>
          }
          bodyStyle={{ width: '100%', margin: '0 auto', padding: '0' }}
        >
          <Skeleton loading={isLoading}>
            <Table columns={columns} dataSource={users} pagination={false} />
          </Skeleton>
        </Card>
      </div>
    </div>
  );
};

UserList.propTypes = {
  selectedItem: PropTypes.func,
};

UserList.defaultProps = {
  selectedItem: () => {},
};

export default UserList;