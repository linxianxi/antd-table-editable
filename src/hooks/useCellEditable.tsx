import { Form, FormItemProps, FormProps } from 'antd';
import clsx from 'clsx';
import omit from 'lodash/omit';
import { useEvent } from 'rc-util';
import { composeRef } from 'rc-util/lib/ref';
import { HTMLAttributes, HTMLProps, useMemo, useRef, useState } from 'react';
import { EditableCellProps } from '../interface';
import { getReadCellContent } from '../utils';
import useClickAway from './useClickAway';

type UseCellEditableProps<RecordType> = Omit<
  EditableCellProps<RecordType>,
  'render' | 'editorComponents'
>;

export default function useCellEditable<RecordType>({
  value,
  index,
  children,
  field,
  record,
  fieldProps: propsFieldProps,
  formItemProps: propsFormItemProps,
  editorType,
  cellComponent: CellComponent,
  onClick,
  onSave,
  ...restProps
}: UseCellEditableProps<RecordType>) {
  const [selected, setSelected] = useState(false);
  const [mode, setMode] = useState<'read' | 'edit'>('read');
  const cellRef = useRef<HTMLTableCellElement>(null);
  const [form] = Form.useForm();
  // const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = 'ant-table';

  useClickAway(cellRef, () => {
    setSelected(false);
    setMode('read');
  });

  const fieldProps =
    typeof propsFieldProps === 'function' ? propsFieldProps(value, record, index) : propsFieldProps;
  const formItemProps =
    typeof propsFormItemProps === 'function'
      ? propsFormItemProps(value, record, index)
      : propsFormItemProps;

  const cellProps: HTMLAttributes<HTMLTableCellElement> = useMemo(
    () => ({
      ...omit(restProps, ['record', 'editable']),
      onClick: (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        setSelected(true);
        onClick?.(e);
      },
    }),
    [restProps],
  );

  const render = useEvent(
    (
      content: React.ReactNode,
      params?: {
        cellProps?: HTMLProps<HTMLTableCellElement>;
        formProps?: FormProps;
        formItemProps?: FormItemProps;
      },
    ) => {
      const node =
        mode === 'read' ? (
          getReadCellContent(children, content, prefixCls)
        ) : (
          <Form
            form={form}
            component={false}
            preserve={false}
            {...params?.formProps}
            onFinish={(values) => {
              if (form.isFieldsTouched()) {
                onSave({ field, value: Object.values(values)[0], index, editorType });
              }
              setMode('read');
              params?.formProps?.onFinish?.(values);
            }}
            onFinishFailed={(errorInfo) => {
              setMode('read');
              params?.formProps?.onFinishFailed?.(errorInfo);
            }}
          >
            <Form.Item
              name="name"
              initialValue={value}
              noStyle
              {...params?.formItemProps}
              {...formItemProps}
            >
              {content}
            </Form.Item>
          </Form>
        );

      return (
        <CellComponent
          {...params?.cellProps}
          ref={composeRef(cellRef, params?.cellProps?.ref as any)}
          className={clsx(
            {
              [`${prefixCls}-cell-selected`]: selected,
            },
            cellProps?.className,
            restProps.className,
          )}
          style={{
            ...cellProps?.style,
            ...restProps.style,
          }}
        >
          {node}
        </CellComponent>
      );
    },
  );

  return {
    mode,
    selected,
    setMode,
    setSelected,
    render,
    form,
    fieldProps,
    cellProps,
  };
}
