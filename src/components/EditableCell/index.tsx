import { EditableCellProps } from '../../interface';
import CellDefault from './CellDefault';
import EditorCell from './EditorCell';

export default function EditableCell<RecordType>({
  render,
  editorComponents,
  cellComponent,
  ...props
}: EditableCellProps<RecordType>) {
  if (!render && props.editorType && editorComponents) {
    return (
      <EditorCell {...props} editorComponents={editorComponents} cellComponent={cellComponent} />
    );
  }

  return <CellDefault {...props} cellComponent={cellComponent} />;
}
