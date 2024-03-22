---
title: 性能优化
group:
  title: 快速上手
  order: 0
order: 1
nav: 快速上手
---

#### 在 `columns` 里对单个 `column` 进行设置 `formItemProps` 和 `fieldProps` 时，如果值直接是个对象，里面的函数必须都要被 `useCallback` 包裹，例如

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
