import { App, Dropdown, Table } from 'antd';
import EditableTable from 'antd-table-editable';
import type { HTMLAttributes } from 'react';
import React, { useCallback, useMemo } from 'react';
import Selectable, { useSelectable } from 'react-selectable-box';
import CellDate from '../editors/CellDate';
import CellInput from '../editors/CellInput';
import CellNumber from '../editors/CellNumber';
import CellSingle from '../editors/CellSingle';
import './basic.scss';

type ValueType = { rowKey: React.Key; dataIndex: string };

const compareFn = (a: ValueType, b: ValueType) =>
  a.rowKey === b.rowKey && a.dataIndex === b.dataIndex;

interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  rowKey: React.Key;
  dataIndex: string;
  onReset: () => void;
}

const Cell = React.forwardRef<HTMLTableCellElement, CellProps>(
  ({ rowKey, dataIndex, onReset, ...props }, ref) => {
    const { setNodeRef, isAdding, isSelected } = useSelectable({
      value: { rowKey, dataIndex },
    });

    let backgroundColor;
    if (isSelected) {
      backgroundColor = '#d9dff0';
    } else if (isAdding) {
      backgroundColor = '#e3f2ff';
    }

    const cellNode = (
      <td
        ref={(el) => {
          setNodeRef(el);
          if (ref) {
            (ref as any).current = el;
          }
        }}
        {...props}
        style={{
          ...props.style,
          backgroundColor,
        }}
      >
        {props.children}
      </td>
    );

    return isSelected ? (
      <Dropdown
        trigger={['contextMenu']}
        menu={{ items: [{ key: '1', label: '清空', onClick: onReset }] }}
      >
        {cellNode}
      </Dropdown>
    ) : (
      cellNode
    );
  },
);

interface DataType {
  key: React.Key;
  text: string;
}

const data: DataType[] = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    text: 'text',
  });
}

export default () => {
  const { message } = App.useApp();
  const [dataSource, setDataSource] = React.useState(data);
  const [value, setValue] = React.useState<ValueType[]>([]);
  const tblRef: Parameters<typeof Table>[0]['ref'] = React.useRef(null);

  const onReset = useCallback(() => {
    setDataSource((prev) => {
      const result = [...prev];
      value.forEach((item) => {
        const index = result.findIndex((i) => i.key === item.rowKey);
        result[index] = { ...result[index], [item.dataIndex]: undefined };
      });
      return result;
    });
    setValue([]);
  }, [value]);

  const MemoCell = useMemo(() => {
    return React.forwardRef((props: any, ref) => <Cell {...props} ref={ref} onReset={onReset} />);
  }, [onReset]);

  return (
    <Selectable
      value={value}
      scrollContainer={() => tblRef.current?.nativeElement.querySelector('.ant-table-content')!}
      // because item value is an object, so you need to customize the comparison
      compareFn={compareFn}
      onStart={() => setValue([])}
      onEnd={(selectingValue) => {
        setValue(selectingValue);
      }}
    >
      <EditableTable
        ref={tblRef}
        // because table is scrollable, so you should set scrollContainer to Selectable
        scroll={{ x: 800 }}
        editorComponents={{
          text: CellInput,
          number: CellNumber,
          single: CellSingle,
          date: CellDate,
        }}
        dataSource={dataSource}
        components={{
          body: {
            cell: MemoCell,
          },
        }}
        columns={[
          {
            title: '文本',
            dataIndex: 'text',
            editorType: 'text',
            editable: true,
            width: 200,
            formItemProps: {
              rules: [{ max: 6, message: 'max length 6' }],
            },
          },
          {
            title: '数值',
            dataIndex: 'number',
            editorType: 'number',
            editable: true,
            width: 200,
          },
          {
            title: '单选',
            dataIndex: 'single',
            editorType: 'single',
            editable: true,
            fieldProps: {
              options: [
                { label: 'option1', value: 'a' },
                { label: 'option2', value: 'b' },
                { label: 'option3', value: 'c' },
                { label: 'option4', value: 'd' },
              ],
            },
            width: 200,
          },
          {
            title: '日期',
            dataIndex: 'date',
            editorType: 'date',
            editable: true,
            width: 200,
          },
        ].map((col) => ({
          ...col,
          onCell: (record: DataType) =>
            ({
              rowKey: record.key,
              dataIndex: (col as any).dataIndex,
            } as any),
        }))}
        onSave={({ field, value, index }) => {
          setDataSource((prev) => {
            const result = [...prev];
            result[index] = { ...result[index], [field]: value };
            return result;
          });
          message.success('保存成功');
        }}
      />
    </Selectable>
  );
};
