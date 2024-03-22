import { CaretDownOutlined } from '@ant-design/icons';
import { DatePicker, DatePickerProps } from 'antd';
import { CellEditorProps, useCellContext } from 'antd-table-editable';
import dayjs from 'dayjs';
import React from 'react';

interface CellDateProps extends CellEditorProps {
  fieldProps?: DatePickerProps;
}
const CellDate: React.FC<CellDateProps> = ({ value, fieldProps, render, cellProps }) => {
  const { mode, form, editable, setMode } = useCellContext();

  let childrenNode: React.ReactNode;

  if (mode === 'read') {
    childrenNode = (
      <>
        {dayjs(value).format('YYYY-MM-DD')}
        {editable && mode === 'read' && (
          <div className="cell-icon" onClick={() => setMode('edit')}>
            <CaretDownOutlined />
          </div>
        )}
      </>
    );
  } else {
    childrenNode = (
      <DatePicker
        allowClear
        defaultOpen
        autoFocus
        size="small"
        variant="borderless"
        panelRender={(originNode) => (
          // 处理弹窗 React.portal 的冒泡问题，否则点击面板会直接触发 clickAway 关闭面板
          <div onClick={(e) => e.stopPropagation()}>{originNode}</div>
        )}
        {...fieldProps}
        style={{ width: '100%', padding: 0, ...fieldProps?.style }}
        onChange={(...rest) => {
          fieldProps?.onChange?.(...rest);
          form.submit();
        }}
      />
    );
  }

  return render(childrenNode, {
    formItemProps: {
      initialValue: value ? dayjs(value) : undefined,
      getValueProps: (val) => ({
        value: val ? dayjs(val) : undefined,
      }),
      normalize: (val: dayjs.Dayjs) => (val ? val.format('YYYY-MM-DD') : undefined),
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

export default CellDate;
