import { createContext, ReactNode, useContext } from 'react';
import { Chao, useChaoAtIndex } from '../store';

interface ChaoProviderData {
  chao: Chao;
  update: (chao: Chao) => void;
}

const ChaoContext = createContext<ChaoProviderData | null>(null);

interface ChaoProviderProps {
  index: number;
  children?: ReactNode | undefined;
}

function ChaoProvider({ index, children }: ChaoProviderProps) {
  const [chao, setChao] = useChaoAtIndex(index);

  return (
    <ChaoContext.Provider value={{ chao, update: setChao }}>
      {children}
    </ChaoContext.Provider>
  );
};

function useChao(): [Chao, (_: Chao) => void] {
  const data = useContext(ChaoContext)!
  return [data.chao, data.update]
}

export { ChaoProvider, useChao };
