import useCellEditable from '../../hooks/useCellEditable';
import { Component, EditableOnCellProps } from '../../interface';

interface CellDefaultProps<RecordType> extends EditableOnCellProps<RecordType> {
  cellComponent: Component<any>;
}

export default function CellDefault<RecordType>({
  cellComponent: CellComponent,
  ...restProps
}: CellDefaultProps<RecordType>) {
  const { cellProps } = useCellEditable({
    ...restProps,
    cellComponent: CellComponent,
    editable: false,
  });

  return <CellComponent {...cellProps} />;
}
