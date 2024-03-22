import { useContext } from 'react';
import { CellContext, CellContextProps } from '../context';

const useCellContext = <EditorType extends string>() => {
  return useContext<CellContextProps<EditorType>>(CellContext);
};

export default useCellContext;
