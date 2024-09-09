import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import {
  Item,
  ItemsContextType,
  MeteorUser,
  SelectedItemContextType,
} from "../types";

export const ItemsContext = createContext<ItemsContextType>({
  items: [],
  setItems: () => {},
});
export const SelectedItemContext = createContext<SelectedItemContextType>({
  selectedItem: undefined,
  setSelectedItem: () => {},
});

export const UserContext = createContext<MeteorUser>(null);

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const user = useTracker(() => Meteor.user()) as MeteorUser;

  useEffect(() => {
    console.log(`user changed : ${Meteor.userId()} - ${user}`);
  }, [user]);

  return (
    <>
      <ItemsContext.Provider value={{ items, setItems }}>
        <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
          <UserContext.Provider value={user}>{children}</UserContext.Provider>
        </SelectedItemContext.Provider>
      </ItemsContext.Provider>
    </>
  );
};

export default ContextProvider;
