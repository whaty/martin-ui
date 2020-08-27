import { Drawer } from 'antd';
import React, { Component } from 'react';

export interface RelationDrawerProps {
  visible?: boolean;
  childrenDrawer?: boolean;
  onClose: () => void;
  title: string;
  width: number;
  closable: boolean;
  destroyOnClose: boolean;
  relationRender: () => React.ReactNode;
}

interface RelationDrawerState {}

export default class RelationDrawer extends Component<RelationDrawerProps, RelationDrawerState> {
  static defaultProps = {
    visible: false,
    childrenDrawer: false,
    onClose: () => {},
    title: '',
    width: 520,
    closable: false,
  };

  constructor(props: RelationDrawerProps) {
    super(props);
  }

  render() {
    const { title, width, closable, onClose, visible, destroyOnClose, relationRender } = this.props;
    return (
      <>
        <Drawer
          title={title}
          width={width}
          closable={closable}
          onClose={onClose}
          visible={visible}
          destroyOnClose={destroyOnClose}
        >
          {relationRender && relationRender()}
        </Drawer>
      </>
    );
  }
}
