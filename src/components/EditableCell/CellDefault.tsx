import useCellEditable from '../../hooks/useCellEditable';
import { Component, EditableOnCellProps } from '../../interface';

interface CellDefaultProps<RecordType> extends EditableOnCellProps<RecordType> {
  cellComponent: Component<any>;
}

export default function CellDefault<RecordType>({
  children,
  cellComponent: CellComponent,
  ...restProps
}: CellDefaultProps<RecordType>) {
  const { cellProps, render } = useCellEditable({
    children,
    ...restProps,
    cellComponent: CellComponent,
    editable: false,
  });

  // 没有 record 说明是表格的空状态或选择框列
  if (!restProps.record) {
    return <CellComponent {...restProps}>{children}</CellComponent>;
  }

  return <CellComponent {...cellProps}>{render(children)}</CellComponent>;
}
