import { ColumnsType } from 'antd/lib/table';
import get from 'lodash/get';
import { useEvent } from 'rc-util';
import { EditableColumn, EditableOnCellProps, SaveInfoType } from '../interface';
import { getField } from '../utils';

export default function useEditableColumns<RecordType, EditorType>({
  columns,
  dataSource,
  onSave,
}: {
  columns?: EditableColumn<RecordType, EditorType>[];
  dataSource?: RecordType[];
  onSave?: (info: SaveInfoType<RecordType, EditorType>) => void;
}): ColumnsType<RecordType> | undefined {
  // 保持引用不变，可以 memo
  const handleSave = useEvent((info: Omit<SaveInfoType<RecordType, EditorType>, 'record'>) => {
    if (onSave) {
      // 因为 record 被 memoEqual 函数 omit 了，所以要在这里取最新的 record
      const saveInfo = {
        ...info,
        record: (dataSource || [])[info.index],
      };
      onSave(saveInfo);
    }
  });

  return columns?.map((col) => ({
    ...col,
    onCell: (record: RecordType, idx: number | undefined) => {
      const index = idx as number;
      let value = col.dataIndex ? get(record, col.dataIndex as any) : undefined;
      const editable =
        typeof col.editable === 'function' ? col.editable(value, record, index) : col.editable;
      const field = getField(col.key, col.dataIndex);

      return {
        ...col.onCell?.(record, index),
        field,
        value,
        record,
        index,
        editable,
        editorType: col.editorType,
        formItemProps: col.formItemProps,
        fieldProps: col.fieldProps,
        render: col.render,
        onSave: handleSave,
      } as EditableOnCellProps<RecordType>;
    },
  }));
}
