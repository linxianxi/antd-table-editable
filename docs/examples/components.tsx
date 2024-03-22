import { CaretDownOutlined, EditOutlined } from '@ant-design/icons';
import { App } from 'antd';
import EditableTable, { useCellContext } from 'antd-table-editable';
import React, { HTMLProps, useState } from 'react';
import CellDate from '../editors/CellDate';
import CellInput from '../editors/CellInput';
import CellNumber from '../editors/CellNumber';
import CellSingle from '../editors/CellSingle';
import './components.scss';

const data = new Array(10).fill(null).map((_, index) => ({
  id: index,
  text: '最长6个字',
  number: index,
  single: 'a',
  date: '2024-1-1',
}));

const Cell: React.FC<HTMLProps<HTMLTableCellElement>> = React.forwardRef((props, ref) => {
  const { editable, mode, setMode, editorType } = useCellContext();

  return (
    <td ref={ref} {...props}>
      {editable && mode === 'read' && (
        <div className="cell-iconLeft" onClick={() => setMode('edit')}>
          {['text', 'number'].includes(editorType) ? <EditOutlined /> : <CaretDownOutlined />}
        </div>
      )}
      {props.children}
    </td>
  );
});

export default () => {
  const { message } = App.useApp();
  const [dataSource, setDataSource] = useState(data);

  return (
    <>
      <p>
        可以使用 components.body.cell (需要用 React.forwardRef 传递 ref) 统一加上编辑
        icon（这里为了演示加的是左边的 icon）
      </p>
      <EditableTable
        rowKey="id"
        dataSource={dataSource}
        editorComponents={{
          text: CellInput,
          number: CellNumber,
          single: CellSingle,
          date: CellDate,
        }}
        components={{ body: { cell: Cell } }}
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
        ]}
        pagination={false}
        onSave={({ field, value, index }) => {
          setDataSource((prev) => {
            const result = [...prev];
            result[index] = { ...result[index], [field]: value };
            return result;
          });
          message.success('保存成功');
        }}
      />
    </>
  );
};
