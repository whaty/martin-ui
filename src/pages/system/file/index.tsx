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


import {FileListItem, FileStateType} from './model';
import {DownOutlined} from "@ant-design/icons/lib";
import Authorized from "@/utils/Authorized";

interface FileProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  file: FileStateType;
}

interface FileState {
  selectedRows: FileListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: FileListItem;
}

class File extends Component<FileProps, FileState> {
  state: FileState = {
    selectedRows: [],
    showLoginScriptModal: false,
  };

  private pageRef: RefObject<TablePage<FileListItem>> = React.createRef();

  geDropDownMenus = (record: FileListItem) => (
    <Menu>
      <Menu.Item key="0">
        <Authorized authority={'sys_file_edit'} noMatch={''}>
            <ModalForm
              title={formatMessage({id: 'app.file.edit-the-file'})}
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
          <Authorized authority={'sys_file_del'} noMatch={''}>
                <InlinePopconfirmBtn onConfirm={() => this.onDeleteOne(record)}/>
          </Authorized>
      </Menu.Item>
      <Menu.Divider/>
    </Menu>
  );

  /**
   *
   *
   * @type {StandardTableColumnProps<FileListItem>[]}
   * @memberof File
   */
  columns: StandardTableColumnProps<FileListItem>[] = [
    {
      title: <FormattedMessage id="app.file.label.name"/>,
      dataIndex: 'name',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.file.label.authority"/>,
      dataIndex: 'authority',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.file.label.url"/>,
      dataIndex: 'url',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.file.label.sort"/>,
      dataIndex: 'sort',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.file.label.createTime"/>,
      dataIndex: 'createTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.file.label.updateTime"/>,
      dataIndex: 'updateTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.file.label.creator"/>,
      dataIndex: 'creator',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.file.label.updater"/>,
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
      render: (text: string, record: FileListItem) => (
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
      label: <FormattedMessage id="app.file.label.name"/>,
      name: 'name',
      itemRender: <Input placeholder="请输入文件名称"/>,
    },
    {
      key: 'authority',
      label: <FormattedMessage id="app.file.label.authority"/>,
      name: 'authority',
      itemRender: <Input placeholder="请输入权限编码，以file_开通"/>,
    },
    {
      key: 'url',
      label: <FormattedMessage id="app.file.label.url"/>,
      name: 'url',
      itemRender: <Input placeholder="请输入文件路径"/>,
    },
    {
      key: 'sort',
      label: <FormattedMessage id="app.file.label.sort"/>,
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
          <Form.Item label={<FormattedMessage id="app.file.label.name"/>}>
            {getFieldDecorator('name')(<Input placeholder="请输入文件名称"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.file.label.authority"/>}>
            {getFieldDecorator('authority')(<Input placeholder="请输入权限编码，以file_开通"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.file.label.url"/>}>
            {getFieldDecorator('url')(<Input placeholder="请输入文件路径"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.file.label.sort"/>}>
            {getFieldDecorator('sort')(<Input placeholder="请输入排序值"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.file.label.createTime"/>}>
              {getFieldDecorator('createTime')(<DatePicker showToday format="YYYY-MM-DD" />)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.file.label.updateTime"/>}>
              {getFieldDecorator('updateTime')(<DatePicker showToday format="YYYY-MM-DD" />)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.file.label.creator"/>}>
            {getFieldDecorator('creator')(<Input placeholder="请输入创建人"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.file.label.updater"/>}>
            {getFieldDecorator('updater')(<Input placeholder="请输入修改人"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  showModal = (currentRecord: FileListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDeleteOne = (file: FileListItem) => {
    const {dispatch} = this.props;
    const that = this;
    dispatch({
      type: 'system_file/delete',
      payload: file

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
      type: 'system_file/deleteBatch',
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

  handleAdd = (fields: any) => this.handleAddOrEdit('system_file/add', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('system_file/update', fields);

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

  handleSelectRows = (rows: FileListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };


  //配置操作项
  operatorRender = () => (
    [
        <Authorized authority={'sys_file_add'} noMatch={''}>
          <ModalForm
            title={formatMessage({id: 'app.file.add-new-file'})}
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
      system_file: {data},
    } = this.props;
    const {selectedRows} = this.state;

    return (
      <TablePage<FileListItem>
        ref={this.pageRef}
        title={formatMessage({id: 'app.file'})}
        action="system_file/page"
        columns={this.columns}
        data={data}
        loading={loading}
        searchFormRender={this.searchFormRender}
        operatorRender={this.operatorRender}
        selectedRows={selectedRows}
        handleSelectRows={this.handleSelectRows}
        onDelete={(rows: FileListItem[]) => this.batchDelete(rows.map(row => row.id))}
        deleteBatchAuth={'sys_file_deleteBatch'}
        dispatch={dispatch}
      />
    );
  }
}

export default connect(
  ({
     system_file,
     loading,
   }: {
    system_file: FileStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    system_file,
    loading: loading.models.system_file,
  }),
)(File);
