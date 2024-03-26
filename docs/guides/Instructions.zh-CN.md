---
title: 使用须知
group:
  title: 快速上手
  order: 0
order: 1
nav: 快速上手
---

### 1、在格子被选中时，会向格子添加 `ant-table-cell-selected` class，可自行对其设置样式

### 2、不支持可展开表格，如果你真的需要可以提 issue

### 3、底层使用 `components.body.cell` 实现，但你能继续使用 `components.body.cell` ，且不会覆盖编辑的功能。

### 4、内部已经默认对 Cell 进行了 memo 处理，onSave 只会对单个 Cell 进行重渲染，但在以下这些情况需要注意：

在 `columns` 里对单个 `column` 进行设置 `formItemProps` 和 `fieldProps` 时，如果值直接是个对象，里面的函数必须都要被 `useCallback` 包裹，例如

```typescript
const onClick = useCallback(() => {
  // ...
}, []);

const columns = [
  {
    dataIndex: 'name',
    fieldProps: {
      onClick,
    },
  },
];
```

当 `formItemProps` 和 `fieldProps` 是个函数时，也要被 `useCallback` 包裹，例如

```typescript
const fieldProps = useCallback((value, record, index) => {
  return {
    onClick: () => {
      // ...
    },
  };
}, []);

const columns = [
  {
    dataIndex: 'name',
    fieldProps,
  },
];
```
