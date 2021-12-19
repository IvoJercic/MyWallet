import React, { useEffect, useState } from "react";

//Components
import * as FaIcons from 'react-icons/fa';

import './IconDisplayComponent.css';

const IconDisplayComponent = ({ selectedColor, setSelectedIcon, updateMode, iconBeforeUpdate }) => {
    const [selectedIconName, setSelectedIconName] = useState("");


    useEffect(() => {
        if (updateMode) {
            setSelectedIconName(iconBeforeUpdate);
            setSelectedIcon(iconBeforeUpdate);
        }
    }, []);

    const iconList = [
        "FaBtc",
        "FaCreativeCommonsBy",
        "FaCuttlefish",
        "FaDiaspora",
        "FaDribbble",
        "FaEbay",
        "FaEnvira",
        "FaEthereum",
        "FaMedapps",
        "FaRedhat",
        "FaSketch",
        "FaStickerMule",
        "FaStripeS",
        "FaTeamspeak",
        "FaAt",
        "FaBahai",
        "FaBeer",
        "FaBicycle",
        "FaBiking",
        "FaBomb",
        "FaBullseye",
        "FaCamera",
        "FaCampground",
        "FaCannabis",
        "FaCapsules",
        "FaCarAlt",
        "FaCat",
        "FaChargingStation",
        "FaChild",
        "FaCoffee",
        "FaCouch",
        "FaCross",
        "FaDesktop",
        "FaDog",
        "FaDumpster",
        "FaFighterJet",
        "FaFileCode",
        "FaFemale",
        "FaFlask",
        "FaGift",
        "FaFutbol",
        "FaGem",
        "FaGuitar",
        "FaHamburger",
        "FaHashtag",
        "FaHeart",
        "FaHome",
        "FaJoint",
        "FaKey",
        "FaMotorcycle",
        "FaMountain",
        "FaMusic",
        "FaPalette",
        "FaNewspaper",
        "FaOilCan",
        "FaPepperHot",
        "FaPizzaSlice",
        "FaPlane",
        "FaQuestion",
        "FaSkull",
        "FaTrain",
        "FaTrash",
        "FaCarCrash",
        "FaCarBattery",
        "FaBus",
        "FaBriefcaseMedical",
        "FaCandyCane",
        "FaCartPlus",
        "FaBasketballBall",
        "FaAward",
        "FaBolt",
        "FaBirthdayCake",
        "FaBurn",
        "FaCocktail",
        "FaCookie",
        "FaDollarSign",
        "FaDonate",
        "FaFish",
        "FaGifts",
        "FaGlassCheers",
        "FaIceCream",
        "FaPhoneAlt",
        "FaSearchDollar",
        "FaTablets",
        "FaWrench"
    ];

    const handleIconSelect = (e, iconName) => {
        e.preventDefault();
        setSelectedIconName(iconName);
        setSelectedIcon(iconName);
    };

    const createIcon = (iconName) => {
        const icon = React.createElement(FaIcons[iconName], { key: iconName, className: "icon" });
        let bckColor;
        if (iconName === selectedIconName) {
            bckColor = selectedColor
        }
        else {
            bckColor = "#C0C0C0";
        }
        return (
            <div
                onClick={(e) => handleIconSelect(e, iconName)}
                key={"div__" + iconName}
                style={{ background: bckColor }}
            >{icon}
            </div>
        );
    };

    const showIcons = iconList.map((iconName) => {
        return createIcon(iconName);
    });

    return (
        <div className="icondisplay">
            <div className="grid">
                {showIcons}
            </div>
        </div>
    );
};

export default IconDisplayComponent;