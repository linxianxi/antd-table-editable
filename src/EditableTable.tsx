import { Table } from 'antd';
import { isEqual } from 'lodash';
import get from 'lodash/get';
import rcUseMemo from 'rc-util/lib/hooks/useMemo';
import React, { useMemo } from 'react';
import EditableCell from './components/EditableCell';
import useEditableColumns from './hooks/useEditableColumns';
import { EditableTableProps } from './interface';

function EditableTable<RecordType extends Record<string, any>, EditorType extends string>(
  {
    components,
    columns,
    editorComponents,
    dataSource,
    virtual,
    onSave,
    ...tableRestProps
  }: EditableTableProps<RecordType, EditorType>,
  ref: Parameters<typeof Table>[0]['ref'],
) {
  const editableColumns = useEditableColumns({
    columns,
    dataSource: dataSource as RecordType[],
    onSave,
  });

  const cellComponent = useMemo(
    () => get(components, ['body', 'cell']) || (virtual ? 'div' : 'td'),
    [components, virtual],
  );

  const Cell = rcUseMemo(
    () => {
      return (props: any) => (
        <EditableCell
          {...props}
          cellComponent={cellComponent}
          editorComponents={editorComponents}
        />
      );
    },
    [cellComponent, editorComponents],
    (prev, next) => !isEqual(prev, next),
  );

  return (
    <Table
      ref={ref}
      bordered
      size="small"
      virtual={virtual}
      {...tableRestProps}
      dataSource={dataSource}
      components={{
        ...components,
        body: {
          ...components?.body,
          cell: Cell,
        },
      }}
      columns={editableColumns}
    />
  );
}

export default React.forwardRef(EditableTable) as <RecordType, EditorType extends string>(
  props: EditableTableProps<RecordType, EditorType> & { ref?: Parameters<typeof Table>[0]['ref'] },
) => React.ReactElement;
