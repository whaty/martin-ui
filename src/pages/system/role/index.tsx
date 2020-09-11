import {Button, Col, Divider, Dropdown, Form, Icon, Input, Menu, message,} from 'antd';
import React, {Component, RefObject} from 'react';

import {Dispatch} from 'redux';
import {connect} from 'dva';

import {WrappedFormUtils} from 'antd/es/form/Form';
import {formatMessage, FormattedMessage} from 'umi-plugin-react/locale';

import {TablePage} from '@/components/Page';
import {StandardTableColumnProps} from '@/components/StandardTable';
import InlinePopconfirmBtn from '@/components/InlinePopconfirmBtn';
import {ModalForm} from '@/components/Form';


import {RoleListItem, RoleStateType} from './model';
import {DownOutlined, LinkOutlined} from "@ant-design/icons/lib";
import RelationDrawer from "@/components/Page/RelationDrawer";
import RolePrivilege from './privilege/RolePrivilege';
import Authorized from "@/utils/Authorized";

interface RoleProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  role: RoleStateType;
}

interface RoleState {
  selectedRows: RoleListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: RoleListItem;
  relationVisible: boolean;
  currentStep: number;
  treeData: any[];
  checkedKeys: string[] | {
    checked: string[];
    halfChecked: string[];
  };
  roleId?: number;
  roleName: string;
  fresh?: boolean;
}


class Role extends Component<RoleProps, RoleState> {
  state: RoleState = {
    selectedRows: [],
    showLoginScriptModal: false,
    relationVisible: false,
    currentStep: 0,
    treeData: [],
    checkedKeys: [],
    roleName: '',
    fresh: true
  };

  private pageRef: RefObject<TablePage<RoleListItem>> = React.createRef();

  geDropDownMenus = (record: RoleListItem) => (
    <Menu>
      <Menu.Item key="0">
        <Authorized authority={'sys_role_edit'} noMatch={''}>
          <ModalForm
            title={formatMessage({id: 'app.role.edit-the-role'})}
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
        </Authorized>
      </Menu.Item>
      <Menu.Item key="1">
        <Authorized authority={'sys_role_del'} noMatch={''}>
          <InlinePopconfirmBtn onConfirm={() => this.onDeleteOne(record)}/>
        </Authorized>
      </Menu.Item>
      <Menu.Item key="2">
        <a onClick={() => this.showRelationDrawer(record)}>
          <LinkOutlined/>
          <FormattedMessage id="app.role.add-role-privilege"/>
        </a>
      </Menu.Item>
      <Menu.Divider/>
    </Menu>
  );

  showRelationDrawer = (record: RoleListItem) => {
    this.setState({
      relationVisible: true,
      roleId: record.id,
      roleName: record.roleName,
    });
  };

  closeRelationDrawer = () => {
    this.setState({
      relationVisible: false,
    });
  };

  /**
   *
   *
   * @type {StandardTableColumnProps<RoleListItem>[]}
   * @memberof Role
   */
  columns: StandardTableColumnProps<RoleListItem>[] = [
    {
      title: <FormattedMessage id="app.role.label.roleName"/>,
      dataIndex: 'roleName',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.role.label.roleCode"/>,
      dataIndex: 'roleCode',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.role.label.roleDesc"/>,
      dataIndex: 'roleDesc',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.role.label.dsType"/>,
      dataIndex: 'dsType',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.role.label.dsScope"/>,
      dataIndex: 'dsScope',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.role.label.createTime"/>,
      dataIndex: 'createTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.role.label.updateTime"/>,
      dataIndex: 'updateTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.role.label.creator"/>,
      dataIndex: 'creator',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.role.label.updater"/>,
      dataIndex: 'updater',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.common.label.operation"/>,
      align: 'center',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (text: string, record: RoleListItem) => (
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
      key: 'roleName',
      label: <FormattedMessage id="app.role.label.roleName"/>,
      name: 'roleName',
      itemRender: <Input placeholder="请输入角色名称"/>,
    },
    {
      key: 'roleCode',
      label: <FormattedMessage id="app.role.label.roleCode"/>,
      name: 'roleCode',
      itemRender: <Input placeholder="请输入角色编码"/>,
    },
    {
      key: 'roleDesc',
      label: <FormattedMessage id="app.role.label.roleDesc"/>,
      name: 'roleDesc',
      itemRender: <Input placeholder="请输入角色描述"/>,
    },
    {
      key: 'dsType',
      label: <FormattedMessage id="app.role.label.dsType"/>,
      name: 'dsType',
      itemRender: <Input placeholder="请输入数据权限类型"/>,
    },
    {
      key: 'dsScope',
      label: <FormattedMessage id="app.role.label.dsScope"/>,
      name: 'dsScope',
      itemRender: <Input placeholder="请输入数据权限范围"/>,
    },
  ];

  //配置搜索项
  searchFormRender = (form: WrappedFormUtils) => {
    const {getFieldDecorator} = form;
    return (
      [
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.role.label.roleName"/>}>
            {getFieldDecorator('roleName')(<Input placeholder="请输入角色名称"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.role.label.roleCode"/>}>
            {getFieldDecorator('roleCode')(<Input placeholder="请输入角色编码"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.role.label.roleDesc"/>}>
            {getFieldDecorator('roleDesc')(<Input placeholder="请输入角色描述"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.role.label.dsType"/>}>
            {getFieldDecorator('dsType')(<Input placeholder="请输入数据权限类型"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.role.label.dsScope"/>}>
            {getFieldDecorator('dsScope')(<Input placeholder="请输入数据权限范围"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.role.label.createTime"/>}>
            {getFieldDecorator('createTime')(<Input placeholder="请输入创建时间"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.role.label.updateTime"/>}>
            {getFieldDecorator('updateTime')(<Input placeholder="请输入更新时间"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.role.label.creator"/>}>
            {getFieldDecorator('creator')(<Input placeholder="请输入创建人"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.role.label.updater"/>}>
            {getFieldDecorator('updater')(<Input placeholder="请输入修改人"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  showModal = (currentRecord: RoleListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDeleteOne = (role: RoleListItem) => {
    const {dispatch} = this.props;
    const that = this;
    dispatch({
      type: 'system_role/delete',
      payload: role

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
      type: 'system_role/deleteBatch',
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

  handleAdd = (fields: any) => this.handleAddOrEdit('system_role/add', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('system_role/update', fields);

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
            id: `component.common.text.${(type.indexOf('add') !== -1 && 'add') || 'edit'}-success`,
          }),
        );
      } else {
        message.error(response.msg);
      }
    });
  };

  handleSelectRows = (rows: RoleListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };


  //配置操作项
  operatorRender = () => (
    [
      <Authorized authority={'sys_role_add'} noMatch={''}>
        <ModalForm
          title={formatMessage({id: 'app.role.add-new-role'})}
          onSubmit={this.handleAdd}
          element={
            <Button type="primary" icon="plus">
              <FormattedMessage id="component.common.text.add"/>
            </Button>
          }
          formItems={this.modalFormItems}
        />,
      </Authorized>

    ]
  );

  onStepChange = (currentStep: number) => {
    console.log('onChange:', currentStep);
    this.setState({currentStep});
  };

  onMenuSelect = (selectedKeys: string[], info: any) => {
    console.log('selected', selectedKeys, info);
  }

  //配置弹出框内容
  renderRelationRender = () => {
    const {roleId, roleName, checkedKeys} = this.state;
    const {dispatch} = this.props;
    return (
      <>
        <RolePrivilege
          roleId={roleId}
          dispatch={dispatch}
          checkedKeys={checkedKeys}
          roleName={roleName}>
        </RolePrivilege>
      </>
    );
  };


  render() {
    const {
      dispatch,
      loading,
      // @ts-ignore
      system_role: {data},
    } = this.props;
    const {selectedRows, relationVisible} = this.state;

    return (
      <>
        <TablePage<RoleListItem>
          ref={this.pageRef}
          title={formatMessage({id: 'app.role'})}
          action="system_role/page"
          columns={this.columns}
          data={data}
          loading={loading}
          searchFormRender={this.searchFormRender}
          operatorRender={this.operatorRender}
          selectedRows={selectedRows}
          handleSelectRows={this.handleSelectRows}
          onDelete={(rows: RoleListItem[]) => this.batchDelete(rows.map(row => row.id))}
          deleteBatchAuth={'sys_role_deleteBatch'}
          dispatch={dispatch}
        />
        {
          relationVisible && (
            <RelationDrawer
              visible={relationVisible}
              onClose={this.closeRelationDrawer}
              destroyOnClose={true}
              relationRender={this.renderRelationRender}
            />
          )
        }
      </>
    );
  }
}

export default connect(
  ({
     system_role,
     loading,
   }: {
    system_role: RoleStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    system_role,
    loading: loading.models.system_role,
  }),
)(Role);
