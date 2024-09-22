import React, { useContext } from "react";
import { SelectedItemContext } from "./ContextProvider";
import { Item } from "../types";
import { format } from "date-fns";

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const formatPickupInterval = (
  pickup_interval: Item["pickup_interval"]
): string => {
  if (pickup_interval == undefined) return "";
  const start = new Date(pickup_interval.start);
  const end = new Date(pickup_interval.end);
  const now = new Date("2024-08-17T10:00:00Z");
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  if (isSameDay(start, end)) {
    if (isSameDay(now, start))
      return `aujourd'hui ${format(start, "HH:mm")} - ${format(end, "HH:mm")}`;
    if (isSameDay(tomorrow, start))
      return `demain ${format(start, "HH:mm")} - ${format(end, "HH:mm")}`;
    return `${format(now, "dd/MM/yyyy")}`;
  }
  if (isSameDay(now, start)) {
    if (isSameDay(tomorrow, end))
      return `aujourd'hui ${format(start, "HH:mm")} - demain ${format(
        end,
        "HH:mm"
      )}`;
    return `aujourd'hui ${format(start, "HH:mm")} - ${format(
      end,
      "dd/MM/yyyy HH:mm"
    )}`;
  }
  if (isSameDay(tomorrow, start))
    return `demain ${format(start, "HH:mm")} - ${format(
      end,
      "dd/MM/yyyy HH:mm"
    )}`;
  return `${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`;
};

const ItemPreview = () => {
  const { selectedItem } = useContext(SelectedItemContext);

  return (
    <>
      <div
        id="item-preview"
        className={`fixed w-10/12 h-20 max-w-xl bg-white left-1/2 -translate-x-1/2 
          rounded-md border-tgtg 
          
          border-2 z-450 flex text-black p-2 
          transition-all duration-300
          ${selectedItem ? "bottom-4" : "-bottom-20"}`}
      >
        {selectedItem && (
          <>
            <img
              src={selectedItem.item.logo_picture.current_url}
              alt=""
              className="rounded-full border-2 border-tgtg mr-2 aspect-square object-cover"
            />
            <div className="overflow-auto flex flex-col flex-grow">
              <div className="flex items-center justify-between">
                {/* store name */}
                <span className="flex-shrink overflow-hidden text-ellipsis whitespace-nowrap">
                  {selectedItem.store.store_name}
                </span>
                <span
                  // pill
                  className={`w-fit whitespace-nowrap rounded-full px-2 m-1 text-sm font-semibold ${
                    selectedItem.items_available == 0
                      ? "bg-gray-300 text-gray-700"
                      : "bg-yellow-200 text-tgtg"
                  }`}
                >
                  {selectedItem.items_available > 0
                    ? `${selectedItem.items_available} à sauver`
                    : "Pas de paniers"}
                </span>
              </div>
              <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                {selectedItem?.pickup_interval
                  ? formatPickupInterval(selectedItem.pickup_interval)
                  : "Pas de paniers"}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ItemPreview;
