import {Button, Col, DatePicker, Divider, Dropdown, Form, Icon, Input, Menu, message, Row, Tree,} from 'antd';
import React, {Component, RefObject} from 'react';

import {Dispatch} from 'redux';
import {connect} from 'dva';

import {WrappedFormUtils} from 'antd/es/form/Form';
import {formatMessage, FormattedMessage} from 'umi-plugin-react/locale';

import {TablePage} from '@/components/Page';
import {StandardTableColumnProps} from '@/components/StandardTable';
import InlinePopconfirmBtn from '@/components/InlinePopconfirmBtn';
import {ModalForm} from '@/components/Form';


import {OperationListItem, OperationStateType} from './model';
import {DownOutlined} from "@ant-design/icons/lib";
import Authorized from "@/utils/Authorized";
import {AntTreeNodeSelectedEvent} from "antd/lib/tree";

const {TreeNode} = Tree;

interface OperationProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  operation: OperationStateType;
}

interface OperationState {
  selectedRows: OperationListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: OperationListItem;
  selectId: string;
}

class Operation extends Component<OperationProps, OperationState> {
  state: OperationState = {
    selectedRows: [],
    showLoginScriptModal: false,
    selectId: '',
  };

  private pageRef: RefObject<TablePage<OperationListItem>> = React.createRef();

  geDropDownMenus = (record: OperationListItem) => (
    <Menu>
      <Menu.Item key="0">
        <Authorized authority={'sys_operation_edit'} noMatch={''}>
          <ModalForm
            title={formatMessage({id: 'app.operation.edit-the-operation'})}
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
        <Authorized authority={'sys_operation_del'} noMatch={''}>
          <InlinePopconfirmBtn onConfirm={() => this.onDeleteOne(record)}/>
        </Authorized>
      </Menu.Item>
      <Menu.Divider/>
    </Menu>
  );

  /**
   *
   *
   * @type {StandardTableColumnProps<OperationListItem>[]}
   * @memberof Operation
   */
  columns: StandardTableColumnProps<OperationListItem>[] = [
    {
      title: <FormattedMessage id="app.operation.label.name"/>,
      dataIndex: 'name',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.authority"/>,
      dataIndex: 'authority',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.parentId"/>,
      dataIndex: 'parentId',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.menuId"/>,
      dataIndex: 'menuId',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.icon"/>,
      dataIndex: 'icon',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.component"/>,
      dataIndex: 'component',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.sort"/>,
      dataIndex: 'sort',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.createTime"/>,
      dataIndex: 'createTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.updateTime"/>,
      dataIndex: 'updateTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.creator"/>,
      dataIndex: 'creator',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.operation.label.updater"/>,
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
      render: (text: string, record: OperationListItem) => (
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
      key: 'name',
      label: <FormattedMessage id="app.operation.label.name"/>,
      name: 'name',
      itemRender: <Input placeholder="请输入操作名称"/>,
    },
    {
      key: 'authority',
      label: <FormattedMessage id="app.operation.label.authority"/>,
      name: 'authority',
      itemRender: <Input placeholder="请输入权限编码，以operation_开头"/>,
    },
    {
      key: 'parentId',
      label: <FormattedMessage id="app.operation.label.parentId"/>,
      name: 'parentId',
      itemRender: <Input placeholder="请输入父操作id"/>,
    },
    {
      key: 'icon',
      label: <FormattedMessage id="app.operation.label.icon"/>,
      name: 'icon',
      itemRender: <Input placeholder="请输入图标"/>,
    },
    {
      key: 'component',
      label: <FormattedMessage id="app.operation.label.component"/>,
      name: 'component',
      itemRender: <Input placeholder="请输入前端组件"/>,
    },
    {
      key: 'sort',
      label: <FormattedMessage id="app.operation.label.sort"/>,
      name: 'sort',
      itemRender: <Input placeholder="请输入排序值"/>,
    },
  ];

  //配置搜索项
  searchFormRender = (form: WrappedFormUtils) => {
    const {getFieldDecorator} = form;
    return (
      [
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.name"/>}>
            {getFieldDecorator('name')(<Input placeholder="请输入操作名称"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.authority"/>}>
            {getFieldDecorator('authority')(<Input placeholder="请输入权限编码，以operation_开头"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.parentId"/>}>
            {getFieldDecorator('parentId')(<Input placeholder="请输入父操作id"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.icon"/>}>
            {getFieldDecorator('icon')(<Input placeholder="请输入图标"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.component"/>}>
            {getFieldDecorator('component')(<Input placeholder="请输入前端组件"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.sort"/>}>
            {getFieldDecorator('sort')(<Input placeholder="请输入排序值"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.createTime"/>}>
            {getFieldDecorator('createTime')(<DatePicker showToday format="YYYY-MM-DD"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.updateTime"/>}>
            {getFieldDecorator('updateTime')(<DatePicker showToday format="YYYY-MM-DD"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.creator"/>}>
            {getFieldDecorator('creator')(<Input placeholder="请输入创建人"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.operation.label.updater"/>}>
            {getFieldDecorator('updater')(<Input placeholder="请输入修改人"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  showModal = (currentRecord: OperationListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDeleteOne = (operation: OperationListItem) => {
    const {dispatch} = this.props;
    const that = this;
    dispatch({
      type: 'system_operation/delete',
      payload: operation

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
      type: 'system_operation/deleteBatch',
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

  handleAdd = (fields: any) => this.handleAddOrEdit('system_operation/add', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('system_operation/update', fields);

  handleAddOrEdit = (type: string, fields: any) => {
    const {dispatch} = this.props;
    const that = this;
    let isAdd = type.indexOf('add');
    if (isAdd !== -1) {
      let selectId = this.state.selectId;
      if (!selectId || selectId == '') {
        fields.menuId = '0';
      }
      fields.menuId = selectId;
    }
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

  handleSelectRows = (rows: OperationListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };


  //配置操作项
  operatorRender = () => (
    [
      <Authorized authority={'sys_operation_add'} noMatch={''}>
        <ModalForm
          title={formatMessage({id: 'app.operation.add-new-operation'})}
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

  renderMenuTreeNodes = (data: any[]) =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode isLeaf={false} title={item.name} key={item.id}>
            {this.renderMenuTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode isLeaf={true} title={item.name} key={item.id}></TreeNode>;
    });

  onMenuTreeSelected = (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => {
    const current = this.pageRef.current;
    let param = {};

    let selectId = selectedKeys[0];
    if (e.node.props.isLeaf) {
      param = {
        menuId: selectId
      };
    } else {
      return;
    }
    if (current) {
      this.setState({
        selectId: selectId
      });
      current.onSearch(param);
    } else {
      message.error("无法获取按钮列表");
    }

  }

  render() {
    const {
      dispatch,
      loading,
      // @ts-ignore
      system_operation: {data, treeData},
    } = this.props;
    const {selectedRows} = this.state;

    return (
      <>
        <div>
          <Row>
            <Col span={6}
                 style={{
                   left: 0,
                   background: '#fff',
                   height: '85vh',
                   overflow: 'hidden',
                   overflowX: 'scroll',
                   overflowY: 'scroll',
                 }}
            >
              <Tree
                showIcon
                onSelect={this.onMenuTreeSelected}
              >
                {this.renderMenuTreeNodes(treeData)}
              </Tree>
            </Col>
            <Col span={18}>
              <TablePage<OperationListItem>
                ref={this.pageRef}
                title={formatMessage({id: 'app.operation'})}
                action="system_operation/page"
                columns={this.columns}
                data={data}
                loading={loading}
                searchFormRender={this.searchFormRender}
                operatorRender={this.operatorRender}
                selectedRows={selectedRows}
                handleSelectRows={this.handleSelectRows}
                onDelete={(rows: OperationListItem[]) => this.batchDelete(rows.map(row => row.id))}
                deleteBatchAuth={'sys_operation_deleteBatch'}
                dispatch={dispatch}
              />
            </Col>
          </Row>
        </div>

      </>


    );
  }
}

export default connect(
  ({
     system_operation,
     loading,
   }: {
    system_operation: OperationStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    system_operation,
    loading: loading.models.system_operation,
  }),
)(Operation);
