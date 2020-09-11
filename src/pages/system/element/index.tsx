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


import {ElementListItem, ElementStateType} from './model';
import {DownOutlined} from "@ant-design/icons/lib";
import Authorized from "@/utils/Authorized";

interface ElementProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  element: ElementStateType;
}

interface ElementState {
  selectedRows: ElementListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: ElementListItem;
}

class Element extends Component<ElementProps, ElementState> {
  state: ElementState = {
    selectedRows: [],
    showLoginScriptModal: false,
  };

  private pageRef: RefObject<TablePage<ElementListItem>> = React.createRef();

  geDropDownMenus = (record: ElementListItem) => (
    <Menu>
      <Menu.Item key="0">
        <Authorized authority={'sys_element_edit'} noMatch={''}>
            <ModalForm
              title={formatMessage({id: 'app.element.edit-the-element'})}
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
          <Authorized authority={'sys_element_del'} noMatch={''}>
                <InlinePopconfirmBtn onConfirm={() => this.onDeleteOne(record)}/>
          </Authorized>
      </Menu.Item>
      <Menu.Divider/>
    </Menu>
  );

  /**
   *
   *
   * @type {StandardTableColumnProps<ElementListItem>[]}
   * @memberof Element
   */
  columns: StandardTableColumnProps<ElementListItem>[] = [
    {
      title: <FormattedMessage id="app.element.label.name"/>,
      dataIndex: 'name',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.element.label.authority"/>,
      dataIndex: 'authority',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.element.label.url"/>,
      dataIndex: 'url',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.element.label.sort"/>,
      dataIndex: 'sort',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.element.label.createTime"/>,
      dataIndex: 'createTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.element.label.updateTime"/>,
      dataIndex: 'updateTime',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.element.label.creator"/>,
      dataIndex: 'creator',
      sorter: true,
      width: 150,
    },
    {
      title: <FormattedMessage id="app.element.label.updater"/>,
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
      render: (text: string, record: ElementListItem) => (
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
      label: <FormattedMessage id="app.element.label.name"/>,
      name: 'name',
      itemRender: <Input placeholder="请输入页面元素名称"/>,
    },
    {
      key: 'authority',
      label: <FormattedMessage id="app.element.label.authority"/>,
      name: 'authority',
      itemRender: <Input placeholder="请输入权限编码，以element_开头"/>,
    },
    {
      key: 'url',
      label: <FormattedMessage id="app.element.label.url"/>,
      name: 'url',
      itemRender: <Input placeholder="请输入页面元素路径"/>,
    },
    {
      key: 'sort',
      label: <FormattedMessage id="app.element.label.sort"/>,
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
          <Form.Item label={<FormattedMessage id="app.element.label.name"/>}>
            {getFieldDecorator('name')(<Input placeholder="请输入页面元素名称"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.element.label.authority"/>}>
            {getFieldDecorator('authority')(<Input placeholder="请输入权限编码，以element_开头"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.element.label.url"/>}>
            {getFieldDecorator('url')(<Input placeholder="请输入页面元素路径"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.element.label.sort"/>}>
            {getFieldDecorator('sort')(<Input placeholder="请输入排序值"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.element.label.createTime"/>}>
              {getFieldDecorator('createTime')(<DatePicker showToday format="YYYY-MM-DD" />)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.element.label.updateTime"/>}>
              {getFieldDecorator('updateTime')(<DatePicker showToday format="YYYY-MM-DD" />)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.element.label.creator"/>}>
            {getFieldDecorator('creator')(<Input placeholder="请输入创建人"/>)}
          </Form.Item>
        </Col>,
         <Col md={12} sm={24}>
          <Form.Item label={<FormattedMessage id="app.element.label.updater"/>}>
            {getFieldDecorator('updater')(<Input placeholder="请输入修改人"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  showModal = (currentRecord: ElementListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDeleteOne = (element: ElementListItem) => {
    const {dispatch} = this.props;
    const that = this;
    dispatch({
      type: 'system_element/delete',
      payload: element

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
      type: 'system_element/deleteBatch',
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

  handleAdd = (fields: any) => this.handleAddOrEdit('system_element/add', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('system_element/update', fields);

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

  handleSelectRows = (rows: ElementListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };


  //配置操作项
  operatorRender = () => (
    [
        <Authorized authority={'sys_element_add'} noMatch={''}>
          <ModalForm
            title={formatMessage({id: 'app.element.add-new-element'})}
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
      system_element: {data},
    } = this.props;
    const {selectedRows} = this.state;

    return (
      <TablePage<ElementListItem>
        ref={this.pageRef}
        title={formatMessage({id: 'app.element'})}
        action="system_element/page"
        columns={this.columns}
        data={data}
        loading={loading}
        searchFormRender={this.searchFormRender}
        operatorRender={this.operatorRender}
        selectedRows={selectedRows}
        handleSelectRows={this.handleSelectRows}
        onDelete={(rows: ElementListItem[]) => this.batchDelete(rows.map(row => row.id))}
        deleteBatchAuth={'sys_element_deleteBatch'}
        dispatch={dispatch}
      />
    );
  }
}

export default connect(
  ({
     system_element,
     loading,
   }: {
    system_element: ElementStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    system_element,
    loading: loading.models.system_element,
  }),
)(Element);
