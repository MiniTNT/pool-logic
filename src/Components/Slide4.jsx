import React, { useEffect, useRef, useState } from "react";

const Slide4 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    commercialFirstName: "",
    commercialLastName: "",
    commercialEmail: "",
    commercialZipCode: "",
    commercialCompanyName: "",
    commercialHelp: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const zipCodeInputRef = useRef(null);
  const companyNameInputRef = useRef(null);
  const helpInputRef = useRef(null);

  useEffect(() => {
    const {
      commercialFirstName,
      commercialLastName,
      commercialEmail,
      commercialZipCode,
      commercialCompanyName,
      commercialHelp,
    } = formData;

    const isFirstNameValid =
      !commercialFirstName || /^[a-zA-Z\s'-]{2,}$/.test(commercialFirstName);
    const isLastNameValid =
      !commercialLastName || /^[a-zA-Z\s'-]{2,}$/.test(commercialLastName);
    const isEmailValid =
      !commercialEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commercialEmail);
    const isCompanyNameValid =
      !commercialCompanyName ||
      /^[a-zA-Z0-9\s,.'-]{2,}$/.test(commercialCompanyName);
    const isHelpValid =
      !commercialHelp || /^[a-zA-Z\s,.'-]{2,}$/.test(commercialHelp);
    const isCommercialZipCodeValid = commercialZipCode;

    setIsFormValid(
      commercialFirstName &&
        commercialLastName &&
        commercialEmail &&
        commercialZipCode &&
        commercialCompanyName &&
        commercialHelp &&
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isCompanyNameValid &&
        isHelpValid &&
        isCommercialZipCodeValid
    );

    setErrors({
      commercialFirstName:
        commercialFirstName && !isFirstNameValid
          ? "Invalid first name format"
          : "",
      commercialLastName:
        commercialLastName && !isLastNameValid
          ? "Invalid last name format"
          : "",
      commercialEmail:
        commercialEmail && !isEmailValid ? "Invalid email format" : "",
      commercialCompanyName:
        commercialCompanyName && !isCompanyNameValid
          ? "Invalid company name format"
          : "",
      commercialHelp:
        commercialHelp && !isHelpValid ? "Invalid help format" : "",
      commercialZipCode:
        commercialZipCode && !isCommercialZipCodeValid
          ? "Required zip code"
          : "",
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
      onNext("thankYou", formData);
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
          <h1>Contact our commercial team</h1>
          <div className="subtitle">
            <span>
              We'll schedule a time to come onsite to
              <br />
              provide you with a service estimate.
            </span>
          </div>
        </div>
        <div className="field-mini-wrap">
          <div className="row">
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors?.commercialFirstName ? "invalid-field" : ""
                  }`}
                  placeholder="First name"
                  name="commercialFirstName"
                  id="commercialFirstName"
                  value={formData.commercialFirstName}
                  ref={firstNameInputRef}
                  onChange={handleInputChange}
                  pattern="[a-zA-Z\s'-]{2,}"
                  aria-invalid={!!errors.commercialFirstName}
                  title="First name should be at least 2 characters long and contain only letters, spaces, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="commercialFirstName">First name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.commercialLastName ? "invalid-field" : ""
                  }`}
                  placeholder="Last name"
                  name="commercialLastName"
                  id="commercialLastName"
                  value={formData.commercialLastName}
                  ref={lastNameInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.commercialLastName}
                  pattern="[a-zA-Z\s'-]{2,}"
                  title="Last name should be at least 2 characters long and contain only letters, spaces, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="commercialLastName">Last name</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.commercialEmail ? "invalid-field" : ""
                  }`}
                  placeholder="Enter an email"
                  name="commercialEmail"
                  id="commercialEmail"
                  type="email"
                  value={formData.commercialEmail}
                  ref={emailInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.commercialEmail}
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  title="Email should be in the format: example@example.com."
                  required
                />
                <label htmlFor="commercialEmail">Email</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.commercialZipCode ? "invalid-field" : ""
                  }`}
                  placeholder="Enter a zip code"
                  name="commercialZipCode"
                  id="commercialZipCode"
                  type="text"
                  value={formData.commercialZipCode}
                  ref={zipCodeInputRef}
                  aria-invalid={!!errors.commercialZipCode}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="commercialZipCode">Zip code</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.commercialCompanyName ? "invalid-field" : ""
                  }`}
                  placeholder="Your company name"
                  name="commercialCompanyName"
                  id="commercialCompanyName"
                  value={formData.commercialCompanyName}
                  ref={companyNameInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.commercialCompanyName}
                  pattern="[a-zA-Z0-9\s,.'-]{2,}"
                  title="Company name should be at least 2 characters long and contain only letters, numbers, spaces, commas, periods, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="commercialCompanyName">Your company name</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="input-container form-floating position-relative input-box">
                <textarea
                  className={`form-control input-field pac-target-input ${
                    errors.commercialHelp ? "invalid-field" : ""
                  }`}
                  placeholder="What can we help you with?"
                  name="commercialHelp"
                  id="commercialHelp"
                  value={formData.commercialHelp}
                  ref={helpInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.commercialHelp}
                  pattern="[a-zA-Z\s,.'-]{2,}"
                  title="Help description should be at least 2 characters long and contain only letters, spaces, commas, periods, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="commercialHelp">What can we help you with?</label>
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

export default Slide4;
