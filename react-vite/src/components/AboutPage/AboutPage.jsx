import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import ReviewModal from "../ReviewModal";
import PetModal from "../PetModal/PetModal";
import "./AboutPage.css";
import { useEffect, useState } from "react";
import { getPetByIdThunk } from "../../redux/pet";
import { getReviewsByPetThunk } from "../../redux/review";

function AboutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { petId } = useParams();
  const user = useSelector((state) => state.session.user);
  const pet = useSelector((state) => state.pet.selected);
  const reviews = useSelector((state) => state.review.pet_reviews);
  const [isLoaded, setIsLoaded] = useState(false);

  const getAge = (date) => {
    const diffTime = Math.abs(new Date() - new Date(date));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);

    if (years >= 1) {
      return `${years} Years`;
    } else {
      return `${months} Months`;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPetByIdThunk(petId));
      await dispatch(getReviewsByPetThunk(petId));
      setIsLoaded(true);
    };

    fetchData();
  }, [dispatch, petId, isLoaded]);

  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
       <h1 className="form-title" style={{position: 'absolute', top: '120px', left: 0, right: 0}}>About</h1>
        <img src="/me.png" className="pfp" style={{
        margin: '0 auto', marginTop: '220px'
       }} alt="" />
       <p style={{textAlign: 'center'}}>Bob Marconi -- Software Engineer</p>
       <p style={{textAlign: 'center'}}>Follow or see my other projects below!</p>
       <div id="links-div">
       <a href="https://github.com/bobmarconi22" target="_blank"
          ><img
            src="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/github_coding_dev_developer-512.png"
            className="link-img" alt="github"
        /></a>
        <a href="https://www.facebook.com/Bobmarconi22/" target="_blank"
          ><img
            src="https://cdn3.iconfinder.com/data/icons/remixicon-logos/24/facebook-circle-line-512.png"
            className="link-img" alt="facebook"
        /></a>
        <a href="mailto:bobmarconi22@gmail.com"
          ><img
            src="https://cdn1.iconfinder.com/data/icons/ionicons-sharp-vol-1/512/at-sharp-512.png"
            className="link-img" alt="email"
        /></a>
        <a
          href="https://www.linkedin.com/in/bob-marconi-3656932a9/"
          target="_blank"
          ><img
            src="/linkdin.png"
            className="link-img" alt="linkdin"
        /></a>
      </div>
      </div>
  );
}

export default AboutPage;
