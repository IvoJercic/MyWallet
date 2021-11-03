import Select, { components } from "react-select";
import './ReactSelectComponent.css';

const ReactSelectComponent = ({ options }) => {
    return (
      <div>
        <Select options={ options }           
         className="reactSelect"
        />
      </div>
    );
  };
  export default ReactSelectComponent;