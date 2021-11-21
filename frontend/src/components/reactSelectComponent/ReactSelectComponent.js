import { useState } from "react";
import Select, { components } from "react-select";
import './ReactSelectComponent.css';

const ReactSelectComponent = ({ options ,handleCategorySelect}) => {
  const [selectedValue,setSelectedValue]=useState("");

  const handleChange=(selectedValue)=>{
    setSelectedValue(selectedValue);
    handleCategorySelect(selectedValue.category);
  }

    return (
      <div>
        <Select options={ options }           
        id="selectCategory"
         className="reactSelect"
        value={selectedValue}
        onChange={handleChange}        
        />
      </div>
    );
  };
  export default ReactSelectComponent;