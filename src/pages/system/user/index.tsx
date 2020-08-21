import {Button, Col, Divider, Dropdown, Form, Icon, Input, Menu, message, Checkbox, Row,} from 'antd';
import React, {Component, ReactNode, RefObject} from 'react';

import {Dispatch} from 'redux';
import {connect} from 'dva';

import {WrappedFormUtils} from 'antd/es/form/Form';
import {formatMessage, FormattedMessage} from 'umi-plugin-react/locale';

import {TablePage} from '@/components/Page';
import {StandardTableColumnProps} from '@/components/StandardTable';
import InlinePopconfirmBtn from '@/components/InlinePopconfirmBtn';
import {ModalForm} from '@/components/Form';


import {UserListItem, UserStateType} from './model';
import {DownOutlined} from "@ant-design/icons/lib";
import RelationDrawer from "@/components/Page/RelationDrawer";
import {CheckboxValueType} from "antd/lib/checkbox/Group";

interface UserProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  user: UserStateType;
}

interface UserState {
  selectedRows: UserListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: UserListItem;
  relationVisible?: boolean;
}

class User extends Component<UserProps, UserState> {
  state: UserState = {
    selectedRows: [],
    showLoginScriptModal: false,
    relationVisible: false,
  };

  private pageRef: RefObject<TablePage<UserListItem>> = React.createRef();

  geDropDownMenus = (record: UserListItem) => (
    <Menu>
      <Menu.Item key="0">
        <ModalForm
          title={formatMessage({id: 'app.user.edit-the-user'})}
          onSubmit={this.handleEdit}
          element={
            <a>
              <Icon type="edit"/>
              <FormattedMessage id="component.common.text.edit"/>
            </a>
          }
          formItems={this.modalFormItems}
          formValues={record}
        />
      </Menu.Item>
      <Menu.Item key="1">
        <InlinePopconfirmBtn onConfirm={() => this.onDeleteOne(record)}/>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={this.showRelationDrawer}>
          <Icon type="edit"/>
          <FormattedMessage id="app.user.add-user-role"/>
        </a>
        {/*<InlinePopconfirmBtn text={"分配角色1"} onConfirm={() => this.showRelationDrawer(record)}/>*/}
      </Menu.Item>
      <Menu.Divider/>
    </Menu>
  );

  showRelationDrawer = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'system_user/fetchAllRoles',
    });
    dispatch({
      type: 'system_user/fetchSelectRoles',
    });
    this.setState({relationVisible: true});
  }

  closeRelationDrawer = () => {
    this.setState({relationVisible: false});
  }

  /**
   *
   *
   * @type {StandardTableColumnProps<UserListItem>[]}
   * @memberof User
   */
  columns: StandardTableColumnProps<UserListItem>[] = [
    {
      title: <FormattedMessage id="app.user.label.username"/>,
      dataIndex: 'username',
      sorter: true,
      width: 120,
    },
    {
      title: <FormattedMessage id="app.user.label.pwd"/>,
      dataIndex: 'pwd',
      width: 120,
    },
    {
      title: <FormattedMessage id="app.user.label.salt"/>,
      dataIndex: 'salt',
      width: 100,
    },
    {
      title: <FormattedMessage id="app.user.label.age"/>,
      dataIndex: 'age',
      sorter: true,
      width: 100,
    },
    {
      title: <FormattedMessage id="app.user.label.avatar"/>,
      dataIndex: 'avatar',
      width: 250,
    },
    {
      title: <FormattedMessage id="app.common.label.operation"/>,
      align: 'center',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (text: string, record: UserListItem) => (
        <>
          <Divider type="vertical"/>
          <Dropdown overlay={this.geDropDownMenus(record)} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <DownOutlined/>
            </a>
          </Dropdown>
          <Divider type="vertical"/>
        </>
      ),
    },
  ];

  modalFormItems = () => [
    {
      key: 'id',
      label: 'id',
      name: 'id',
      itemRender: <Input type="hidden"/>,
      hidden: true,
    },
    {
      key: 'username',
      label: <FormattedMessage id="app.user.label.username"/>,
      name: 'username',
      itemRender: <Input placeholder="请输入用户名"/>,
    },
    {
      key: 'pwd',
      label: <FormattedMessage id="app.user.label.pwd"/>,
      name: 'pwd',
      itemRender: <Input placeholder="请输入用密码"/>,
    },
    {
      key: 'salt',
      label: <FormattedMessage id="app.user.label.salt"/>,
      name: 'salt',
      itemRender: <Input placeholder="请输入salt"/>,
    },
    {
      key: 'age',
      label: <FormattedMessage id="app.user.label.age"/>,
      name: 'age',
      itemRender: <Input placeholder="请输入年龄"/>,
    },
    {
      key: 'avatar',
      label: <FormattedMessage id="app.user.label.avatar"/>,
      name: 'avatar',
      itemRender: <Input placeholder="请输入头像"/>,
    },
    {
      key: 'email',
      label: <FormattedMessage id="app.user.label.email"/>,
      name: 'email',
      itemRender: <Input placeholder="请输入邮箱"/>,
    },
  ];

  //配置搜索项
  searchFormRender = (form: WrappedFormUtils) => {
    const {getFieldDecorator} = form;
    return (
      [
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.user.label.username"/>}>
            {getFieldDecorator('username')(<Input placeholder="请输入"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.user.label.pwd"/>}>
            {getFieldDecorator('pwd')(<Input placeholder="请输入"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.user.label.salt"/>}>
            {getFieldDecorator('salt')(<Input placeholder="请输入"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.user.label.email"/>}>
            {getFieldDecorator('email')(<Input placeholder="请输入"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  showModal = (currentRecord: UserListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDeleteOne = (user: UserListItem) => {
    const {dispatch} = this.props;
    const that = this;
    dispatch({
      type: 'system_user/remove',
      payload: user

    })
    // @ts-ignore
      .then((response: any) => {
        if (response && response.code === 200) {
          if (that.pageRef.current) {
            that.pageRef.current.doSearch();
          }
          message.success(formatMessage({id: 'component.common.text.deleted-success'}));
        } else {
          message.error(response.msg);
        }
      })
  };

  batchDelete = (ids: number[]) => {
    const {dispatch} = this.props;

    if (!ids) return;
    const that = this;

    dispatch({
      type: 'system_user/removeBatch',
      payload: ids.join(','),

    })
    // @ts-ignore
      .then((response: any) => {
        if (response && response.code === 200) {
          if (that.pageRef.current) {
            that.pageRef.current.doSearch();
          }
          message.success(formatMessage({id: 'component.common.text.deleted-success'}));
        } else {
          message.error(response.msg);
        }
      })
  };

  handleAdd = (fields: any) => this.handleAddOrEdit('system_user/create', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('system_user/modify', fields);

  handleAddOrEdit = (type: string, fields: any) => {
    const {dispatch} = this.props;
    const that = this;
    return dispatch({
      type,
      payload: fields,
      // @ts-ignore
    }).then((response) => {
      if (response && response.code === 200) {
        if (that.pageRef.current) {
          that.pageRef.current.doSearch();
        }
        message.success(
          formatMessage({
            id: `component.common.text.${(type.indexOf('create') !== -1 && 'add') || 'edit'}-success`,
          }),
        );
      } else {
        message.error(response.msg);
      }
    });
  };

  handleSelectRows = (rows: UserListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };


  //配置操作项
  operatorRender = () => (
    [
      <ModalForm
        title={formatMessage({id: 'app.user.add-new-user'})}
        onSubmit={this.handleAdd}
        element={
          <Button type="primary" icon="plus">
            <FormattedMessage id="component.common.text.add"/>
          </Button>
        }
        formItems={this.modalFormItems}
      />,

    ]

  );

  onChange(checkedValue: Array<CheckboxValueType>) {
    console.log(318, checkedValue);
  }


  //配置弹出框内容
  renderRelationRender = () => {
    const {
      // @ts-ignore
      system_user: {allRoles, selectRoles},
    } = this.props;
    const elements: ReactNode[] = [];
    console.log(335, selectRoles)
    console.log(336, allRoles)
    allRoles.forEach((item: string, index: number) => {
      elements.push(
        <Col span={8} style={{padding: 5}} key={index}>
          <Checkbox value={item}>{item}</Checkbox>
        </Col>
      );
    });
    return (
      <>
        <Checkbox.Group style={{width: '100%'}} options={allRoles} defaultValue={selectRoles}>
          <Row>
            {elements}
          </Row>
        </Checkbox.Group>
      </>
    );
  }

  render() {
    const {
      dispatch,
      loading,
      // @ts-ignore
      system_user: {data},
    } = this.props;
    const {selectedRows, relationVisible} = this.state;

    return (
      <>
        <TablePage<UserListItem>
          ref={this.pageRef}
          title={formatMessage({id: 'app.user'})}
          action="system_user/fetch"
          columns={this.columns}
          data={data}
          loading={loading}
          searchFormRender={this.searchFormRender}
          operatorRender={this.operatorRender}
          selectedRows={selectedRows}
          handleSelectRows={this.handleSelectRows}
          onDelete={(rows: UserListItem[]) => this.batchDelete(rows.map(row => row.id))}
          dispatch={dispatch}
        />
        // 通过一个Drawer配置关系
        <RelationDrawer
          visible={relationVisible}
          onClose={this.closeRelationDrawer}
          relationRender={this.renderRelationRender}
        />
      </>
    );
  }
}

export default connect(
  ({
     system_user,
     loading,
   }: {
    system_user: UserStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    system_user,
    loading: loading.models.system_user,
  }),
)(User);
