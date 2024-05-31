import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getSittersThunk } from "../../redux/sitter";
import './LandingPage.css'
import { applyMiddleware } from "redux";

function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allSitters = useSelector(state => state.sitter.all);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getSittersThunk()).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch]);

    const avgReviews = (arr) => {
        let sum = 0;
        for (let review of arr) {
            sum += review.rating;
        }
        let avg = (sum / arr.length).toFixed(1);

        return (
            arr.length ? (
                <div className="sitter-reviews">
                    <span className="paw-wrapper">
                        <i className="fa-solid fa-paw"></i>
                        <i className="fa-solid fa-paw filled" style={{ clipPath: avg >= 1 ? 'none' : `polygon(0 0, ${avg * 100}% 0, ${avg * 100}% 100%, 0 100%)` }}></i>
                    </span>
                    <span className="paw-wrapper">
                        <i className="fa-solid fa-paw"></i>
                        <i className="fa-solid fa-paw filled" style={{ clipPath: avg >= 2 ? 'none' : `polygon(0 0, ${(avg - 1) * 100}% 0, ${(avg - 1) * 100}% 100%, 0 100%)` }}></i>
                    </span>
                    <span className="paw-wrapper">
                        <i className="fa-solid fa-paw"></i>
                        <i className="fa-solid fa-paw filled" style={{ clipPath: avg >= 3 ? 'none' : `polygon(0 0, ${(avg - 2) * 100}% 0, ${(avg - 2) * 100}% 100%, 0 100%)` }}></i>
                    </span>
                    <span className="paw-wrapper">
                        <i className="fa-solid fa-paw"></i>
                        <i className="fa-solid fa-paw filled" style={{ clipPath: avg >= 4 ? 'none' : `polygon(0 0, ${(avg - 3) * 100}% 0, ${(avg - 3) * 100}% 100%, 0 100%)` }}></i>
                    </span>
                    <span className="paw-wrapper">
                        <i className="fa-solid fa-paw"></i>
                        <i className="fa-solid fa-paw filled" style={{ clipPath: avg >= 5 ? 'none' : `polygon(0 0, ${(avg - 4) * 100}% 0, ${(avg - 4) * 100}% 100%, 0 100%)` }}></i>
                    </span>
                    &nbsp;&nbsp;
                    <span className="paw-wrapper">
                        <p style={{fontSize: '12px'}}><b style={{color: '#b4b4b4', textDecoration: 'underline'}}>{arr.length}</b> Reviews</p>
                    </span>
                </div>
            ) : (
                <div className="sitter-reviews">
                    <p className='paw-wrapper' style={{color: '#b4b4b4', fontSize: '17px'}}>No Reviews</p>
                </div>
            )
        );
    };

    return (isLoaded && (
        <div id="all-sitters">
            {allSitters && allSitters.sitters.map((sitter) => (
                <div className="sitter-card" onClick={() => navigate(`/sitter/${sitter.sitter_id}`)} key={sitter.id}>
                    <h4 id="sitter-name">{sitter.first_name} {sitter.last_name}</h4>
                    <p id="sitter-username">@{sitter.username}</p>
                    <img src={sitter.profile_pic} alt="" id="sitter-pfp"/>
                    <div id="sitter-reviews">{avgReviews(sitter.reviews)}</div>
                    <p id="sitter-location">x Miles away:&nbsp;&nbsp;{sitter.addresses[0].city}, {sitter.addresses[0].state}</p>
                </div>
            ))}
        </div>
    ));
}

export default LandingPage;