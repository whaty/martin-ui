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


import {LogListItem, LogStateType} from './model';
import {DownOutlined} from "@ant-design/icons/lib";
import Authorized from "@/utils/Authorized";

interface LogProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  log: LogStateType;
}

interface LogState {
  selectedRows: LogListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: LogListItem;
}

class Log extends Component<LogProps, LogState> {
  state: LogState = {
    selectedRows: [],
    showLoginScriptModal: false,
  };

  private pageRef: RefObject<TablePage<LogListItem>> = React.createRef();

  geDropDownMenus = (record: LogListItem) => (
    <Menu>
      <Menu.Item key="0">
        <Authorized authority={'sys_log_edit'} noMatch={''}>
            <ModalForm
              title={formatMessage({id: 'app.log.edit-the-log'})}
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
          <Authorized authority={'sys_log_del'} noMatch={''}>
                <InlinePopconfirmBtn onConfirm={() => this.onDeleteOne(record)}/>
          </Authorized>
      </Menu.Item>
      <Menu.Divider/>
    </Menu>
  );

  /**
   *
   *
   * @type {StandardTableColumnProps<LogListItem>[]}
   * @memberof Log
   */
  columns: StandardTableColumnProps<LogListItem>[] = [
    {
      title: <FormattedMessage id="app.log.label.type"/>,
      dataIndex: 'type',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.title"/>,
      dataIndex: 'title',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.serviceId"/>,
      dataIndex: 'serviceId',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.createBy"/>,
      dataIndex: 'createBy',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.remoteAddr"/>,
      dataIndex: 'remoteAddr',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.userAgent"/>,
      dataIndex: 'userAgent',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.requestUri"/>,
      dataIndex: 'requestUri',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.method"/>,
      dataIndex: 'method',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.params"/>,
      dataIndex: 'params',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.time"/>,
      dataIndex: 'time',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.exception"/>,
      dataIndex: 'exception',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.createTime"/>,
      dataIndex: 'createTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.updateTime"/>,
      dataIndex: 'updateTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.creator"/>,
      dataIndex: 'creator',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.log.label.updater"/>,
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
      render: (text: string, record: LogListItem) => (
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
      key: 'type',
      label: <FormattedMessage id="app.log.label.type"/>,
      name: 'type',
      itemRender: <Input placeholder="请输入日志类型"/>,
    },
    {
      key: 'title',
      label: <FormattedMessage id="app.log.label.title"/>,
      name: 'title',
      itemRender: <Input placeholder="请输入日志标题"/>,
    },
    {
      key: 'serviceId',
      label: <FormattedMessage id="app.log.label.serviceId"/>,
      name: 'serviceId',
      itemRender: <Input placeholder="请输入服务ID"/>,
    },
    {
      key: 'createBy',
      label: <FormattedMessage id="app.log.label.createBy"/>,
      name: 'createBy',
      itemRender: <Input placeholder="请输入创建者"/>,
    },
    {
      key: 'remoteAddr',
      label: <FormattedMessage id="app.log.label.remoteAddr"/>,
      name: 'remoteAddr',
      itemRender: <Input placeholder="请输入操作IP地址"/>,
    },
    {
      key: 'userAgent',
      label: <FormattedMessage id="app.log.label.userAgent"/>,
      name: 'userAgent',
      itemRender: <Input placeholder="请输入用户代理"/>,
    },
    {
      key: 'requestUri',
      label: <FormattedMessage id="app.log.label.requestUri"/>,
      name: 'requestUri',
      itemRender: <Input placeholder="请输入请求URI"/>,
    },
    {
      key: 'method',
      label: <FormattedMessage id="app.log.label.method"/>,
      name: 'method',
      itemRender: <Input placeholder="请输入操作方式"/>,
    },
    {
      key: 'params',
      label: <FormattedMessage id="app.log.label.params"/>,
      name: 'params',
      itemRender: <Input placeholder="请输入操作提交的数据"/>,
    },
    {
      key: 'time',
      label: <FormattedMessage id="app.log.label.time"/>,
      name: 'time',
      itemRender: <Input placeholder="请输入执行时间"/>,
    },
    {
      key: 'exception',
      label: <FormattedMessage id="app.log.label.exception"/>,
      name: 'exception',
      itemRender: <Input placeholder="请输入异常信息"/>,
    },
  ];

  //配置搜索项
  searchFormRender = (form: WrappedFormUtils) => {
    const {getFieldDecorator} = form;
    return (
      [
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.type"/>}>
            {getFieldDecorator('type')(<Input placeholder="请输入日志类型"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.title"/>}>
            {getFieldDecorator('title')(<Input placeholder="请输入日志标题"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.serviceId"/>}>
            {getFieldDecorator('serviceId')(<Input placeholder="请输入服务ID"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.createBy"/>}>
            {getFieldDecorator('createBy')(<Input placeholder="请输入创建者"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.remoteAddr"/>}>
            {getFieldDecorator('remoteAddr')(<Input placeholder="请输入操作IP地址"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.userAgent"/>}>
            {getFieldDecorator('userAgent')(<Input placeholder="请输入用户代理"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.requestUri"/>}>
            {getFieldDecorator('requestUri')(<Input placeholder="请输入请求URI"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.method"/>}>
            {getFieldDecorator('method')(<Input placeholder="请输入操作方式"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.params"/>}>
            {getFieldDecorator('params')(<Input placeholder="请输入操作提交的数据"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.time"/>}>
            {getFieldDecorator('time')(<Input placeholder="请输入执行时间"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.exception"/>}>
            {getFieldDecorator('exception')(<Input placeholder="请输入异常信息"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.createTime"/>}>
              {getFieldDecorator('createTime')(<DatePicker showToday format="YYYY-MM-DD" />)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.updateTime"/>}>
              {getFieldDecorator('updateTime')(<DatePicker showToday format="YYYY-MM-DD" />)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.creator"/>}>
            {getFieldDecorator('creator')(<Input placeholder="请输入创建人"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.log.label.updater"/>}>
            {getFieldDecorator('updater')(<Input placeholder="请输入修改人"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  showModal = (currentRecord: LogListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDeleteOne = (log: LogListItem) => {
    const {dispatch} = this.props;
    const that = this;
    dispatch({
      type: 'system_log/delete',
      payload: log

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
      type: 'system_log/deleteBatch',
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

  handleAdd = (fields: any) => this.handleAddOrEdit('system_log/add', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('system_log/update', fields);

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

  handleSelectRows = (rows: LogListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };


  //配置操作项
  operatorRender = () => (
    [
        <Authorized authority={'sys_log_add'} noMatch={''}>
          <ModalForm
            title={formatMessage({id: 'app.log.add-new-log'})}
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
      system_log: {data},
    } = this.props;
    const {selectedRows} = this.state;

    return (
      <TablePage<LogListItem>
        ref={this.pageRef}
        title={formatMessage({id: 'app.log'})}
        action="system_log/page"
        columns={this.columns}
        data={data}
        loading={loading}
        searchFormRender={this.searchFormRender}
        operatorRender={this.operatorRender}
        selectedRows={selectedRows}
        handleSelectRows={this.handleSelectRows}
        onDelete={(rows: LogListItem[]) => this.batchDelete(rows.map(row => row.id))}
        deleteBatchAuth={'sys_log_deleteBatch'}
        dispatch={dispatch}
      />
    );
  }
}

export default connect(
  ({
     system_log,
     loading,
   }: {
    system_log: LogStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    system_log,
    loading: loading.models.system_log,
  }),
)(Log);
