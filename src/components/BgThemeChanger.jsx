import React, { useEffect } from "react";
import { useThemeContext } from "../store/ThemeContext";
import { PiSealWarningBold } from "react-icons/pi";

function BgThemeChanger() {
  // handle theme functionality
  const { themeData, setTheme, applyTheme } = useThemeContext();

  const applyThemeBtn =(text,e)=>{

    const obj = [
      {
        themeText: "applied",
      },
    ];
    localStorage.setItem("btnTd",JSON.stringify([...obj, {id:e.target.id}]));
  }

  const handleClick = (e) => {
    e.target.textContent = "applied";
    applyThemeBtn("applied",e);
    // const { themeText } =
    //   JSON.parse?.(localStorage.getItem("applyThemeText")) || "Apply Theme";
    // const { isSetTheme } =
    //   JSON.parse?.(localStorage.getItem("setBgTheme")) || {};
    // if (isSetTheme === true) {
    //   e.target.textContent = themeText;
    // }
    applyTheme();
  };

  useEffect(() => {
    window.onload = () => {
      handleClick();
    };
  }, []);

  const warningIcon = {
    fontSize: "1.5rem",
    margin: "0 .25rem .25rem",
    color: "red",
  };

  return (
    <>
      <div className="alert alert-warning m-2" role="alert">
        <PiSealWarningBold style={warningIcon} />
        Before applying the theme please{" "}
        <u className="text-danger fst-italic fw-bold"> click on the image </u>,
        after that click on
        <span className="text-danger fw-bold fst-italic">
          {" "}
          'Apply Theme'
        </span>{" "}
        button.
      </div>

      <div className="theme-container">
        {themeData.map((theme, idx) => {
          return (
            <div
              key={theme.id}
              className="card"
              style={{ width: "14rem", height: "18rem" }}
            >
              <img
                src={theme.imgUrl}
                width="100%"
                height="210px"
                className="card-img-top"
                alt="theme-image"
                id={`img-${theme.id}`}
                onClick={() => setTheme(theme.imgUrl)}
              />
              <div className="card-body">
                <button
                  id={`btn-${idx+1}-896`}
                  className="btn btn-primary"
                  onClick={(e) => handleClick(e)}
                >
                  Apply Theme
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BgThemeChanger;
