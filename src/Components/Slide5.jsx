import React, { useState } from "react";

const Slide5 = ({ onNext, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [somethingElseSelected, setSomethingElseSelected] = useState(false);
  const [somethingElseValue, setSomethingElseValue] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onNext(selectedOptions, {
        service: selectedOptions,
        serviceSomethingElse: somethingElseValue,
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (value === "something_else") {
      setSomethingElseSelected(e.target.checked);
    }
    let updatedOptions;
    if (checked) {
      if (selectedOptions === null || selectedOptions.length === 0) {
        updatedOptions = [value];
      } else {
        updatedOptions = [...selectedOptions, value];
      }
    } else {
      updatedOptions = selectedOptions.filter((option) => option !== value);
    }
    setSelectedOptions(updatedOptions);
    setIsFormValid(updatedOptions.length > 0 || somethingElseSelected);
  };

  const handleSomethingElseChange = (e) => {
    setSomethingElseValue(e.target.value);
    setIsFormValid(e.target.value.trim() !== "");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="step-section">
          <h1>What do you need help with?</h1>
          <div className="subtitle">
            <span>Cleaning, chemicals, repairs. We do it all.</span>
          </div>
        </div>
        <div className="checkbox-section-mini">
        <div className="row slide-left">
          <div className="col-md-12">
            <div className="border-slide5">
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="regular_pool_spa_service"
                  value="regular_pool_spa_service"
                  name="service"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="regular_pool_spa_service"
                >
                  Regular pool or spa service
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className="border-slide5">
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="equipment_repair"
                  value="equipment_repair"
                  name="service"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="equipment_repair"
                >
                  Equipment upgrade or repair
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className="border-slide5">
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filter_or_salt_cell_cleaning"
                  value="filter_or_salt_cell_cleaning"
                  name="service"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="filter_or_salt_cell_cleaning"
                >
                  Filter or salt cell cleaning
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className="border-slide5">
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="greentoclean"
                  value="greentoclean"
                  name="service"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="greentoclean"
                >
                  "Green to clean" pool rescue
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className="border-slide-empty">
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="something_else"
                  value="something_else"
                  onChange={handleCheckboxChange}
                  name="service"
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="something_else"
                >
                  Something else
                </label>
              </div>
            </div>
          </div>
        </div>
        {somethingElseSelected && (
          <div className="row slide-left">
            <div className="col-md-12">
              <div className="border-slide5-empty">
                <div className="empty-box input-box">
                  <input
                    className={`form-control pac-target-input`}
                    placeholder="How can we help?"
                    name="help"
                    id="help"
                    value={somethingElseValue}
                    onChange={handleSomethingElseChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        <button type="submit" className="btn btn-next" disabled={!isFormValid}>
          Next
        </button>
      </form>
    </div>
  );
};

export default Slide5;
