import { CONTEXT_VERSION, useEventHandlers } from "@react-leaflet/core";
import { Circle } from "react-leaflet";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { ItemsContext } from "./ContextProvider";
import { Meteor } from "meteor/meteor";
import { Item } from "../types";

const TgtgRequester = ({ fetchItemsFunctionRef }: TgtgRequesterProps) => {
  const map = useMap();

  const { items, setItems } = useContext(ItemsContext);

  const [pos, setPos] = useState(map.getCenter());
  const [posRequest, setPosRequest] = useState(map.getCenter());

  const calculateCircleRadius = () => {
    const bounds = map.getBounds();
    if (
      Math.abs(bounds.getNorth() - bounds.getSouth()) >
      Math.abs(bounds.getEast() - bounds.getWest())
    ) {
      return (
        map.distance(
          {
            lat: pos.lat,
            lng: bounds.getEast(),
          },
          {
            lat: pos.lat,
            lng: bounds.getWest(),
          }
        ) * 0.4
      );
    } else {
      return (
        map.distance(
          {
            lat: bounds.getNorth(),
            lng: pos.lng,
          },
          {
            lat: bounds.getSouth(),
            lng: pos.lng,
          }
        ) * 0.4
      );
    }
  };
  const calculateMapRadius = () =>
    map.distance(map.getCenter(), map.getBounds().getNorthEast());

  const [circleRadius, setCircleRadius] = useState(calculateCircleRadius());
  const [mapRadius, setMapRadius] = useState(calculateMapRadius());

  const mergeArrays = (arr1: Item[], arr2: Item[], key: keyof Item): Item[] => {
    const merged = [...arr2, ...arr1];
    return Array.from(
      new Map(merged.map((item) => [item[key], item])).values()
    );
  };

  const fetchItems = async () => {
    console.log("fetching : ", pos, mapRadius, circleRadius);
    Meteor.callAsync("items", pos.lat, pos.lng, mapRadius).then(
      (value) => {
        setItems(value.items);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  if (fetchItemsFunctionRef) fetchItemsFunctionRef.current = fetchItems;

  const onChange = useCallback(() => {
    setPos(map.getCenter());
    setCircleRadius(calculateCircleRadius());
    setMapRadius(calculateMapRadius());
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
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posRequest]);

  useEventHandlers(
    { instance: map, context: { __version: CONTEXT_VERSION, map } },
    { move: onChange }
  );

  return <>{/* <Circle center={pos} radius={circleRadius}></Circle> */}</>;
};

export default TgtgRequester;

export interface TgtgRequesterProps {
  fetchItemsFunctionRef?: React.MutableRefObject<() => void>;
}
