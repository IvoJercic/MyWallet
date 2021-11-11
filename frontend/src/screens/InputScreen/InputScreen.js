import { useEffect, useState } from "react";

//Components

const InputScreen = ({history}) => {

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);


  return (
    <div>
      INPUT
    </div>
  );
};

export default InputScreen;