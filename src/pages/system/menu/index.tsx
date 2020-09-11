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


import {MenuListItem, MenuStateType} from './model';
import {DownOutlined} from "@ant-design/icons/lib";
import Authorized from "@/utils/Authorized";
import {AntTreeNodeSelectedEvent} from "antd/lib/tree";

const {TreeNode} = Tree;

interface MenuProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  menu: MenuStateType;
}

interface MenuState {
  selectedRows: MenuListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: MenuListItem;
  selectId: string;
}

class MartinMenu extends Component<MenuProps, MenuState> {
  state: MenuState = {
    selectedRows: [],
    showLoginScriptModal: false,
    selectId: '',
  };

  private pageRef: RefObject<TablePage<MenuListItem>> = React.createRef();

  geDropDownMenus = (record: MenuListItem) => (
    <Menu>
      <Menu.Item key="0">
        <Authorized authority={'sys_menu_edit'} noMatch={''}>
          <ModalForm
            title={formatMessage({id: 'app.menu.edit-the-menu'})}
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
        <Authorized authority={'sys_menu_del'} noMatch={''}>
          <InlinePopconfirmBtn onConfirm={() => this.onDeleteOne(record)}/>
        </Authorized>
      </Menu.Item>
      <Menu.Divider/>
    </Menu>
  );

  /**
   *
   *
   * @type {StandardTableColumnProps<MenuListItem>[]}
   * @memberof Menu
   */
  columns: StandardTableColumnProps<MenuListItem>[] = [
    {
      title: <FormattedMessage id="app.menu.label.name"/>,
      dataIndex: 'name',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.authority"/>,
      dataIndex: 'authority',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.path"/>,
      dataIndex: 'path',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.parentId"/>,
      dataIndex: 'parentId',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.icon"/>,
      dataIndex: 'icon',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.locale"/>,
      dataIndex: 'locale',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.parentKey"/>,
      dataIndex: 'parentKey',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.hideChildrenInMenu"/>,
      dataIndex: 'hideChildrenInMenu',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.hideInMenu"/>,
      dataIndex: 'hideInMenu',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.uiKey"/>,
      dataIndex: 'uiKey',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.component"/>,
      dataIndex: 'component',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.sort"/>,
      dataIndex: 'sort',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.dev"/>,
      dataIndex: 'dev',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.createTime"/>,
      dataIndex: 'createTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.updateTime"/>,
      dataIndex: 'updateTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.creator"/>,
      dataIndex: 'creator',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.menu.label.updater"/>,
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
      render: (text: string, record: MenuListItem) => (
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
      label: <FormattedMessage id="app.menu.label.name"/>,
      name: 'name',
      itemRender: <Input placeholder="请输入菜单名称"/>,
    },
    {
      key: 'authority',
      label: <FormattedMessage id="app.menu.label.authority"/>,
      name: 'authority',
      itemRender: <Input placeholder="请输入权限编码，以menu_开头"/>,
    },
    {
      key: 'path',
      label: <FormattedMessage id="app.menu.label.path"/>,
      name: 'path',
      itemRender: <Input placeholder="请输入前端URL"/>,
    },
    {
      key: 'icon',
      label: <FormattedMessage id="app.menu.label.icon"/>,
      name: 'icon',
      itemRender: <Input placeholder="请输入图标"/>,
    },
    {
      key: 'locale',
      label: <FormattedMessage id="app.menu.label.locale"/>,
      name: 'locale',
      itemRender: <Input placeholder="请输入国际化字段"/>,
    },
    {
      key: 'parentKey',
      label: <FormattedMessage id="app.menu.label.parentKey"/>,
      name: 'parentKey',
      itemRender: <Input placeholder="请输入父菜单路径"/>,
    },
    {
      key: 'hideChildrenInMenu',
      label: <FormattedMessage id="app.menu.label.hideChildrenInMenu"/>,
      name: 'hideChildrenInMenu',
      itemRender: <Input placeholder="请输入是否隐藏子菜单"/>,
    },
    {
      key: 'hideInMenu',
      label: <FormattedMessage id="app.menu.label.hideInMenu"/>,
      name: 'hideInMenu',
      itemRender: <Input placeholder="请输入是否隐藏菜单"/>,
    },
    {
      key: 'uiKey',
      label: <FormattedMessage id="app.menu.label.uiKey"/>,
      name: 'uiKey',
      itemRender: <Input placeholder="请输入任意值"/>,
    },
    {
      key: 'component',
      label: <FormattedMessage id="app.menu.label.component"/>,
      name: 'component',
      itemRender: <Input placeholder="请输入前端组件"/>,
    },
    {
      key: 'sort',
      label: <FormattedMessage id="app.menu.label.sort"/>,
      name: 'sort',
      itemRender: <Input placeholder="请输入排序值"/>,
    },
    {
      key: 'dev',
      label: <FormattedMessage id="app.menu.label.dev"/>,
      name: 'dev',
      itemRender: <Input placeholder="请输入是否为演示数据,0:不区分环境，1：演示，2：正式"/>,
    },
  ];

  //配置搜索项
  searchFormRender = (form: WrappedFormUtils) => {
    const {getFieldDecorator} = form;
    return (
      [
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.name"/>}>
            {getFieldDecorator('name')(<Input placeholder="请输入菜单名称"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.authority"/>}>
            {getFieldDecorator('authority')(<Input placeholder="请输入权限编码，以menu_开头"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.path"/>}>
            {getFieldDecorator('path')(<Input placeholder="请输入前端URL"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.icon"/>}>
            {getFieldDecorator('icon')(<Input placeholder="请输入图标"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.locale"/>}>
            {getFieldDecorator('locale')(<Input placeholder="请输入国际化字段"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.parentKey"/>}>
            {getFieldDecorator('parentKey')(<Input placeholder="请输入父菜单路径"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.hideChildrenInMenu"/>}>
            {getFieldDecorator('hideChildrenInMenu')(<Input placeholder="请输入是否隐藏子菜单"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.hideInMenu"/>}>
            {getFieldDecorator('hideInMenu')(<Input placeholder="请输入是否隐藏菜单"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.uiKey"/>}>
            {getFieldDecorator('uiKey')(<Input placeholder="请输入任意值"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.component"/>}>
            {getFieldDecorator('component')(<Input placeholder="请输入前端组件"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.sort"/>}>
            {getFieldDecorator('sort')(<Input placeholder="请输入排序值"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.dev"/>}>
            {getFieldDecorator('dev')(<Input placeholder="请输入是否为演示数据,0:不区分环境，1：演示，2：正式"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.createTime"/>}>
            {getFieldDecorator('createTime')(<DatePicker showToday format="YYYY-MM-DD"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.updateTime"/>}>
            {getFieldDecorator('updateTime')(<DatePicker showToday format="YYYY-MM-DD"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.creator"/>}>
            {getFieldDecorator('creator')(<Input placeholder="请输入创建人"/>)}
          </Form.Item>
        </Col>,
        <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.menu.label.updater"/>}>
            {getFieldDecorator('updater')(<Input placeholder="请输入修改人"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  showModal = (currentRecord: MenuListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDeleteOne = (menu: MenuListItem) => {
    const {dispatch} = this.props;
    const that = this;
    dispatch({
      type: 'system_menu/delete',
      payload: menu

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
      type: 'system_menu/deleteBatch',
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

  handleAdd = (fields: any) => this.handleAddOrEdit('system_menu/add', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('system_menu/update', fields);

  handleAddOrEdit = (type: string, fields: any) => {
    const {dispatch} = this.props;
    const that = this;
    let isAdd = type.indexOf('add');
    if (isAdd !== -1) {
      let selectId = this.state.selectId;
      if (!selectId || selectId == '') {
        fields.parentId = '0';
      }
      fields.parentId = selectId;
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
            id: `component.common.text.${(isAdd !== -1 && 'add') || 'edit'}-success`,
          }),
        );
      } else {
        message.error(response.msg);
      }
    });
  };

  handleSelectRows = (rows: MenuListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  //配置操作项
  operatorRender = () => (
    [
      <Authorized authority={'sys_menu_add'} noMatch={''}>
        <ModalForm
          title={formatMessage({id: 'app.menu.add-new-menu'})}
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
        id: selectId
      };
    } else {
      param = {
        parentId: selectId
      };
    }
    if (current) {
      this.setState({
        selectId: selectId
      });
      current.onSearch(param);
    } else {
      message.error("无法获取菜单列表");
    }

  }

  render() {
    const {
      dispatch,
      loading,
      // @ts-ignore
      system_menu: {data, treeData},
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
              <TablePage<MenuListItem>
                ref={this.pageRef}
                title={formatMessage({id: 'app.menu'})}
                action="system_menu/page"
                columns={this.columns}
                data={data}
                loading={loading}
                searchFormRender={this.searchFormRender}
                operatorRender={this.operatorRender}
                selectedRows={selectedRows}
                handleSelectRows={this.handleSelectRows}
                onDelete={(rows: MenuListItem[]) => this.batchDelete(rows.map(row => row.id))}
                deleteBatchAuth={'sys_menu_deleteBatch'}
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
     system_menu,
     loading,
   }: {
    system_menu: MenuStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    system_menu,
    loading: loading.models.system_menu,
  }),
)(MartinMenu);
