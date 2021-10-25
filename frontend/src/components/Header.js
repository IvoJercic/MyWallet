import { useHistory } from "react-router";

const Header = () => {
    const history=useHistory();
  return(
      <div>
          HEADER
          <button onClick={()=>{
              localStorage.removeItem("userInfo");
              history.push("/");
          }}>Loogut</button>
      </div>
  );
};

export default Header;