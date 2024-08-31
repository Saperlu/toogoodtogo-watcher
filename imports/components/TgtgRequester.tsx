import { CONTEXT_VERSION, useEventHandlers } from "@react-leaflet/core";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import res from "/public/items.json";
import { ItemsContext } from "./ContextProvider";

const TgtgRequester = () => {
  const map = useMap();

  const { setItems } = useContext(ItemsContext);

  const [pos, setPos] = useState(map.getCenter());
  const [posRequest, setPosRequest] = useState(map.getCenter());
  const [zoom, setZoom] = useState(map.getZoom())

  const onChange = useCallback(() => {
    setPos(map.getCenter());
    setZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setPosRequest(pos);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [pos]);

  useEffect(() => {
    setItems(res.items);
    console.log(posRequest, zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posRequest]);

  useEventHandlers(
    { instance: map, context: { __version: CONTEXT_VERSION, map } },
    { move: onChange }
  );

  return <></>;
};

export default TgtgRequester;
