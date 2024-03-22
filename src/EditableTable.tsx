import { Table } from 'antd';
import get from 'lodash/get';
import { useMemo } from 'react';
import EditableCell from './components/EditableCell';
import useEditableColumns from './hooks/useEditableColumns';
import { EditableTableProps } from './interface';

export default function EditableTable<
  RecordType extends Record<string, any>,
  EditorType extends string,
>({
  components,
  columns,
  editorComponents,
  dataSource,
  virtual,
  onSave,
  ...tableRestProps
}: EditableTableProps<RecordType, EditorType>) {
  const editableColumns = useEditableColumns({
    columns,
    dataSource: dataSource as RecordType[],
    onSave,
  });

  const cellComponent = useMemo(
    () => get(components, ['body', 'cell']) || (virtual ? 'div' : 'td'),
    [components, virtual],
  );

  return (
    <Table
      bordered
      size="small"
      virtual={virtual}
      {...tableRestProps}
      dataSource={dataSource}
      components={{
        ...components,
        body: {
          ...components?.body,
          cell: (props: any) => (
            <EditableCell
              {...props}
              cellComponent={cellComponent}
              editorComponents={editorComponents}
            />
          ),
        },
      }}
      columns={editableColumns}
    />
  );
}
