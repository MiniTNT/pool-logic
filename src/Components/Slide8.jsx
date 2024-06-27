import React, { useState } from "react";

const Slide8 = ({ onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(selectedOption, { poolOption: selectedOption });
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className="form-container">
        <div className="step-section">
          <h1>Tell us about your pool</h1>
          <div className="subtitle">
            We care for pools of all shapes and sizes
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box-container text-same-redio-button">
          <div className="box">
            {selectedOption === "pool_only" ? (
              <img src="/images/R3_Pool Icon_Medium_Colored 2.svg" alt="G1" width="119" />
            ) : (
              <img src="/images/R3_Pool Icon_Medium_Gray 2.svg" alt="G1" width="119" />
            )}
            <p className="subtile-box">Pool only</p>
            <label htmlFor="pool_only"></label>
            <input
              id="pool_only"
              type="radio"
              name="pool-option"
              value="pool_only"
              onChange={handleChange}
            />
          </div>
          <div className="box">
            {selectedOption === "pool_spa" ? (
              <img
                src="/images/R3_Pool Icon_Pool with Spa_Colored.svg"
                alt="G2"
                width="119"
              />
            ) : (
              <img src="/images/R3_Pool Icon_Pool with Spa_Gray.svg" alt="G2" width="119" />
            )}
            <p className="subtile-box">Pool + attached spa</p>
            <label htmlFor="pool_spa"></label>
            <input
              id="pool_spa"
              type="radio"
              name="pool-option"
              value="pool_spa"
              onChange={handleChange}
            />
          </div>
          <div className="box">
            {selectedOption === "hot_tub" ? (
              <img src="/images/R3_Pool Icon_Hot Tub_Colored.svg" alt="G3" width="119" />
            ) : (
              <img src="/images/R3_Pool Icon_Hot Tub_Gray.svg" alt="G3" width="119" />
            )}
            <p className="subtile-box">Above ground hot tub</p>
            <label htmlFor="hot_tub"></label>
            <input
              id="hot_tub"
              type="radio"
              name="pool-option"
              value="hot_tub"
              onChange={handleChange}
            />
          </div>
          <div className="box">
            <div></div>
            <div className="div-no-image"></div>
            <p className="subtile-box no-image">Something else</p>
            <label htmlFor="something_else2"></label>
            <input
              id="something_else2"
              type="radio"
              name="pool-option"
              value="something_else"
              onChange={handleChange}
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

export default Slide8;
