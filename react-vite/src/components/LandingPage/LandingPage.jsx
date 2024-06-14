import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchThunk } from "../../redux/sitter";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import SearchBar from "./SearchBar";
import "./LandingPage.css";


function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allSitters = useSelector((state) => state.sitter?.search);
  const user = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(true);
  const [slide, setSlide] = useState(0);
  const [filter] = useSearchParams();
  const searchFilter = filter.get("filter")?.split(" ").join("+");

  useEffect(() => {
    setIsLoaded(false);
    if (searchFilter) {
      dispatch(searchThunk(searchFilter));
    } else {
      dispatch(searchThunk());
    }
    setIsLoaded(true);
  }, [dispatch, searchFilter, isLoaded]);

  const slides = [
    {
      src: "https://marconi22-ollie.s3.us-east-2.amazonaws.com/4ef93842ec094f6a894b488e44f3923f.jpg",
      alt: "Image 1 for Carousel",
    },
    {
      src: "https://marconi22-ollie.s3.us-east-2.amazonaws.com/3ccee02ea9594c62808847fc39415ef2.jpg",
      alt: "Image 2 for Carousel",
    },
    {
      src: "https://marconi22-ollie.s3.us-east-2.amazonaws.com/5fec772503844428aa586e96bfe56106.jpg",
      alt: "Image 3 for Carousel",
    },
    {
      src: "https://marconi22-ollie.s3.us-east-2.amazonaws.com/4304884ee508475ea01788f0c80b2067.jpg",
      alt: "Image 4 for Carousel",
    },
    {
      src: "https://marconi22-ollie.s3.us-east-2.amazonaws.com/00b15e1623f74f1c9416ea5b20471ea1.jpg",
      alt: "Image 5 for Carousel",
    },
    {
      src: "https://marconi22-ollie.s3.us-east-2.amazonaws.com/87f3f0839e0046ce8fde93eedec4ad87.jpg",
      alt: "Image 6 for Carousel",
    },
  ];

  const avgReviews = (arr) => {
    let sum = 0;
    for (let review of arr) {
      sum += review.rating;
    }
    let avg = (sum / arr.length).toFixed(1);

    return arr.length ? (
      <div className="sitter-reviews">
        <span className="paw-wrapper">
          <i className="fa-solid fa-paw"></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 1
                  ? "none"
                  : `polygon(0 0, ${avg * 100}% 0, ${avg * 100}% 100%, 0 100%)`,
            }}
          ></i>
        </span>
        <span className="paw-wrapper">
          <i className="fa-solid fa-paw"></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 2
                  ? "none"
                  : `polygon(0 0, ${(avg - 1) * 100}% 0, ${
                      (avg - 1) * 100
                    }% 100%, 0 100%)`,
            }}
          ></i>
        </span>
        <span className="paw-wrapper">
          <i className="fa-solid fa-paw"></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 3
                  ? "none"
                  : `polygon(0 0, ${(avg - 2) * 100}% 0, ${
                      (avg - 2) * 100
                    }% 100%, 0 100%)`,
            }}
          ></i>
        </span>
        <span className="paw-wrapper">
          <i className="fa-solid fa-paw"></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 4
                  ? "none"
                  : `polygon(0 0, ${(avg - 3) * 100}% 0, ${
                      (avg - 3) * 100
                    }% 100%, 0 100%)`,
            }}
          ></i>
        </span>
        <span className="paw-wrapper">
          <i className="fa-solid fa-paw"></i>
          <i
            className="fa-solid fa-paw filled"
            style={{
              clipPath:
                avg >= 5
                  ? "none"
                  : `polygon(0 0, ${(avg - 4) * 100}% 0, ${
                      (avg - 4) * 100
                    }% 100%, 0 100%)`,
            }}
          ></i>
        </span>
        &nbsp;&nbsp;
        <span className="paw-wrapper">
          <p style={{ fontSize: "12px" }}>
            <b
              style={{
                color: "rgba(255, 255, 255, 0.75)",
                textDecoration: "underline",
              }}
            >
              {arr.length}
            </b>{" "}
            Reviews
          </p>
        </span>
      </div>
    ) : (
      <div className="sitter-reviews">
        <p
          className="paw-wrapper"
          style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "17px" }}
        >
          No Reviews
        </p>
      </div>
    );
  };

  const backSlide = () => {
    setSlide((prevSlide) => {
      if (prevSlide === 0) {
        return slides.length - 1;
      }
      return prevSlide - 1;
    });
  };

  const nextSlide = () => {
    setSlide((prevSlide) => {
      if (prevSlide === slides.length - 1) {
        return 0;
      }
      return prevSlide + 1;
    });
  };

  const Tooltip = ({ children, tooltipText }) => {
    return (
      <div className="tooltip-container">
        {children}
        <div className="tooltip-text">{tooltipText}</div>
      </div>
    );
  };

  return (
    isLoaded && (
      <>
        <SearchBar />
        <div id="landing-ad">
          <h1>Keep your best friends Paw-tected</h1>

          <div id="img-div">
            <BsArrowLeftCircleFill
              className="arrow arrow-left"
              disabled={slide === 0}
              onClick={backSlide}
            />
            {slides.map((pic, i) => {
              return (
                <img
                  src={pic.src}
                  alt={pic.alt}
                  key={i}
                  className={slide === i ? "slide" : "slide-hidden"}
                ></img>
              );
            })}
            <BsArrowRightCircleFill
              className="arrow arrow-right"
              onClick={nextSlide}
            />
            <span className="indicators">
              {slides.map((_pic, i) => {
                return (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    style={{
                      backgroundColor: slide === i ? "#209c85" : "#ffffff80",
                    }}
                    className="indicator"
                  ></button>
                );
              })}
            </span>
          </div>
        </div>
        <div id="all-sitters">
          <p style={{ fontStyle: "italic", fontSize: "20px" }}>
            Choose from a Bark-load of pet sitters to request a Sitting
          </p>
          {allSitters &&
            allSitters.map(
              (sitter) =>
                (!user || sitter.id !== user.id) && (sitter.addresses.filter(address => address.sitting_address).length) && (
                  <div
                    className="sitter-card"
                    onClick={() => navigate(`/sitter/${sitter.id}`)}
                    key={sitter.id}
                    style={{cursor: 'pointer'}}
                  >
                    <h4 id="sitter-name" style={{cursor: 'pointer'}}>
                      {sitter.first_name} {sitter.last_name}
                    </h4>
                    <p id="sitter-username" style={{cursor: 'pointer'}}>@{sitter.username}</p>
                    <img
                      src={sitter.profile_pic}
                      alt=""
                      className="sitter-pfp"
                      style={{cursor: 'pointer'}}
                    />
                    <div id="sitter-reviews" style={{cursor: 'pointer'}}>{avgReviews(sitter.reviews)}</div>
                    <p id="sitter-location" style={{cursor: 'pointer'}}>
                      {sitter.addresses[0]?.city}<br/>
                      {sitter.addresses[0]?.state}
                    </p>
                    <div id="services-div">
              {sitter.overnight && <i class="fas fa-moon"></i>}
          {sitter.at_home &&<i class="fas fa-home"></i>}
          </div>
                  </div>
                )
            )}
        </div>
      </>
    )
  );
}

export default LandingPage;
