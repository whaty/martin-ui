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


import {DictListItem, DictStateType} from './model';
import {DownOutlined} from "@ant-design/icons/lib";
import Authorized from "@/utils/Authorized";

interface DictProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  dict: DictStateType;
}

interface DictState {
  selectedRows: DictListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: DictListItem;
}

class Dict extends Component<DictProps, DictState> {
  state: DictState = {
    selectedRows: [],
    showLoginScriptModal: false,
  };

  private pageRef: RefObject<TablePage<DictListItem>> = React.createRef();

  geDropDownMenus = (record: DictListItem) => (
    <Menu>
      <Menu.Item key="0">
        <Authorized authority={'sys_dict_edit'} noMatch={''}>
            <ModalForm
              title={formatMessage({id: 'app.dict.edit-the-dict'})}
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
          <Authorized authority={'sys_dict_del'} noMatch={''}>
                <InlinePopconfirmBtn onConfirm={() => this.onDeleteOne(record)}/>
          </Authorized>
      </Menu.Item>
      <Menu.Divider/>
    </Menu>
  );

  /**
   *
   *
   * @type {StandardTableColumnProps<DictListItem>[]}
   * @memberof Dict
   */
  columns: StandardTableColumnProps<DictListItem>[] = [
    {
      title: <FormattedMessage id="app.dict.label.value"/>,
      dataIndex: 'value',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.dict.label.label"/>,
      dataIndex: 'label',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.dict.label.type"/>,
      dataIndex: 'type',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.dict.label.description"/>,
      dataIndex: 'description',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.dict.label.sort"/>,
      dataIndex: 'sort',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.dict.label.remarks"/>,
      dataIndex: 'remarks',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.dict.label.createTime"/>,
      dataIndex: 'createTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.dict.label.updateTime"/>,
      dataIndex: 'updateTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.dict.label.creator"/>,
      dataIndex: 'creator',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.dict.label.updater"/>,
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
      render: (text: string, record: DictListItem) => (
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
      key: 'value',
      label: <FormattedMessage id="app.dict.label.value"/>,
      name: 'value',
      itemRender: <Input placeholder="请输入数据值"/>,
    },
    {
      key: 'label',
      label: <FormattedMessage id="app.dict.label.label"/>,
      name: 'label',
      itemRender: <Input placeholder="请输入标签名"/>,
    },
    {
      key: 'type',
      label: <FormattedMessage id="app.dict.label.type"/>,
      name: 'type',
      itemRender: <Input placeholder="请输入类型"/>,
    },
    {
      key: 'description',
      label: <FormattedMessage id="app.dict.label.description"/>,
      name: 'description',
      itemRender: <Input placeholder="请输入描述"/>,
    },
    {
      key: 'sort',
      label: <FormattedMessage id="app.dict.label.sort"/>,
      name: 'sort',
      itemRender: <Input placeholder="请输入排序（升序）"/>,
    },
    {
      key: 'remarks',
      label: <FormattedMessage id="app.dict.label.remarks"/>,
      name: 'remarks',
      itemRender: <Input placeholder="请输入备注信息"/>,
    },
  ];

  //配置搜索项
  searchFormRender = (form: WrappedFormUtils) => {
    const {getFieldDecorator} = form;
    return (
      [
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.value"/>}>
            {getFieldDecorator('value')(<Input placeholder="请输入数据值"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.label"/>}>
            {getFieldDecorator('label')(<Input placeholder="请输入标签名"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.type"/>}>
            {getFieldDecorator('type')(<Input placeholder="请输入类型"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.description"/>}>
            {getFieldDecorator('description')(<Input placeholder="请输入描述"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.sort"/>}>
            {getFieldDecorator('sort')(<Input placeholder="请输入排序（升序）"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.remarks"/>}>
            {getFieldDecorator('remarks')(<Input placeholder="请输入备注信息"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.createTime"/>}>
            {getFieldDecorator('createTime')(<Input placeholder="请输入创建时间"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.updateTime"/>}>
            {getFieldDecorator('updateTime')(<Input placeholder="请输入更新时间"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.creator"/>}>
            {getFieldDecorator('creator')(<Input placeholder="请输入创建人"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.dict.label.updater"/>}>
            {getFieldDecorator('updater')(<Input placeholder="请输入修改人"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  showModal = (currentRecord: DictListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDeleteOne = (dict: DictListItem) => {
    const {dispatch} = this.props;
    const that = this;
    dispatch({
      type: 'system_dict/delete',
      payload: dict

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
      type: 'system_dict/deleteBatch',
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

  handleAdd = (fields: any) => this.handleAddOrEdit('system_dict/add', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('system_dict/update', fields);

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

  handleSelectRows = (rows: DictListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };


  //配置操作项
  operatorRender = () => (
    [
      <ModalForm
        title={formatMessage({id: 'app.dict.add-new-dict'})}
        onSubmit={this.handleAdd}
        element={
            <Authorized authority={'sys_dict_add'} noMatch={''}>
              <Button type="primary" icon="plus">
                <FormattedMessage id="component.common.text.add"/>
              </Button>
            </Authorized>
        }
        formItems={this.modalFormItems}
      />,

    ]

  );

  render() {
    const {
      dispatch,
      loading,
      // @ts-ignore
      system_dict: {data},
    } = this.props;
    const {selectedRows} = this.state;

    return (
      <TablePage<DictListItem>
        ref={this.pageRef}
        title={formatMessage({id: 'app.dict'})}
        action="system_dict/page"
        columns={this.columns}
        data={data}
        loading={loading}
        searchFormRender={this.searchFormRender}
        operatorRender={this.operatorRender}
        selectedRows={selectedRows}
        handleSelectRows={this.handleSelectRows}
        onDelete={(rows: DictListItem[]) => this.batchDelete(rows.map(row => row.id))}
        deleteBatchAuth={'sys_dict_deleteBatch'}
        dispatch={dispatch}
      />
    );
  }
}

export default connect(
  ({
     system_dict,
     loading,
   }: {
    system_dict: DictStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    system_dict,
    loading: loading.models.system_dict,
  }),
)(Dict);
