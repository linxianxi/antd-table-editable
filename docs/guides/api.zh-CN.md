---
title: API
group:
  title: 快速上手
  order: 0
order: 0
nav: 快速上手
---

### Table

| 参数             | 说明     | 类型                                                                                         |
| ---------------- | -------- | -------------------------------------------------------------------------------------------- |
| editorComponents | 编辑控件 | Record<string, React.FunctionComponent\<any>>                                                |
| onSave           | 保存回调 | (info: { field: string; value: any; record: any; index: number; valueType: string }) => void |

### Column

| 参数           | 说明                | 类型                                                                 |
| -------------- | ------------------- | -------------------------------------------------------------------- |
| editable       | 是否可编辑          | boolean \| ((value, record, index) => boolean)                       |
| formItemProps  | formItem 的属性     | FormItemProps \| (value; record; index) => FormItemProps             |
| fieldProps     | 控件的属性          | Record<string, any> \| (value; record; index) => Record<string, any> |
| valueFormatter | 转换 value 到控件中 | (value, record, index) => any                                        |
| editorType     | 控件类型            | string                                                               |

### useCellContext

```typescript
const { editable, mode, selected, setMode, setSelected, form, editorType } = useCellContext();
```

| 参数        | 说明           | 类型                                                    |
| ----------- | -------------- | ------------------------------------------------------- |
| editable    | 是否可编辑     | boolean                                                 |
| mode        | 模式           | 'read' \| 'edit'                                        |
| selected    | 是否选择       | boolean                                                 |
| setMode     | 设置模式       | React.Dispatch<React.SetStateAction\<'read' \| 'edit'>> |
| setSelected | 设置选择       | React.Dispatch<React.SetStateAction\<boolean>>          |
| form        | antd form 实例 | FormInstance                                            |
| editorType  | 控件类型       | string                                                  |

### CellEditorProps

```typescript
interface CellEditorProps {
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
```
