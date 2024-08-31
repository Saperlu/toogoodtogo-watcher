import { Marker } from "react-leaflet";
import { Item } from "../types";
import L from "leaflet";
import { SelectedItemContext } from "./ContextProvider";
import React, { Fragment, useContext, useMemo } from "react";

const ItemMarker = ({ item }: ItemMarkerProps) => {
  const { longitude, latitude } = item.store.store_location.location;
  const { selectedItem, setSelectedItem } = useContext(SelectedItemContext);

  const d = useMemo(
    () =>
      new L.DivIcon({
        html: `<img src="${item.item.logo_picture.current_url}"/>`,
        className: "map-item !border-tgtg",
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const ds = useMemo(
    () =>
      new L.DivIcon({
        html: `<img src="${item.item.logo_picture.current_url}"/>`,
        className: "map-item !border-tgtg selected",
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Fragment>
      <Marker
        position={[latitude, longitude]}
        icon={item.item.item_id == selectedItem?.item.item_id ? ds : d}
        eventHandlers={{
          click: () => {
            setSelectedItem(item);
          },
        }}
      ></Marker>
    </Fragment>
  );
};

interface ItemMarkerProps {
  item: Item;
}

export default ItemMarker;
