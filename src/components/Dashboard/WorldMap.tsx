import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";
import { WorldMapProps } from "@/types/components/dashboard";
import { MAP_URL } from "@/utils/api";

type locationsProps = {
  position: [number, number];
  icon: L.Icon;
};

const customIcon = new L.Icon({
  iconUrl: "/assets/images/icon/leaflet/default-icon.png",
  iconSize: [25, 40],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const targetIcon = new L.Icon({
  iconUrl: "/assets/images/icon/marker-icon.png",
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const ChangeCursor = ({ cursor }: { cursor: string }) => {
  const map = useMap();
  useEffect(() => {
    map.getContainer().style.cursor = cursor;
  }, [cursor, map]);

  return null;
};

const getPlaceName = async (lat: number, lng: number) => {
  const url = `${MAP_URL}/reverse?lat=${lat}&lon=${lng}&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch location name");
    const data = await response.json();
    return data.display_name || "Unknown Location";
  } catch (error) {
    return "Unknown Location";
  }
};

const WorldMap = ({ checkPlace, onlineMap, handleProduct }: WorldMapProps) => {
  const { usaPosition, locations } = onlineMap;
  const [processedLocations, setProcessedLocations] = useState<
    locationsProps[]
  >([]);
  const [placeNames, setPlaceNames] = useState<string[]>([]);

  const handleOnlineMap = (
    param: string,
    value: [number, number][] | [number, number]
  ) => {
    if (handleProduct)
      handleProduct("onlineMap", { ...onlineMap, [param]: value });
  };

  const GeocoderControl = () => {
    const map = useMap();
    useEffect(() => {
      if (!map) return;
      const geocoder = (L.Control as any)
        .geocoder({
          defaultMarkGeocode: false,
        })
        .on("markgeocode", function (e: any) {
          const { center, name } = e.geocode;
          if (handleOnlineMap) {
            handleOnlineMap("usaPosition", [center.lat, center.lng]);
          }
          L.marker(center, { icon: targetIcon })
            .addTo(map)
            .bindPopup(name)
            .openPopup();
          map.setView(center, 12);
        })
        .addTo(map);

      geocoder.setPosition("topright");
      return () => {
        geocoder.remove();
      };
    }, [map]);

    return null;
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const locationSets = await processLocations();
      if (locationSets) {
        setProcessedLocations(locationSets);
      }
    };
    fetchLocations();
  }, [onlineMap]);

  useEffect(() => {
    const fetchPlaceNames = async () => {
      if (locations) {
        const names = await Promise.all(
          locations.map(async (location) => {
            const placeName = await getPlaceName(location[0], location[1]);
            return placeName;
          })
        );
        setPlaceNames(names);
      }
    };
    fetchPlaceNames();
  }, [locations]);

  const processLocations = async (): Promise<locationsProps[]> => {
    if (!onlineMap || !locations || !Array.isArray(locations)) {
      console.error("Invalid locationSet structure:", onlineMap);
      return [];
    }
    return await Promise.all(
      locations.map(
        async (loc): Promise<locationsProps> => ({
          position: [loc[0], loc[1]] as [number, number],
          icon: customIcon,
        })
      )
    );
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        if (!checkPlace) return;
        const { lat, lng } = e.latlng;
        if (handleOnlineMap) {
          handleOnlineMap("locations", [...onlineMap.locations, [lat, lng]]);
        }
      },
    });
    return null;
  };

  const CtrlScrollZoom = () => {
    const map = useMap();

    useEffect(() => {
      const container = map.getContainer();

      const handleWheel = (e: WheelEvent) => {
        if (!e.ctrlKey) {
          e.preventDefault(); // disable zoom scroll if Ctrl is NOT pressed
          return;
        }

        e.preventDefault();

        const zoomDelta = e.deltaY < 0 ? 1 : -1;
        const newZoom = map.getZoom() + zoomDelta;
        map.setZoom(newZoom);
      };

      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }, [map]);

    return null;
  };

  return (
    <div>
      <MapContainer
        style={{ height: 389 }}
        center={usaPosition}
        zoom={8}
        scrollWheelZoom={false}
        className="z-0 jvector-map-height"
      >
        <GeocoderControl />
        <MapClickHandler />
        <CtrlScrollZoom />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeCursor cursor={checkPlace ? "crosshair" : "pointer"} />
        {processedLocations.map((loc, index) => (
          <Marker key={index} position={loc.position} icon={loc.icon}>
            <Popup>
              <strong>Point {index + 1}</strong>
              <br />
              <button
                className="btn btn-secondary p-1"
                type="button"
                onClick={() => {
                  if (handleOnlineMap) {
                    const points = locations.filter((_, i) => i !== index);
                    handleOnlineMap("locations", points);
                  }
                }}
              >
                Remove
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <ol>
        {placeNames &&
          placeNames.map((placeName, index) => (
            <li key={index}>{placeName}</li>
          ))}
      </ol>
    </div>
  );
};

export default WorldMap;
