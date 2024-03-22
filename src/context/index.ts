import { FormInstance } from 'antd';
import React from 'react';

export interface CellContextProps<EditorType extends string = any> {
  mode: 'read' | 'edit';
  setMode: React.Dispatch<React.SetStateAction<'read' | 'edit'>>;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance<any>;
  editable: boolean;
  editorType: EditorType;
}

export const CellContext = React.createContext<CellContextProps>({} as CellContextProps);
