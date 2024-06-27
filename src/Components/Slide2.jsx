import React, { useEffect, useRef, useState } from "react";

const Slide2 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    street: "",
    unit: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const streetInputRef = useRef(null);
  const unitInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const zipcodeInputRef = useRef(null);
  const stateInputRef = useRef(null);

  useEffect(() => {
    const { street, unit, city, state, zipCode } = formData;
    const isStreetValid = !street || /^[a-zA-Z0-9\s,.'-]{3,}$/.test(street);
    const isUnitValid = unit;
    const isCityValid = !city || /^[a-zA-Z\s,.'-]{2,}$/.test(city);
    const isStateValid = !state || /^[a-zA-Z\s,.'-]{2,}$/.test(state);
    const isZipCodeValid = zipCode;

    setIsFormValid(
      street &&
        unit &&
        city &&
        state &&
        zipCode &&
        isStreetValid &&
        isCityValid &&
        isStateValid &&
        isZipCodeValid &&
        isUnitValid
    );

    setErrors({
      street: street && !isStreetValid ? "Invalid street format" : "",
      unit: unit && !isUnitValid ? "Required Apt/Unit format" : "",
      city: city && !isCityValid ? "Invalid city format" : "",
      state: state && !isStateValid ? "Invalid state format" : "",
      zipCode: zipCode && !isZipCodeValid ? "Required zip code" : "",
    });
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onNext("manualAddress", formData);
    } else {
      const firstInvalidField = Object.keys(errors).find((key) => errors[key]);
      if (firstInvalidField) {
        document.getElementById(firstInvalidField).focus();
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="step-section">
          <h1>No worries. Let's try it this way</h1>
        </div>
        <div className="field-mini-wrap">
          <div className="row">
            <div className="col-md-7">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.street ? "invalid-field" : ""
                  }`}
                  placeholder="Enter a street"
                  name="street"
                  value={formData.street}
                  ref={streetInputRef}
                  id="street"
                  pattern="^[a-zA-Z0-9\s,.'-]{3,}$"
                  onChange={handleInputChange}
                />
                <label htmlFor="street">Street</label>
              </div>
            </div>
            <div className="col-md-5">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.unit ? "invalid-field" : ""
                  }`}
                  placeholder="Enter a Apt/Unit #"
                  name="unit"
                  value={formData.unit}
                  ref={unitInputRef}
                  id="unit"
                  onChange={handleInputChange}
                />
                <label htmlFor="unit">Apt/Unit #</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.city ? "invalid-field" : ""
                  }`}
                  placeholder="Enter a city"
                  name="city"
                  value={formData.city}
                  ref={cityInputRef}
                  id="city"
                  pattern="^[a-zA-Z\s,.'-]{2,}$"
                  onChange={handleInputChange}
                />
                <label htmlFor="city">City</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.state ? "invalid-field" : ""
                  }`}
                  placeholder="Enter a state"
                  name="state"
                  value={formData.state}
                  ref={stateInputRef}
                  id="state"
                  pattern="^[a-zA-Z\s,.'-]{2,}$"
                  onChange={handleInputChange}
                />
                <label htmlFor="state">State</label>
              </div>
            </div>
            <div className="col-md-7">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.zipCode ? "invalid-field" : ""
                  }`}
                  type="text"
                  placeholder="Enter a zip code"
                  name="zipCode"
                  value={formData.zipCode}
                  id="zipCode"
                  ref={zipcodeInputRef}
                  aria-invalid={!!errors.zipCode}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="zipCode">Zip code</label>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-next" disabled={!isFormValid}>
          Next
        </button>
      </form>
    </div>
  );
};

export default Slide2;
