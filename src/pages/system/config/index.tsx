import {Button, Col, DatePicker, Divider, Dropdown, Form, Icon, Input, Menu, message,} from 'antd';
import React, {Component, RefObject} from 'react';

import {Dispatch} from 'redux';
import {connect} from 'dva';

import {WrappedFormUtils} from 'antd/es/form/Form';
import {formatMessage, FormattedMessage} from 'umi-plugin-react/locale';

import {TablePage} from '@/components/Page';
import {StandardTableColumnProps} from '@/components/StandardTable';
import InlinePopconfirmBtn from '@/components/InlinePopconfirmBtn';
import {ModalForm} from '@/components/Form';


import {ConfigListItem, ConfigStateType} from './model';
import {DownOutlined} from "@ant-design/icons/lib";
import Authorized from "@/utils/Authorized";

interface ConfigProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  config: ConfigStateType;
}

interface ConfigState {
  selectedRows: ConfigListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: ConfigListItem;
}

class Config extends Component<ConfigProps, ConfigState> {
  state: ConfigState = {
    selectedRows: [],
    showLoginScriptModal: false,
  };

  private pageRef: RefObject<TablePage<ConfigListItem>> = React.createRef();

  geDropDownMenus = (record: ConfigListItem) => (
    <Menu>
      <Menu.Item key="0">
        <Authorized authority={'sys_config_edit'} noMatch={''}>
            <ModalForm
              title={formatMessage({id: 'app.config.edit-the-config'})}
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
          <Authorized authority={'sys_config_del'} noMatch={''}>
                <InlinePopconfirmBtn onConfirm={() => this.onDeleteOne(record)}/>
          </Authorized>
      </Menu.Item>
      <Menu.Divider/>
    </Menu>
  );

  /**
   *
   *
   * @type {StandardTableColumnProps<ConfigListItem>[]}
   * @memberof Config
   */
  columns: StandardTableColumnProps<ConfigListItem>[] = [
    {
      title: <FormattedMessage id="app.config.label.name"/>,
      dataIndex: 'name',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.config.label.value"/>,
      dataIndex: 'value',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.config.label.type"/>,
      dataIndex: 'type',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.config.label.createTime"/>,
      dataIndex: 'createTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.config.label.updateTime"/>,
      dataIndex: 'updateTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.config.label.creator"/>,
      dataIndex: 'creator',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.config.label.updater"/>,
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
      render: (text: string, record: ConfigListItem) => (
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
      label: <FormattedMessage id="app.config.label.name"/>,
      name: 'name',
      itemRender: <Input placeholder="请输入名称"/>,
    },
    {
      key: 'value',
      label: <FormattedMessage id="app.config.label.value"/>,
      name: 'value',
      itemRender: <Input placeholder="请输入配置值"/>,
    },
    {
      key: 'type',
      label: <FormattedMessage id="app.config.label.type"/>,
      name: 'type',
      itemRender: <Input placeholder="请输入配置关键字"/>,
    },
  ];

  //配置搜索项
  searchFormRender = (form: WrappedFormUtils) => {
    const {getFieldDecorator} = form;
    return (
      [
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.config.label.name"/>}>
            {getFieldDecorator('name')(<Input placeholder="请输入名称"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.config.label.value"/>}>
            {getFieldDecorator('value')(<Input placeholder="请输入配置值"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.config.label.type"/>}>
            {getFieldDecorator('type')(<Input placeholder="请输入配置关键字"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.config.label.createTime"/>}>
              {getFieldDecorator('createTime')(<DatePicker showToday format="YYYY-MM-DD" />)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.config.label.updateTime"/>}>
              {getFieldDecorator('updateTime')(<DatePicker showToday format="YYYY-MM-DD" />)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.config.label.creator"/>}>
            {getFieldDecorator('creator')(<Input placeholder="请输入创建人"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.config.label.updater"/>}>
            {getFieldDecorator('updater')(<Input placeholder="请输入修改人"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  showModal = (currentRecord: ConfigListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDeleteOne = (config: ConfigListItem) => {
    const {dispatch} = this.props;
    const that = this;
    dispatch({
      type: 'system_config/delete',
      payload: config

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
      type: 'system_config/deleteBatch',
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

  handleAdd = (fields: any) => this.handleAddOrEdit('system_config/add', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('system_config/update', fields);

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

  handleSelectRows = (rows: ConfigListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };


  //配置操作项
  operatorRender = () => (
    [
        <Authorized authority={'sys_config_add'} noMatch={''}>
          <ModalForm
            title={formatMessage({id: 'app.config.add-new-config'})}
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

  render() {
    const {
      dispatch,
      loading,
      // @ts-ignore
      system_config: {data},
    } = this.props;
    const {selectedRows} = this.state;

    return (
      <TablePage<ConfigListItem>
        ref={this.pageRef}
        title={formatMessage({id: 'app.config'})}
        action="system_config/page"
        columns={this.columns}
        data={data}
        loading={loading}
        searchFormRender={this.searchFormRender}
        operatorRender={this.operatorRender}
        selectedRows={selectedRows}
        handleSelectRows={this.handleSelectRows}
        onDelete={(rows: ConfigListItem[]) => this.batchDelete(rows.map(row => row.id))}
        deleteBatchAuth={'sys_config_deleteBatch'}
        dispatch={dispatch}
      />
    );
  }
}

export default connect(
  ({
     system_config,
     loading,
   }: {
    system_config: ConfigStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    system_config,
    loading: loading.models.system_config,
  }),
)(Config);
