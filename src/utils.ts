import { ColumnType } from 'antd/lib/table';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import React from 'react';

export function memoEqual<T extends Record<string, any>>(
  objA: T,
  objB: T,
  options: {
    omit?: (keyof T)[];
  } = {},
) {
  const tempObjA = omit(objA, options.omit || []);
  const tempObjB = omit(objB, options.omit || []);
  return isEqual(tempObjA, tempObjB);
}

export function getField(key?: ColumnType<any>['key'], dataIndex?: ColumnType<any>['dataIndex']) {
  return String(key ?? dataIndex);
}

/**
 * antd 自身在省略和阴影存在时会加一层 ant-table-cell-content 来处理省略和滚动的阴影冲突的问题
 * 这里也进行处理一下
 * https://github.com/react-component/table/blob/master/src/Cell/index.tsx#L233
 */
export function getReadCellContent(
  children: React.ReactNode[],
  content: React.ReactNode,
  prefixCls: string,
) {
  /**
   * 取第一位，第 0 位是展开符，目前先不支持
   * https://github.com/react-component/table/blob/master/src/Cell/index.tsx#L254
   */
  const child = children[1];
  if (React.isValidElement(child) && child.props.className?.includes(`${prefixCls}-cell-content`)) {
    const finalContent = (content as any)?.[1]?.props?.className?.includes(
      `${prefixCls}-cell-content`,
    )
      ? (content as any)[1].props.children
      : content;

    return React.cloneElement(child, {}, finalContent);
  } else {
    return content;
  }
}
