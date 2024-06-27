import React, { useState } from "react";

const Slide3 = ({ onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(selectedOption, { poolType: selectedOption });
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    document.querySelector('.form-progress-slider').style.width = "30%";
  });

  return (
    <>
      <div className="form-container">
        <div className="step-section">
          <h1>Is this a residential or commercial pool?</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box-container 3slide">
          <div className="box">
            {selectedOption === "residential" ? (
              <img
                src="/images/R3_Pool Icon_Residential_Colored.svg"
                alt="C1"
                width="119"
              />
            ) : (
              <img src="/images/R3_Pool Icon_Residential_Gray.svg" alt="G1" width="119" />
            )}
            <p className="subtile-box">Residential</p>
            <label htmlFor="residential"></label>
            <input
              type="radio"
              name="pool-type"
              value="residential"
              onChange={handleChange}
              id="residential"
            />
            <label htmlFor="residential"></label>
          </div>
          <div className="box">
            {selectedOption === "commercial" ? (
              <img src="/images/R2_Pool Icons_03.svg" alt="C2" width="119" />
            ) : (
              <img src="/images/R2_Pool Icons_04.svg" alt="G2" width="119" />
            )}
            <p className="subtile-box">Commercial</p>
            <label htmlFor="commercial"></label>
            <input
              type="radio"
              name="pool-type"
              value="commercial"
              onChange={handleChange}
              id="commercial"
            />
          </div>
        </div>
        <div className="form-container">
          <button
            type="submit"
            className="btn btn-next"
            disabled={selectedOption ? false : true}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default Slide3;
