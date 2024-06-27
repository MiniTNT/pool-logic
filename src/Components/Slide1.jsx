import React, { useEffect, useRef, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const center = {
  lat: 0,
  lng: 0,
};

const Slide1 = ({ onNext }) => {
  const [selectedLocation, setSelectedLocation] = useState(center);
  const [inputValue, setInputValue] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const mapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.querySelector('.form-progress-slider').style.width = "0%";
    if (!window.google) {
      return;
    }

    const mapElement = document.getElementById("map");
    if (!mapElement) {
      console.error("Map element with id 'map' not found.");
      return;
    }
    const map = new window.google.maps.Map(mapElement, {
      center: selectedLocation,
      zoom: 15,
      mapTypeId: "roadmap",
      fullscreenControl: false,
      gestureHandling: "none",
      zoomControl: false,
      keyboardShortcuts: false,
      styles: [
        {
          featureType: "all",
          elementType: "all",
          stylers: [{ saturation: -100 }, { visibility: "simplified" }],
        },
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    const marker = new window.google.maps.Marker({
      position: selectedLocation,
      map: map,
      icon: {
        url: "/images/pin_icon.svg",
      },
    });

    map.addListener("click", (e) => {
      marker.setPosition(e.latLng);
      setSelectedLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      setIsValidAddress(true);
    });
  }, [selectedLocation]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handlePlaceSelected = (place) => {
    if (place?.geometry && place?.geometry?.location) {
      setInputValue(place?.formatted_address);
      setSelectedLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setIsValidAddress(true);
    } else {
      setInputValue("");
      setIsValidAddress(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectedLocation(center);
    setIsValidAddress(false);
  };

  const isValidLocation =
    selectedLocation.lat !== 0 && selectedLocation.lng !== 0;

  return (
    <div className="form-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isValidLocation) {
            const selectedAddress = {
              address: inputValue,
              location: selectedLocation,
            };
            onNext(true, selectedAddress);
          }
        }}
      >
        <div className="step-section">
          <h1>Let’s start with your address</h1>
          <p>We'll confirm you're in our service area</p>
        </div>
        {isValidAddress && inputValue.length > 10 && isValidLocation && (
          <div
            className="map_container"
            id="map"
            ref={mapRef}
            style={{ height: "150px", width: "100%" }}
          ></div>
        )}
        <div className="input-container form-floating mt-5 position-relative">
          <IoLocationOutline className="icon" />
          <Autocomplete
            ref={inputRef}
            className={`form-control input-field street-field  ${
              inputValue ? "has-content" : ""
            } ${
              !isValidAddress && inputValue !== "" && !isValidLocation
                ? "i-cant-found"
                : ""
            }`}
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            options={{
              types: ["address"],
              componentRestrictions: { country: "us" },
            }}
            onPlaceSelected={handlePlaceSelected}
            onChange={handleInputChange}
          />
          <label
            htmlFor="form-name"
            className={`address ${inputValue ? `street-address` : ""}`}
          >
            Street address
          </label>

          {!isValidAddress && inputValue !== "" && !isValidLocation && (
            <div className="address-no-results">
              <Link to="/step/2">I can't find my address</Link>
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`btn  ${
            !isValidAddress && inputValue !== "" && !isValidLocation
              ? "next-btn"
              : "setp-next-btn"
          }`}
          disabled={!isValidLocation}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default Slide1;
