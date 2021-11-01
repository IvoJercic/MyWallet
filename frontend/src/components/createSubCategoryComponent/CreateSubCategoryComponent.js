import './CreateSubCategoryComponent.css';

import IconDisplayComponent from '../iconDisplayComponent/IconDisplayComponent';
import { CirclePicker } from 'react-color';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewMainCategory } from "../../redux/actions/categoryActions";
import ReactSelectComponent from '../ReactSelectComponent';

const CreateSubCategoryComponent = ({ categoryList }) => {

    const [categoryName, setCategoryName] = useState("");
    const [selectedColor, setSelectedColor] = useState("#2196f3");
    const [selectedIcon, setSelectedIcon] = useState("");

    const [listForSelect,setListForSelect]=useState([]);

    // useEffect(()=>{
    //     let listOfObjects=[];
    //     categoryList.forEach(element => {
    //         let oo={};
    //         oo.value=element.name;
    //         oo.label=element.name;
    //         listOfObjects.push(oo);
    //     });
    //     console.log(listOfObjects);
    //     setListForSelect(listOfObjects);
    // },[listForSelect]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNewMainCategory(categoryName, selectedColor, selectedIcon))
    };

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };
    const makeObject=()=>{

    }
    
    const stateOptions = [
        { value: "AL", label: "Alabama" },
        { value: "AK", label: "Alaska" },
        { value: "AS", label: "American Samoa" },
        { value: "AZ", label: "Arizona" },
        { value: "AR", label: "Arkansas" },
        { value: "CA", label: "California" },
        { value: "CO", label: "Colorado" },
        { value: "CT", label: "Connecticut" },
        { value: "DE", label: "Delaware" },
        { value: "DC", label: "District Of Columbia" },
        { value: "FM", label: "Federated States Of Micronesia" },
        { value: "FL", label: "Florida" },
        { value: "GA", label: "Georgia" },
        { value: "GU", label: "Guam" },
        { value: "HI", label: "Hawaii" },
        { value: "ID", label: "Idaho" },
        { value: "IL", label: "Illinois" },
        { value: "IN", label: "Indiana" },
        { value: "IA", label: "Iowa" },
        { value: "KS", label: "Kansas" },
        { value: "KY", label: "Kentucky" },
        { value: "LA", label: "Louisiana" },
        { value: "ME", label: "Maine" },
        { value: "MH", label: "Marshall Islands" },
        { value: "MD", label: "Maryland" },
        { value: "MA", label: "Massachusetts" },
        { value: "MI", label: "Michigan" },
        { value: "MN", label: "Minnesota" },
        { value: "MS", label: "Mississippi" },
        { value: "MO", label: "Missouri" },
        { value: "MT", label: "Montana" },
        { value: "NE", label: "Nebraska" },
        { value: "NV", label: "Nevada" },
        { value: "NH", label: "New Hampshire" },
        { value: "NJ", label: "New Jersey" },
        { value: "NM", label: "New Mexico" },
        { value: "NY", label: "New York" },
        { value: "NC", label: "North Carolina" },
        { value: "ND", label: "North Dakota" },
        { value: "MP", label: "Northern Mariana Islands" },
        { value: "OH", label: "Ohio" },
        { value: "OK", label: "Oklahoma" },
        { value: "OR", label: "Oregon" },
        { value: "PW", label: "Palau" },
        { value: "PA", label: "Pennsylvania" },
        { value: "PR", label: "Puerto Rico" },
        { value: "RI", label: "Rhode Island" },
        { value: "SC", label: "South Carolina" },
        { value: "SD", label: "South Dakota" },
        { value: "TN", label: "Tennessee" },
        { value: "TX", label: "Texas" },
        { value: "UT", label: "Utah" },
        { value: "VT", label: "Vermont" },
        { value: "VI", label: "Virgin Islands" },
        { value: "VA", label: "Virginia" },
        { value: "WA", label: "Washington" },
        { value: "WV", label: "West Virginia" },
        { value: "WI", label: "Wisconsin" },
        { value: "WY", label: "Wyoming" }
      ];
    return (
        <form action="#" className="sign-up-form createcategory" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="center">Add new subcategory</h1>
            <ReactSelectComponent options={[
                        { value: "AL", label: "Alabama" },

            ]} />
            <select>
                {
                    categoryList.map(category =>
                        <option
                            key={"option__"+category.name}
                            style={{ background: category.color }}
                        >
                            {category.name}
                        </option>
                    )}
            </select>
            <div className="createcategory__input">
                <i className="fas fa-list"></i>
                <input
                    type="text"
                    placeholder="Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
            </div>

            <CirclePicker
                className="colorPicker"
                color={selectedColor}
                onChangeComplete={handleColorChange}
            />
            <br />
            <br />
            <IconDisplayComponent selectedColor={selectedColor} setSelectedIcon={setSelectedIcon} />
            <br />
            <button
                type="submit"
                className={selectedIcon !== "" && categoryName !== "" && categoryName.length > 2 ? "btn solid" : "btnDisabled"}
            >Save</button>
        </form>
    );
};

export default CreateSubCategoryComponent;