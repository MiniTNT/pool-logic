import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide4 from "./Slide4";
import Slide5 from "./Slide5";
import Slide6 from "./Slide6";
import Slide7 from "./Slide7";
import Slide8 from "./Slide8";
import Slide9 from "./Slide9";
import Slide10 from "./Slide10";
import Slide11 from "./Slide11";
import Slide12 from "./Slide12";
import Slide13 from "./Slide13";

const Step = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const { index } = useParams();
  const stepIndex = parseInt(index, 10) - 1;
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [slide1Response, setSlide1Response] = useState(null);
  const [poolTypeResponse, setPoolTypeResponse] = useState(null);
  const [serviceResponse, setServiceResponse] = useState([]);
  const [poolOptionResponse, setPoolOptionResponse] = useState(null);
  const [poolOption1Response, setPoolOption1Response] = useState(null);
  const [thankYouResponse, setThankYouResponse] = useState(null);
  const [previousShow, setPreviousShow] = useState(true);
  const [formData, setFormData] = useState({});
  const handleNext = (response, data) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      let newIndex = stepIndex + 1;
      let updatedFormData = { ...formData };
      if (stepIndex === 0) {
        setSlide1Response(response);
        setFormData({});
        setFormData(data);
        newIndex = response ? 1 : 0;
      } else if (response === "manualAddress") {
        setFormData({});
        setFormData(data);
        newIndex = stepIndex + 1;
      } else if (response === "residential" || response === "commercial") {
        setPoolTypeResponse(response);
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (
        response?.includes("greentoclean") ||
        response?.includes("equipment_repair") ||
        response?.includes("regular_pool_spa_service") ||
        response?.includes("filter_or_salt_cell_cleaning") ||
        response?.includes("something_else")
      ) {
        setServiceResponse(response);
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (
        response === "pool_only" ||
        response === "pool_spa" ||
        response === "hot_tub" ||
        response === "something_else"
      ) {
        setPoolOptionResponse(response);
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (
        response?.includes("pool_pump") ||
        response?.includes("pool_filter") ||
        response?.includes("pool_heater") ||
        response?.includes("salt_system") ||
        response?.includes("automaion_system") ||
        response?.includes("i_m_not_sure")
      ) {
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (
        response?.includes("ground_pool") ||
        response?.includes("saltwater_pool") ||
        response?.includes("trees_over_pool")
      ) {
        setPoolOption1Response(response);
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (response === "thankYou") {
        setThankYouResponse(response);
        setPreviousShow(false);
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      }
      var parentOrigin = "https://www.poollogicsd.com/";
      window.parent.postMessage(
        {
          type: "step",
          step: newIndex + 1,
        },
        parentOrigin
      );
      setIsButtonClick(true);
      navigate(`/step/${newIndex + 1}`);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      let newIndex = stepIndex - 1;
      if (stepIndex === 1 && !slide1Response) {
        newIndex = 0;
      }
      var parentOrigin = "https://www.poollogicsd.com/";
      window.parent.postMessage(
        {
          type: "step",
          step: newIndex + 1,
        },
        parentOrigin
      );
      setIsButtonClick(true);
      navigate(`/step/${newIndex + 1}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://poollogic.newspulse.news/form_submit.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log(responseData);
        setFormData({});
        setThankYouResponse(null);
        setPreviousShow(false);
        setSlide1Response(null);
        setPoolTypeResponse(null);
        setServiceResponse([]);
        setPoolOptionResponse(null);
        setPoolOption1Response(null);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (thankYouResponse) {
      fetchData();
    }
  }, [thankYouResponse, formData]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isButtonClick) {
        swiperRef.current.swiper.slideTo(stepIndex);
        setIsButtonClick(false);
      } else if (stepIndex === 0) {
        setSlide1Response(null);
        swiperRef.current.swiper.slideTo(stepIndex);
      } else {
        swiperRef.current.swiper.slideTo(stepIndex);
      }
      console.log(stepIndex);
    }
  }, [stepIndex, isButtonClick]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("redirectFirstStep", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const shouldRedirect = localStorage.getItem("redirectFirstStep");
    if (shouldRedirect === "true") {
      localStorage.removeItem("redirectFirstStep");
      var parentOrigin = "https://www.poollogicsd.com/";
      window.parent.postMessage(
        {
          type: "step",
          step: 1,
        },
        parentOrigin
      );
      navigate("/step/1");
    }
  }, []);

  return (
    <div className="mini-container">
      <div className="swiper-container">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev",
          }}
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
          simulateTouch={false}
          touchRatio={0}
          shortSwipes={false}
          longSwipes={false}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={800}
        >
          <SwiperSlide>
            <Slide1 onNext={handleNext} />
          </SwiperSlide>
          {!slide1Response && (
            <SwiperSlide>
              <Slide2 onNext={handleNext} onBack={handlePrev} />
            </SwiperSlide>
          )}
          <SwiperSlide>
            <Slide3 onNext={handleNext} onBack={handlePrev} />
          </SwiperSlide>
          {poolTypeResponse === "commercial" && (
            <SwiperSlide>
              <Slide4 onNext={handleNext} onBack={handlePrev} />
            </SwiperSlide>
          )}
          {poolTypeResponse === "residential" && (
            <SwiperSlide>
              <Slide5 onNext={handleNext} onBack={handlePrev} />
            </SwiperSlide>
          )}
          {poolTypeResponse === "residential" &&
            serviceResponse?.includes("greentoclean") && (
              <SwiperSlide>
                <Slide6 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            serviceResponse?.includes("equipment_repair") && (
              <SwiperSlide>
                <Slide7 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") && (
              <SwiperSlide>
                <Slide8 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") &&
            (poolOptionResponse === "pool_only" ||
              poolOptionResponse === "pool_spa") && (
              <SwiperSlide>
                <Slide9 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") &&
            poolOption1Response?.includes("ground_pool") &&
            (poolOptionResponse === "pool_only" ||
              poolOptionResponse === "pool_spa") && (
              <SwiperSlide>
                <Slide10 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") &&
            !poolOption1Response?.includes("ground_pool") &&
            (poolOptionResponse === "pool_only" ||
              poolOptionResponse === "pool_spa") && (
              <SwiperSlide>
                <Slide11 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") &&
            !poolOption1Response?.includes("ground_pool") && (
              <SwiperSlide>
                <Slide12 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          <SwiperSlide>
            <Slide13 />
          </SwiperSlide>
          {previousShow && (
            <div className="swiper-button-prev" onClick={handlePrev}></div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Step;
