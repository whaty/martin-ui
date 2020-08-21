import React, {Component, ReactNode} from 'react';
import {Alert, Button, Checkbox, Drawer, Dropdown, Menu, Tooltip} from 'antd';
import {isFunction} from 'lodash';

import {FormattedMessage} from 'umi-plugin-react/locale';
import {StandardTableColumnProps} from '@/components/StandardTable';

import styles from '@/components/Page/TablePage/index.less';
import {WrappedFormUtils} from "antd/es/form/Form";
import {FilterOutlined} from "@ant-design/icons/lib";
import SearchPanel from "@/components/Page/TablePage/SearchPanel";

export interface ComplexOperatorRender {
  left: () => React.ReactNode;
  right: {
    title: ReactNode;
    render?: () => React.ReactNode;
  }[];
}

interface OperatorPanelProps {
  columns: StandardTableColumnProps<any>[];
  selectedRows: any[];
  batchDelete: boolean;
  onBatchDelete: React.MouseEventHandler<HTMLElement>;
  onSearch: React.MouseEventHandler<HTMLElement>;
  doSearch: React.MouseEventHandler<HTMLElement>;
  onSearchReset: React.MouseEventHandler<HTMLElement>;
  searchFormRender?: (form: WrappedFormUtils) => React.ReactNode;
  onSelectedDisplayColumnKeyChange?: (selectedKeys: string[]) => void;
  operatorRender: (() => React.ReactNode) | ComplexOperatorRender;
}

interface OperatorPanelState {
  /**
   * controlling whether the visibility of dropdown
   */
  switchDropdownVisible: boolean;
  switchSearchPanelVisible: boolean;
  selectedDisplayColumnsKey: string[];
  searchFormValues: any;

}

class OperatorPanel extends Component<OperatorPanelProps, OperatorPanelState> {
  constructor(props: OperatorPanelProps) {
    super(props);
    this.state = {
      switchDropdownVisible: false,
      switchSearchPanelVisible: false,
      selectedDisplayColumnsKey: props.columns.map((x, index) =>
        (x.key || x.dataIndex || index).toString(),
      ),
      searchFormValues: '',
    };
  }

  showSearchPanel = () => {
    this.setState({
      switchSearchPanelVisible: true,
    });
  };

  closeSearchPanel = () => {
    this.setState({
      switchSearchPanelVisible: false,
    });
  };

  onSelectedDisplayColumnKeyChangeCallback(keys: string[]) {
    this.setState({selectedDisplayColumnsKey: keys});

    const {onSelectedDisplayColumnKeyChange} = this.props;
    if (onSelectedDisplayColumnKeyChange) {
      onSelectedDisplayColumnKeyChange(keys);
    }
  }

  handleMenuItemClick = (info: { keyPath: string; key: string }) => {
    const {selectedDisplayColumnsKey} = this.state;
    const index = selectedDisplayColumnsKey.indexOf(info.key);
    if (index >= 0) {
      selectedDisplayColumnsKey.splice(index, 1);
    } else {
      selectedDisplayColumnsKey.push(info.key);
    }
    this.onSelectedDisplayColumnKeyChangeCallback(selectedDisplayColumnsKey);
  };

  handleSwitchMenuSelectAll = () => {
    const {columns} = this.props;
    const selectedDisplayColumnsKey = columns.map((x, index) =>
      (x.key || x.dataIndex || index).toString(),
    );
    this.onSelectedDisplayColumnKeyChangeCallback(selectedDisplayColumnsKey);
  };

  handleSwitchMenuSelectReverse = () => {
    const {columns} = this.props;
    const {selectedDisplayColumnsKey} = this.state;
    const filterColumns = columns.filter(
      (x, index) =>
        selectedDisplayColumnsKey.indexOf((x.key || x.dataIndex || index).toString()) < 0,
    );
    this.onSelectedDisplayColumnKeyChangeCallback(
      filterColumns.map((x, index) => (x.key || x.dataIndex || index).toString()),
    );
  };

  handleSwitchMenusVisibleChange = (flag: boolean) => {
    this.setState({switchDropdownVisible: flag});
  };

  renderSwitchMenus(items: StandardTableColumnProps<any>[]): React.ReactElement<any>[] {
    const {selectedDisplayColumnsKey} = this.state;

    return items.map((item, index) => {
      const key = (item.key || item.dataIndex || index).toString();
      return (
        <Menu.Item key={key}>
          <Checkbox checked={selectedDisplayColumnsKey.indexOf(key) >= 0}/>
          <span style={{marginLeft: 8}}>{item.title}</span>
        </Menu.Item>
      );
    });
  }

  renderSwitchDropdown(): React.ReactElement {
    const {columns} = this.props;

    const menu = (
      // @ts-ignore
      <Menu multiple onClick={this.handleMenuItemClick}>
        {this.renderSwitchMenus(columns)}
        <div className="ant-table-filter-dropdown-btns">
          <a
            className="ant-table-filter-dropdown-link confirm"
            onClick={this.handleSwitchMenuSelectAll}
          >
            {<FormattedMessage id="app.common.label.select-all"/>}
          </a>
          <a
            className="ant-table-filter-dropdown-link clear"
            onClick={this.handleSwitchMenuSelectReverse}
          >
            {<FormattedMessage id="app.common.label.select-reversely"/>}
          </a>
        </div>
      </Menu>
    );

    return (
      <Dropdown
        overlay={menu}
        onVisibleChange={this.handleSwitchMenusVisibleChange}
        visible={this.state.switchDropdownVisible}
      >
        <Button shape="circle" icon="appstore"/>
      </Dropdown>
    );
  }

  onSearchReset = () => {

    this.setState(
      {
        searchFormValues: {},
      },

    );
  };

  renderFilterFooter(){
    return (
      <>
        <Alert
          message="Informational Notes"
          description="Additional description and information about copywriting."
          type="info"
          showIcon
        />
      </>
    );
  }


  renderRightDefault() {
    const {searchFormRender,onSearchReset,onSearch} = this.props;
    return (
      <>
        <Tooltip title={<FormattedMessage id="component.common.text.refresh"/>}>
          <Button shape="circle" icon="sync" onClick={onSearchReset}/>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="component.common.text.filter"/>}>
          <Button shape="circle" onClick={this.showSearchPanel}>
            <FilterOutlined/>
          </Button>
          <Drawer
            title={<FormattedMessage id="component.common.text.filter"/>}
            width={500}
            getContainer={false}
            mask={false}
            onClose={this.closeSearchPanel}
            visible={this.state.switchSearchPanelVisible}
            bodyStyle={{paddingBottom: 80}}
          >
            {(
              searchFormRender && (
                <SearchPanel
                  onSearch={onSearch}
                  onReset={this.onSearchReset}
                  //@ts-ignore
                  searchFormRender={searchFormRender}
                />)
            )}
          </Drawer>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="app.common.label.columns-display-settings"/>}>
          {this.renderSwitchDropdown()}
        </Tooltip>
      </>
    );
  }

  renderRight() {
    const {onSearch} = this.props;
    // @ts-ignore
    const {right} = this.props.operatorRender;
    if (right) {
      return right.map((x: { title: ReactNode; render?: () => React.ReactNode }) => {
        if (x.title === 'refresh') {
          return (
            <Tooltip
              key={x.title.toString()}
              title={<FormattedMessage id="component.common.text.refresh"/>}
            >
              <Button shape="circle" icon="sync" onClick={onSearch}/>
            </Tooltip>
          );
        }
        if (x.title === 'display-settings') {
          return (
            <Tooltip
              key={x.title.toString()}
              title={<FormattedMessage id="app.common.label.columns-display-settings"/>}
            >
              {this.renderSwitchDropdown()}
            </Tooltip>
          );
        }
        return (
          // @ts-ignore
          <Tooltip key={x.title.toString()} title={x.title}>
            {x.render && x.render()}
          </Tooltip>
        );
      });
    }
    return this.renderRightDefault();
  }

  render() {
    const {selectedRows, batchDelete, operatorRender, onBatchDelete} = this.props;
    return (
      <div className={styles.tableListOperator}>
        <div>
          {(isFunction(operatorRender) && operatorRender()) ||
          // @ts-ignore
          (isFunction(operatorRender.left) && operatorRender.left())}
          {selectedRows.length > 0 && batchDelete && (
            <Button onClick={onBatchDelete} icon="delete" type="danger">
              <FormattedMessage id="component.common.text.batch-delete"/>
            </Button>
          )}
        </div>
        <div className={styles.tableListOperatorRight}>
          {(isFunction(operatorRender) && this.renderRightDefault()) || this.renderRight()}
        </div>
      </div>
    );
  }
}

export default OperatorPanel;
