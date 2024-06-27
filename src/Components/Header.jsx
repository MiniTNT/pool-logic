import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
    var parentOrigin = "https://www.poollogicsd.com/";
    window.parent.postMessage(
      {
        type: "step",
        step: 1,
      },
      parentOrigin
    );
    window.location.href = "/step/1";
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-content">
          <div className="logo">
            <Link onClick={handleRefresh}>
              <img
                src="/images/logo.png"
                className="appLogo"
                alt="Logo"
                width={150}
              />
            </Link>
          </div>
          <div className="header-menu">
            <div
              className={`${
                scrolled ? "avatar-compact-mod" : "header-humanoid"
              }`}
              aria-label="maya-avatar"
            >
              <span className="avatar med" />
            </div>
          </div>
          <div className="phone-number">
            <a href="tel:6199139335">(619) 913-9335</a>
          </div>
        </div>
        <div className="form-progress-bar">
          <div className="form-progress-slider"></div>
        </div>
      </header>
    </>
  );
};

export default Header;
