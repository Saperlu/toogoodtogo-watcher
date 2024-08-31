import React, { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  ItemsContext,
  SelectedItemContext,
} from "./ContextProvider";
import ItemMarker from "./ItemMarker";
import TgtgRequester from "./TgtgRequester";
import ItemPreview from "./ItemPreview";
import { Link } from "react-router-dom";

const App = () => {
  const position = {
    lat: 48.883174688738244,
    lng: 2.3407638072967534,
  };

  const { items } = useContext(ItemsContext);
  const { setSelectedItem } = useContext(SelectedItemContext);

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

          <TgtgRequester />

          {items.map((item) => {
            return <ItemMarker key={`item-marker-${item.item.item_id}`} item={item} />;
          })}
        </MapContainer>
      </div>
      <Link to={'/register'} className="absolute top-2 right-2 aspect-square w-1/6 bg-tgtg z-450"></Link>
      <ItemPreview />
    </>
  );
}

export default App;
