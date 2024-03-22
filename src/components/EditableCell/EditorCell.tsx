import { memo, useMemo } from 'react';
import { CellContext } from '../../context';
import useCellEditable from '../../hooks/useCellEditable';
import { CellEditorProps, EditableCellProps } from '../../interface';
import { memoEqual } from '../../utils';

interface EditorCellProps<RecordType extends Record<string, any> = any>
  extends Omit<EditableCellProps<RecordType>, 'render'> {
  editorComponents: Record<string, React.FunctionComponent<CellEditorProps>>;
}

const EditorCell = memo(
  ({ editorComponents, ...props }: EditorCellProps) => {
    const Component = editorComponents[props.editorType];
    const { mode, selected, setMode, setSelected, fieldProps, render, form, cellProps } =
      useCellEditable(props);

    const contextValue = useMemo(
      () => ({
        mode,
        setMode,
        selected,
        setSelected,
        form,
        editable: props.editable,
        editorType: props.editorType,
      }),
      [mode, setMode, selected, setSelected, form, props.editable, props.editorType],
    );

    return (
      <CellContext.Provider value={contextValue}>
        <Component
          value={props.value}
          fieldProps={fieldProps}
          render={render}
          cellProps={cellProps}
        />
      </CellContext.Provider>
    );
  },
  (prev, next) =>
    memoEqual(prev, next, {
      omit: ['children', 'record'],
    }),
);

export default EditorCell;
