import { EditOutlined } from '@ant-design/icons';
import { App, InputNumber, InputNumberProps } from 'antd';
import { CellEditorProps, useCellContext } from 'antd-table-editable';
import clsx from 'clsx';
import React from 'react';

interface CellNumberProps extends CellEditorProps {
  fieldProps?: InputNumberProps;
}

const CellNumber: React.FC<CellNumberProps> = ({ value, render, fieldProps, cellProps }) => {
  const { message } = App.useApp();
  const { mode, form, editable, setSelected, setMode } = useCellContext();

  let childrenNode: React.ReactNode;
  if (mode === 'read') {
    childrenNode = (
      <>
        {value}
        {editable && mode === 'read' && (
          <div className="cell-icon" onClick={() => setMode('edit')}>
            <EditOutlined />
          </div>
        )}
      </>
    );
  } else if (mode === 'edit') {
    childrenNode = (
      <InputNumber
        size="small"
        controls={false}
        variant="borderless"
        autoFocus
        {...fieldProps}
        className={clsx('cell-number-input', fieldProps?.className)}
        onPressEnter={(e) => {
          form.submit();
          setSelected(false);
          fieldProps?.onPressEnter?.(e);
        }}
        onBlur={(e) => {
          form.submit();
          fieldProps?.onBlur?.(e);
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

export default CellNumber;
