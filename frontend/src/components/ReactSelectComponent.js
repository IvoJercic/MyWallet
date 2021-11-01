import Select, { components } from "react-select";
import './ReactSelectComponent.css';

const ReactSelectComponent = ({ options,setCategoryName }) => {
    return (
      <div>
        <Select options={ options }           
         className="reactSelect"
        />
      </div>
    );
  };
  export default ReactSelectComponent;