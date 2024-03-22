import { CaretDownOutlined } from '@ant-design/icons';
import { Select, SelectProps } from 'antd';
import { CellEditorProps, useCellContext } from 'antd-table-editable';
import React from 'react';

interface CellSingleProps extends CellEditorProps {
  fieldProps?: SelectProps;
}
const CellSingle: React.FC<CellSingleProps> = ({ value, fieldProps, render, cellProps }) => {
  const { mode, form, editable, setMode } = useCellContext();

  let childrenNode: React.ReactNode;

  if (mode === 'read') {
    childrenNode = (
      <>
        {fieldProps?.options?.find((i) => i.value === value)?.label}
        {editable && mode === 'read' && (
          <div className="cell-icon" onClick={() => setMode('edit')}>
            <CaretDownOutlined />
          </div>
        )}
      </>
    );
  } else {
    childrenNode = (
      <Select
        allowClear
        defaultOpen
        autoFocus
        size="small"
        variant="borderless"
        {...fieldProps}
        style={{ width: '100%', ...fieldProps?.style }}
        onClick={(e) => {
          // 处理弹窗 React.portal 的冒泡问题，否则点击 option 或点击滚动条后 click 事件会冒泡并触发 clickAway
          e.stopPropagation();
          fieldProps?.onClick?.(e);
        }}
        onChange={(...rest) => {
          fieldProps?.onChange?.(...rest);
          form.submit();
        }}
      />
    );
  }

  return render(childrenNode, {
    cellProps: {
      ...cellProps,
      onDoubleClick: () => {
        if (editable) {
          setMode('edit');
        }
      },
    },
  });
};

export default CellSingle;
