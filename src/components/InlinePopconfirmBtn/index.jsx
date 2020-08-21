import React, { PureComponent } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Popconfirm } from 'antd';

import { FormattedMessage } from 'umi-plugin-react/locale';

import styles from './index.less';

/**
 * 行内联动popconfirm按钮
 */
export default class InlinePopconfirmBtn extends PureComponent {
  static defaultProps = {
    style: styles.textDanger,
    type: 'delete',
    title: <FormattedMessage id="component.inlinePopconfirmBtn.title" />,
    text: <FormattedMessage id="component.inlinePopconfirmBtn.text" />,
    onConfirm: () => {},
    onCancel: () => {},
  };

  render() {
    const { style, type, text, ...rest } = this.props;
    return (
      <Popconfirm {...rest}>
        <a className={style}>
          <LegacyIcon type={type} />
          {text}
        </a>
      </Popconfirm>
    );
  }
}
