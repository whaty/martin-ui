import {Dispatch} from "redux";
import React, {Component} from "react";
import {Checkbox, Col, Divider, Empty, message, Row} from "antd";
import {CheckboxValueType} from "antd/lib/checkbox/Group";


interface OperationProps {
  dispatch: Dispatch<any>;
  operationData: any[];
  roleId?: number;
  roleName: string;
}

interface OperationCheckedGroup {
  key: number,
  checkedKeys: Array<CheckboxValueType>;
}

interface OperationState {
  operationData: any[];
  checkedKeys?: Array<CheckboxValueType>;
  operationCheckedGroup: Array<OperationCheckedGroup>;
}


export default class Operation extends Component<OperationProps, OperationState> {
  static defaultProps = {}

  constructor(props: OperationProps) {
    super(props);
    const operationData = props.operationData;
    const checkedGroups: Array<OperationCheckedGroup> = [];
    operationData.forEach((value, index, array) => {
      checkedGroups.push({
        key: index,
        checkedKeys: value.defaultValue,
      });
    });
    console.log(39, checkedGroups);
    this.state = {
      operationData: operationData,
      operationCheckedGroup: checkedGroups,
    };
  }

  saveCheckedOperations = () => {
    console.log('saveCheckedOperations');
    const {operationCheckedGroup} = this.state;
    let checkedKeys: Array<CheckboxValueType> = [];
    operationCheckedGroup.forEach((value) => {
      checkedKeys = checkedKeys.concat(value.checkedKeys);
    });
    const {dispatch} = this.props;
    dispatch({
      type: "system_role/saveCheckedOperations",
      payload: {
        roleId: this.props.roleId,
        checkedKeys: checkedKeys
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

  onChange = (key: number, checkedValue: Array<CheckboxValueType>) => {
    let {operationCheckedGroup} = this.state;
    operationCheckedGroup[key] = {
      key: key,
      checkedKeys: checkedValue,
    };
    this.setState({
      operationCheckedGroup: operationCheckedGroup,
    });
  };


  renderOperations = () => {
    const {operationData} = this.state;
    const operations: any[] = [];
    if (!operationData || operationData.length == 0) {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
    }
    operationData.forEach((value: any, index: number) => {
      operations.push(
        <>
          <Divider orientation="left">
            {value.menuName}
          </Divider>
          <Checkbox.Group
            style={{width: '100%', margin: '0 8px'}}
            onChange={this.onChange.bind(this, index)}
            defaultValue={value.defaultValue}
            key={index}
          >
            <Row>
              {
                value.operations.length > 0 && this.getOperation(value.operations)
              }
            </Row>
          </Checkbox.Group>
        </>
      );
      console.log(78, operations);
    });
    return operations;
  }

  getOperation = (operations: any[]) => {
    const operations1: any[] = [];
    operations.forEach((operation: any, index: number) => {
      operations1.push(
        <>
          <Col span={12}>
            <Checkbox value={operation.value}>{operation.name}</Checkbox>
          </Col>
        </>
      );
    });
    return operations1;
  }

  render() {
    console.log('Operation-render');
    return (
      <>
        {this.renderOperations()}
      </>
    );
  }
}
