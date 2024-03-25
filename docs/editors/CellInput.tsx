import { EditOutlined } from '@ant-design/icons';
import { App, Input, InputProps } from 'antd';
import { CellEditorProps, PopoverValidator, useCellContext } from 'antd-table-editable';
import React from 'react';

const PopoverValidatorInput: React.FC<InputProps> = (props) => (
  <PopoverValidator>
    <Input {...props} />
  </PopoverValidator>
);

interface CellInputProps extends CellEditorProps {
  fieldProps?: InputProps;
}

const CellInput: React.FC<CellInputProps> = ({ value, render, fieldProps, cellProps }) => {
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
      <PopoverValidatorInput
        size="small"
        autoComplete="off"
        variant="borderless"
        autoFocus
        {...fieldProps}
        style={{ padding: 0, ...fieldProps?.style }}
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
    formProps: {
      onFinishFailed: (errorInfo) => {
        message.error(errorInfo.errorFields[0].errors[0]);
      },
    },
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

export default CellInput;
