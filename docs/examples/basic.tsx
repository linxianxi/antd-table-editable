import { App } from 'antd';
import EditableTable from 'antd-table-editable';
import { useState } from 'react';
import CellDate from '../editors/CellDate';
import CellInput from '../editors/CellInput';
import CellNumber from '../editors/CellNumber';
import CellSingle from '../editors/CellSingle';
import './basic.scss';

const data = new Array(10).fill(null).map((_, index) => ({
  id: index,
  text: '最长6个字',
  number: index,
  single: 'a',
  date: '2024-1-1',
}));

export default () => {
  const { message } = App.useApp();
  const [dataSource, setDataSource] = useState(data);

  return (
    <>
      <p>双击或点击 icon 进行编辑</p>
      <EditableTable
        rowKey="id"
        dataSource={dataSource}
        editorComponents={{
          text: CellInput,
          number: CellNumber,
          single: CellSingle,
          date: CellDate,
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
