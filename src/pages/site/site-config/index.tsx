import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Col, Divider, Input, message, Tag, Tooltip } from 'antd';
import React, {Component, RefObject} from 'react';

import {Dispatch} from 'redux';
import {connect} from 'dva';

import { WrappedFormUtils } from '@ant-design/compatible/es/form/Form';
import {formatMessage, FormattedMessage} from 'umi-plugin-react/locale';

import {TablePage} from '@/components/Page';
import {StandardTableColumnProps} from '@/components/StandardTable';
import InlinePopconfirmBtn from '@/components/InlinePopconfirmBtn';
import {ModalForm} from '@/components/Form';


import {SiteListItem, SiteStateType} from './model';

import {openWindow} from '@/utils/utils';

interface SiteProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  site: SiteStateType;
}

interface SiteState {
  selectedRows: SiteListItem[];
  showLoginScriptModal: boolean;
  currentRecord?: SiteListItem;
}

class Site extends Component<SiteProps, SiteState> {
  state: SiteState = {
    selectedRows: [],
    showLoginScriptModal: false,
  };

  private pageRef: RefObject<TablePage<SiteListItem>> = React.createRef();
  /**
   *
   *
   * @type {StandardTableColumnProps<SiteListItem>[]}
   * @memberof Site
   */
  columns: StandardTableColumnProps<SiteListItem>[] = [
    {
      title: 'LOGO',
      dataIndex: 'logo',
      render: (text: string, record: SiteListItem) => {
        if (text) {
          return (
            <div style={{height: 50}}>
              <img src={text} style={{height: '100%'}} alt={record.name}/>
            </div>
          );
        }
        return '暂无图片';
      },
      width: 120,
    },
    {
      title: <FormattedMessage id="app.site.label.name"/>,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Tooltip placement="topLeft" title={text}>
        <div style={{
          maxWidth: '100px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {text}
        </div>
      </Tooltip>
    },
    {
      title: <FormattedMessage id="app.site.label.short-name"/>,
      dataIndex: 'shortName',
      width: 100,
    },
    {
      title: <FormattedMessage id="app.site.label.home-page"/>,
      dataIndex: 'homePage',
      render: text => (
        <a
          href={text}
          target="_blank"
          rel="noreferrer noopener"
          title={formatMessage({id: 'app.common.label.open-in-new-window'})}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            openWindow(text);
          }}
        >
          <Tooltip placement="topLeft" title={text}>
            <div style={{
              maxWidth: '150px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {text}
            </div>
          </Tooltip>
        </a>
      ),
      width: 250,
    },
    {
      title: <FormattedMessage id="app.site.label.timeout"/>,
      dataIndex: 'timeOut',
      width: 100,
    },
    {
      title: <FormattedMessage id="app.site.label.rate-limit"/>,
      dataIndex: 'rateLimit',
      render: text => {
        if (typeof text === 'undefined') {
          return (
            <Tag color="green">
              <FormattedMessage id="app.site.label.no-limit"/>
            </Tag>
          );
        }
        return text;
      },
      width: 100,
    },
    {
      title: <FormattedMessage id="app.site.label.retry-times"/>,
      dataIndex: 'retryTimes',
      width: 100,
    },
    {
      title: <FormattedMessage id="app.site.label.cycle-retry-times"/>,
      dataIndex: 'cycleRetryTimes',
      width: 100,
    },
    {
      title: <FormattedMessage id="app.site.label.charset"/>,
      dataIndex: 'charset',
      width: 100,
    },
    {
      title: 'UserAgent',
      dataIndex: 'userAgent',
      width: 100,
    },
    {
      title: <FormattedMessage id="app.site.label.headers"/>,
      dataIndex: 'headers',
      width: 100,
    },
    {
      title: <FormattedMessage id="app.site.label.cookies"/>,
      dataIndex: 'defaultCookies',
      width: 100,
    },
    // 定义最后一列操作按钮
    {
      title: <FormattedMessage id="app.common.label.operation"/>,
      align: 'center',
      key: 'operation',
      width: 120,
      fixed: 'right',
      render: (text: string, record: SiteListItem) => (
        <>
          <ModalForm
            title={formatMessage({id: 'app.site.edit-the-site'})}
            onSubmit={this.handleEdit}
            element={
              <a>
                <EditOutlined />
                <FormattedMessage id="component.common.text.edit"/>
              </a>
            }
            formItems={this.modalFormItems}
            formValues={record}
          />
          <Divider type="vertical"/>
          <InlinePopconfirmBtn onConfirm={() => this.onDelete([record.id])}/>
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
      key: 'homePage',
      label: <FormattedMessage id="app.site.label.home-page"/>,
      name: 'homePage',
      rules: [
        {
          required: true,
          message: '首页链接不能为空',
        },
        {
          type: 'url',
          message: '请输入正确的链接地址!',
        },
      ],
      itemRender: <Input placeholder="首页链接"/>,
    },
    {
      key: 'name',
      label: <FormattedMessage id="app.site.label.name"/>,
      name: 'name',
      rules: [
        {
          required: true,
          message: '站点名称不能为空',
        },
      ],
      itemRender: <Input placeholder="请输入站点全称"/>,
    },
    {
      key: 'shortName',
      label: <FormattedMessage id="app.site.label.short-name"/>,
      name: 'shortName',
      itemRender: <Input placeholder="请输入站点简称"/>,
    },
    {
      key: 'logo',
      label: 'LOGO',
      name: 'logo',
      itemRender: <Input placeholder="请输入LOGO链接地址"/>,
    },
    {
      key: 'timeOut',
      label: <FormattedMessage id="app.site.label.timeout"/>,
      name: 'timeOut',
      itemRender: <Input placeholder="超时时间，单位s(秒)"/>,
      toggleField: true,
    },
    {
      key: 'charset',
      label: <FormattedMessage id="app.site.label.charset"/>,
      name: 'charset',
      itemRender: <Input placeholder="请输入字符编码"/>,
      toggleField: true,
    },
    {
      key: 'retryTimes',
      label: <FormattedMessage id="app.site.label.retry-times"/>,
      name: 'retryTimes',
      itemRender: <Input placeholder="请输入重试次数"/>,
      toggleField: true,
    },
    {
      key: 'cycleRetryTimes',
      label: <FormattedMessage id="app.site.label.cycle-retry-times"/>,
      name: 'cycleRetryTimes',
      itemRender: <Input placeholder="请输入循环重试次数"/>,
      toggleField: true,
    },
    {
      key: 'rateLimit',
      label: <FormattedMessage id="app.site.label.rate-limit"/>,
      name: 'rateLimit',
      itemRender: (
        <Input placeholder={formatMessage({id: 'app.site.placeholder.rate-limit'})}/>
      ),
      toggleField: true,
    },
    {
      key: 'userAgent',
      label: 'UserAgent',
      name: 'userAgent',
      itemRender: <Input.TextArea placeholder="请输入UserAgent" style={{minHeight: 100}}/>,
      toggleField: true,
    },
    {
      key: 'headers',
      label: <FormattedMessage id="app.site.label.headers"/>,
      name: 'headers',
      itemRender: <Input.TextArea placeholder="请输入Headers" style={{minHeight: 150}}/>,
      toggleField: true,
    },
    {
      key: 'defaultCookies',
      label: <FormattedMessage id="app.site.label.cookies"/>,
      name: 'defaultCookies',
      itemRender: <Input.TextArea placeholder="请输入默认Cookies" style={{minHeight: 100}}/>,
      toggleField: true,
    },
  ];

  showModal = (currentRecord: SiteListItem) => {
    this.setState({showLoginScriptModal: true, currentRecord});
  };

  /**
   * 删除回调函数
   * @param ids
   */
  onDelete = (ids: string[]) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;

    if (!ids) return;
    const that = this;
    dispatch({
      type: 'site/remove',
      payload: {
        ids: ids.join(','),
      },
    })
    // @ts-ignore
      .then(() => {
        that.setState({
          selectedRows: selectedRows.filter(item => ids.indexOf(item.id) === -1),
        });
        if (that.pageRef.current) {
          that.pageRef.current.doSearch();
        }
        message.success(formatMessage({id: 'component.common.text.deleted-success'}));
      })
      .catch(() => {
      });
  };

  handleAdd = (fields: any) => this.handleAddOrEdit('site/create', fields);

  handleEdit = (fields: any) => this.handleAddOrEdit('site/modify', fields);

  handleAddOrEdit = (type: string, fields: any) => {
    const {dispatch} = this.props;
    const that = this;
    return dispatch({
      type,
      payload: fields,
      // @ts-ignore
    }).then(() => {
      if (that.pageRef.current) {
        that.pageRef.current.doSearch();
      }
      message.success(
        formatMessage({
          id: `component.common.text.${(type.indexOf('create') !== -1 && 'add') || 'edit'}-success`,
        }),
      );
    });
  };

  handleSelectRows = (rows: SiteListItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  //配置搜索项
  searchFormRender = (form: WrappedFormUtils) => {
    const {getFieldDecorator} = form;
    return (
      [
        <Col md={8} sm={24}>
          <Form.Item label={<FormattedMessage id="app.site.filter.name"/>}>
            {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
          </Form.Item>
        </Col>,
        <Col md={8} sm={24}>
          <Form.Item label={<FormattedMessage id="app.site.filter.name"/>}>
            {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
          </Form.Item>
        </Col>,
        <Col md={8} sm={24}>
          <Form.Item label={<FormattedMessage id="app.site.filter.name"/>}>
            {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
          </Form.Item>
        </Col>,
        <Col md={8} sm={24}>
          <Form.Item label={<FormattedMessage id="app.site.filter.name"/>}>
            {getFieldDecorator('name')(<Input placeholder="请输入"/>)}
          </Form.Item>
        </Col>,

      ]
    );
  };

  //配置操作项
  operatorRender = () => (
    [
      <ModalForm
        title={formatMessage({id: 'app.site.add-new-site'})}
        onSubmit={this.handleAdd}
        element={
          <Button type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="component.common.text.add"/>
          </Button>
        }
        formItems={this.modalFormItems}
      />,

    ]

  );

  render() {
    const {
      dispatch,
      loading,
      site: {data},
    } = this.props;
    const {selectedRows} = this.state;

    return (
      <>
        <TablePage<SiteListItem>
          ref={this.pageRef}
          title={formatMessage({id: 'menu.site'})}
          action="site/fetch"
          columns={this.columns}
          data={data}
          loading={loading}
          searchFormRender={this.searchFormRender}
          operatorRender={this.operatorRender}
          selectedRows={selectedRows}
          handleSelectRows={this.handleSelectRows}
          onDelete={(rows: SiteListItem[]) => this.onDelete(rows.map(row => row.id))}
          dispatch={dispatch}
        />
      </>
    );
  }
}

export default connect(
  ({
     site,
     loading,
   }: {
    site: SiteStateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    site,
    loading: loading.models.site,
  }),
)(Site);
