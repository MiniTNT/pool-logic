import React, { useState } from "react";

const Slide11 = ({ onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(selectedOption, { poolSize: selectedOption });
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className="form-container">
        <div className="step-section">
          <h1>How big is your pool?</h1>
          <div className="subtitle">Just your best guess.</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box-container pool-size-section-box">
          <div className="box">
            {selectedOption === "small" ? (
              <img src="/images/R2_Pool Icons-17_Small Pool_Colored.svg" alt="C1"  width="119"/>
            ) : (
              <img src="/images/R2_Pool Icons-18_Small Pool_Gray.svg" alt="G1"  width="119"/>
            )}
            <p className="subtile-box">Small<div></div>(roughly 10'x20')</p>
            <label htmlFor="small"></label>
            <input
              id="small"
              type="radio"
              name="pool-size"
              value="small"
              onChange={handleChange}
            />
          </div>
          <div className="box">
            {selectedOption === "medium" ? (
              <img src="/images/R2_Pool Icons-19_Medium Pool_Colored.svg" alt="C1"  width="119"/>
            ) : (
              <img src="/images/R2_Pool Icons-20_Medium Pool_Gray.svg" alt="G1"  width="119"/>
            )}
            <p className="subtile-box">Medium<div></div>(roughly 15'x25')</p>
            <label htmlFor="medium"></label>
            <input
              id="medium"
              type="radio"
              name="pool-size"
              value="medium"
              onChange={handleChange}
            />
          </div>
          <div className="box">
            {selectedOption === "large" ? (
              <img src="/images/R2_Pool Icons-21_Large Pool_Colored.svg" alt="C1"  width="119"/>
            ) : (
              <img src="/images/R2_Pool Icons-22_Large Pool_Gray.svg" alt="G1"  width="119"/>
            )}
            <p className="subtile-box">Large<div></div>(roughly 20'x 35')</p>
            <label htmlFor="large"></label>
            <input
              id="large"
              type="radio"
              name="pool-size"
              value="large"
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

export default Slide11;
