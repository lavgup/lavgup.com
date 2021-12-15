import create from 'zustand';
import { ReactElement } from 'react';

interface CommandState {
  isOpen: boolean;
  setOpen: (val: boolean) => void;

  pages: (() => ReactElement)[];
  setPages: (val: (() => ReactElement)[]) => void;

  input: string;
  setInput: (val: string) => void;

  showing: string[],
  setShowing: (val: string) => void;
}

export const useCommandStore = create<CommandState>(set => ({
  isOpen: false,
  setOpen: val => set(() => ({ isOpen: val })),

  pages: [],
  setPages: val => set(() => ({ pages: val })),

  input: '',
  setInput: val => set(() => ({ input: val })),

  showing: [],
  setShowing: val => set(state => ({ showing: [...state.showing, val] }))
}));
