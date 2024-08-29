import React, { createContext, PropsWithChildren, useState } from "react";
import { Item, ItemsContextType, SelectedItemContextType } from "../types";

export const ItemsContext = createContext<ItemsContextType>({
  items: [],
  setItems: () => {},
});
export const SelectedItemContext = createContext<SelectedItemContextType>({
  selectedItem: undefined,
  setSelectedItem: () => {},
});

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>();

  return (
    <>
      <ItemsContext.Provider value={{ items, setItems }}>
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
          {children}
        </SelectedItemContext.Provider>
      </ItemsContext.Provider>
    </>
  );
};

export default ContextProvider;
