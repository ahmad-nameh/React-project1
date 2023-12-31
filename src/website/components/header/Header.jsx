import React from "react";
import "./Header.css";
import SearchBar from "../searchbar&itscomponenet/SearchBar";
import videosrc from "../../../assets/motor-boat-23011-١.mp4";
import { useTranslation } from "react-i18next";

const Header = (props) => {

    const [Lan,i18n] = useTranslation();

    if(props.name==="home") {
    return (
        <div>
            <div className="home-header"></div>
            <div className="homepage-searchbar">
                <SearchBar name="homesearchbar"/>
            </div>
        </div>
    )
}
else if(props.name==="hotels"){
    return(
        <div className="header hotel-header centring-flex">
            <div className="form">
                <p>{Lan('latest')}</p>
                <SearchBar name="hotelsearchbar"/>
            </div>
        </div>
    )
}
else if(props.name==="flights"){
    return(
        <div className="header flight-header centring-flex">
            <div className="form">
                <SearchBar name="flightsearchbar"/>
            </div>
        </div>
    )
}
else if(props.name==="trips"){
    return(
        <div className="header trip-header centring-flex">
            <video src={videosrc} muted={true} autoPlay={true} loop={true} type="video/mp4"></video>
            <div className="form">
            <p>{Lan("search_your")}<span>{Lan("holiday")}</span></p>
                <SearchBar name="tripsearchbar"/>
            </div>
        </div>
    )
}
else if(props.name==="attractions"){
    return(
        <div className="header attraction-header centring-flex">
            <div className="form">
                <SearchBar name="attractionsearchbar"/>
            </div>
        </div>
    )
}
} 

export default Header;