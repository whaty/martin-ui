import {Dispatch} from "redux";
import React, {Component} from "react";
import {message, Tree} from "antd";
import {AntTreeNodeCheckedEvent, AntTreeNodeSelectedEvent} from "antd/lib/tree";

interface MenuProps {
  dispatch: Dispatch<any>;
  treeData: any[];
  checkedKeys: string[];
  roleId?: number;
  roleName: string;
}

interface MenuState {
  checkedKeys: string[] | {
    checked: string[];
    halfChecked: string[];
  },
  selectedKeys?: string[];
  defaultExpandAll?: boolean;
}

const {TreeNode} = Tree;

export default class Menu extends Component<MenuProps, MenuState> {
  static defaultProps = {
    treeData: [],
  }

  constructor(props: MenuProps) {
    super(props);
    this.state = {
      checkedKeys: props.checkedKeys,
    };
  }

  componentWillReceiveProps(): void {
    console.log('menu-componentWillReceiveProps')
    console.log(this.props.checkedKeys)
    this.setState({
      checkedKeys: this.props.checkedKeys,
    });
  }

  onMenuCheck = (checkedKeys: string[] | {
    checked: string[];
    halfChecked: string[];
  }, e: AntTreeNodeCheckedEvent) => {
    this.setState({
      checkedKeys: checkedKeys,
    });
    console.log(32, 'onCheck', checkedKeys, e.checked);
  };


  onMenuSelected = (selectedKeys: string[], e: AntTreeNodeSelectedEvent) => {
    this.setState({
      selectedKeys: selectedKeys,
    });
    console.log(32, 'onMenuSelected', selectedKeys, e.selected);
  };

  renderMenuTreeNodes = (data: any[]) =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderMenuTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.key}></TreeNode>;
    });

  onExpandAllSwitchChange = (checked: boolean, event: MouseEvent) => {
    console.log(93, checked);

    this.setState({
      defaultExpandAll: !checked,
    });
  }

  saveCheckedMenus = () => {
    console.log('saveCheckedMenus');
    const {dispatch} = this.props;
    dispatch({
      type: "system_role/saveCheckedMenus",
      payload: {
        checkedKeys: this.state.checkedKeys,
        roleId: this.props.roleId
      }
      // @ts-ignore
    }).then(response => {
        if (response && response.code === 200) {
          message.success("保存成功");
        } else {
          message.error(response.msg);
        }
      }
    );
  }

  render() {
    console.log('menu-render');
    return (
      <>
        <Tree
          checkable
          defaultExpandAll={this.state.defaultExpandAll}
          onCheck={this.onMenuCheck}
          checkedKeys={this.state.checkedKeys}
          key={this.props.roleId}
        >
          {this.renderMenuTreeNodes(this.props.treeData)}
        </Tree>
      </>
    );
  }
}
