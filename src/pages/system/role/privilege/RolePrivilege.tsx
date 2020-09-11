import React, {Component, ReactNode, RefObject} from "react";
import {Button, Descriptions, Divider, Empty, message, Steps,} from "antd";
import styles from "@/pages/system/role/role.less";
import {Dispatch} from "redux";
import Menu from "@/pages/system/role/privilege/menu";
import Operation from "@/pages/system/role/privilege/operation";

const {Step} = Steps;


interface StepItem {
  title: string,
  content: string | ReactNode,
}


interface RolePrivilegePros {
  dispatch: Dispatch<any>;
  treeData: any[];
  checkedKeys: string[] | {
    checked: string[];
    halfChecked: string[];
  };
  roleId?: number;
  roleName: string;

}

interface RolePrivilegeState {
  currentStep: number;
  checkedKeys: string[] | {
    checked: string[];
    halfChecked: string[];
  };
  selectedKeys?: string[];
  defaultExpandAll: boolean;
}

export default class RolePrivilege extends Component<RolePrivilegePros, RolePrivilegeState> {
  static defaultProps = {
    treeData: [],
  }

  constructor(props: RolePrivilegePros) {
    super(props);
    this.state = {
      checkedKeys: props.checkedKeys,
      currentStep: 0,
      defaultExpandAll: false,

    };
  }

  private menuRef: RefObject<Menu> = React.createRef();
  private operationRef: RefObject<Operation> = React.createRef();

  componentWillMount(): void {
    this.getMenus();
  }


  getMenus = () => {
    let menu: ReactNode = <></>;
    console.log('getMenus');
    const {dispatch, roleId} = this.props;
    dispatch({
      type: "system_role/getAllMenuByRole",
      payload: {id: roleId}
      // @ts-ignore
    }).then(response => {
      if (response && response.code === 200) {
        let treeData = response.data.treeData;
        console.log('treeData', treeData);
        let checkedKeys1 = response.data.defaultSelectedKeys;
        console.log('checkedKeys1', checkedKeys1);

        menu = <>
          <Menu
            ref={this.menuRef}
            dispatch={this.props.dispatch}
            checkedKeys={checkedKeys1}
            roleName={this.props.roleName}
            roleId={this.props.roleId}
            treeData={treeData}
          >
          </Menu>
        </>;
        this.steps[0] = {
          title: '菜单',
          content: menu
        }
        console.log(107, 'getMenus-->menus');
        this.setState({
          checkedKeys: checkedKeys1,
          selectedKeys: checkedKeys1,
        }, () => {
          console.log(110, 'getMenus-->callback');
        });
        return menu;
      } else {
        message.error(response.msg);
      }
    });
    return menu;
  }

  getOperations = () => {
    let operation: ReactNode = <></>;
    console.log('getOperation');
    const {dispatch, roleId} = this.props;
    dispatch({
      type: "system_role/getOperationByCheckedMenus",
      payload: {roleId: roleId}
      // @ts-ignore
    }).then(response => {
      if (response && response.code === 200) {
        let operationData = response.data;

        operation = <>
          <Operation
            ref={this.operationRef}
            dispatch={this.props.dispatch}
            roleName={this.props.roleName}
            roleId={this.props.roleId}
            operationData={operationData}
          >
          </Operation>
        </>;
        this.steps[1] = {
          title: '按钮',
          content: operation
        }
        console.log('getOperation-->operation');
        this.setState({
          checkedKeys: [],
          selectedKeys: [],
        }, () => {
          console.log(110, 'getOperations-->callback');
        });
        return operation;
      } else {
        message.error(response.msg);
      }
    });
    return operation;
  }


  getFiles = () => {
    return (
      <>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
      </>
    );
  }

  getElements = () => {
    return (
      <>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
      </>

    );
  }


  next() {
    const {currentStep} = this.state;
    if (currentStep === 0) {
      let operate = {
        title: "按钮",
        content: this.getOperations(),
      }
      this.steps[1] = operate;
    } else if (currentStep === 1) {
      let file = {
        title: "文件",
        content: this.getFiles(),
      }
      this.steps[2] = file;
    } else if (currentStep === 2) {
      let element = {
        title: "页面元素",
        content: this.getElements(),
      }
      this.steps[3] = element;
    }
    this.setState({currentStep: currentStep + 1});
  }


  save() {
    console.log('save');
    const {currentStep} = this.state;
    console.log('currentStep', currentStep);
    if (currentStep === 0) {
      console.log(193, this.menuRef.current);
      if (this.menuRef.current) {
        console.log(196, 'begin');
        this.menuRef.current.saveCheckedMenus();
        console.log(198, 'end');
      }
    } else if (currentStep === 1) {
      console.log(193, this.menuRef.current);
      if (this.operationRef.current) {
        console.log(196, 'begin');
        this.operationRef.current.saveCheckedOperations();
        console.log(198, 'end');
      }
    } else if (currentStep === 2) {
      let element = {
        title: "页面元素",
        content: this.getElements(),
      }
      this.steps[3] = element;
    }
  }


  prev() {
    const {currentStep} = this.state;
    if (currentStep === 1) {
      let menu = {
        title: "菜单",
        content: this.getMenus(),
      }
      this.steps[0] = menu;
    } else if (currentStep === 2) {
      let operation = {
        title: "按钮",
        content: this.getOperations(),
      }
      this.steps[1] = operation;
    } else if (currentStep === 3) {
      let file = {
        title: "文件",
        content: this.getFiles(),
      }

      this.steps[2] = file;
    }
    this.setState({currentStep: currentStep - 1});
  }

  steps: StepItem[] = [
    {
      title: '菜单',
      content: '',
    },
    {
      title: '按钮',
      content: '',
    },
    {
      title: '文件',
      content: '',
    },
    {
      title: '页面元素',
      content: '',
    },
  ];

  render() {
    const {roleName} = this.props;
    const {currentStep} = this.state;
    console.log('role-privilege-render');
    return (
      <>
        <Divider style={{marginBottom: 32}}/>
        <Descriptions
          title='当前用户'
          style={{marginBottom: 32}}
        >
          <Descriptions.Item
            label='角色名称'
          >
            {roleName}
          </Descriptions.Item>
        </Descriptions>
        <Steps current={currentStep}>
          {this.steps.map(item => (
            <Step key={item.title} title={item.title}/>
          ))}
        </Steps>
        <div className={styles.stepsContent}>{this.steps[currentStep].content}</div>
        <div className={styles.stepsAction}>
          <Button style={{margin: '0 8px'}} type="primary" onClick={() => this.save()}>
            保存
          </Button>
          {currentStep < this.steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {currentStep === this.steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              完成
            </Button>
          )}
          {currentStep > 0 && (
            <Button style={{margin: '0 8px'}} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
        </div>
      </>
    )
      ;
  }
}
