import React, { useContext, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { ItemsContext, SelectedItemContext } from "./ContextProvider";
import ItemMarker from "./ItemMarker";
import TgtgRequester from "./TgtgRequester";
import ItemPreview from "./ItemPreview";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import {
  CloudDownload,
  RefreshCw,
  RouteOff,
  Settings as SettingsIcon,
} from "lucide-react";
import { toast } from "./hooks/use-toast";

const Map = () => {
  const position = {
    lat: 48.883174688738244,
    lng: 2.3407638072967534,
  };

  const { items } = useContext(ItemsContext);
  const { setSelectedItem } = useContext(SelectedItemContext);
  const fetchItemsFunctionRef = useRef<() => void>(null!);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossOrigin=""
      ></script>

      <div
        id="map"
        onClick={() => {
          setSelectedItem(undefined);
        }}
      >
        <MapContainer center={position} zoom={16} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <TgtgRequester fetchItemsFunctionRef={fetchItemsFunctionRef} />

          {items.map((item) => {
            return (
              <ItemMarker
                key={`item-marker-${item.item.item_id}`}
                item={item}
              />
            );
          })}
        </MapContainer>
      </div>
      <div className="absolute top-2 right-2 flex flex-col z-450">
        <Link to={"/settings"}>
          <SettingsIcon className="rounded-full bg-tgtg p-1 m-1 text-white w-8 h-8" />
        </Link>
        <CloudDownload
          className=" rounded-full bg-tgtg p-1 m-1 text-white w-8 h-8"
          onClick={() => fetchItemsFunctionRef.current()}
        />
        <RouteOff
          className=" rounded-full bg-tgtg p-1 m-1 text-white w-8 h-8"
          onClick={() => {
            Meteor.callAsync("auth/sync/reset").then((_value) => {
              toast({
                title: "Reset OK",
              });
            });
          }}
        />
        <div className=" rounded-full bg-tgtg p-1 m-1 text-white w-8 h-8">
          {items.length}
        </div>
      </div>
      {/* <div className="rounded-full w-4/5 aspect-square fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-red-400 z-450 opacity-40"></div> */}
      <ItemPreview />
    </>
  );
};

export default Map;
