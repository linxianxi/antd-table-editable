import { FormItemProps, FormProps, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { HTMLAttributes, HTMLProps } from 'react';

export interface EditableTableProps<RecordType, EditorType extends string = any>
  extends TableProps<RecordType> {
  onSave?: (info: SaveInfoType<RecordType, EditorType>) => void;
  columns?: EditableColumn<RecordType, EditorType>[];
  editorComponents?: Record<EditorType, React.FunctionComponent<any>>;
}

export interface EditableColumn<RecordType, EditorType = any> extends ColumnType<RecordType> {
  /** 是否可编辑 */
  editable?: boolean | ((value: any, record: RecordType, index: number) => boolean);
  /** 类型，为函数时可以判断在筛选中或在表格中 */
  editorType?: Partial<EditorType>;
  /** 在表格中的 formItem 属性 */
  formItemProps?:
    | FormItemProps
    | ((value: any, record: RecordType, index: number) => FormItemProps);
  /** 在表格中的控件属性 */
  fieldProps?:
    | Record<string, any>
    | ((value: any, record: RecordType, index: number) => Record<string, any>);
  /** 转换值到表格中 */
  valueFormatter?: (value: any, record: RecordType, index: number) => any;
}

export type SaveInfoType<RecordType, EditorType> = {
  /**
   * field = String(col.key ?? col.dataIndex)
   */
  field: string;
  value: any;
  record: RecordType;
  index: number;
  editorType?: EditorType;
};

export interface EditableCellProps<RecordType = any, EditorType = any>
  extends HTMLAttributes<HTMLTableCellElement> {
  editable: boolean;
  value?: any;
  record: RecordType;
  children: React.ReactNode[];
  formItemProps?:
    | FormItemProps
    | ((value: any, record: RecordType, index: number) => FormItemProps);
  fieldProps?:
    | Record<string, any>
    | ((value: any, record: RecordType, index: number) => Record<string, any>);
  editorType: EditorType;
  index: number;
  field: string;
  render?: (value: any, record: RecordType, index: number) => React.ReactNode;
  editorComponents?: Record<string, React.FunctionComponent<CellEditorProps>>;
  cellComponent: Component<any>;
  onSave: (info: Omit<SaveInfoType<RecordType, EditorType>, 'record'>) => void;
}

export type EditableOnCellProps<RecordType> = Omit<
  EditableCellProps<RecordType>,
  'editorComponents' | 'cellComponent'
>;

export type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML;

export interface CellEditorProps {
  value: any;
  fieldProps?: Record<string, any>;
  cellProps: HTMLProps<HTMLTableCellElement>;
  render: (
    node: React.ReactNode,
    params?: {
      cellProps?: HTMLProps<HTMLTableCellElement>;
      formProps?: FormProps;
      formItemProps?: FormItemProps;
    },
  ) => React.ReactNode;
}
