import React, { useState, useRef } from "react";
import "./App.css";
import { Switch } from "react-switch-input";

//TO DO
//1. logos and link to tech tree - DONE
//1a. Style logos in columns better - DONE
//2. add custom civs - MAYBE LATER
//3. Include all/ exclude all buttons - DONE
//4. Generate error message when trying to select a random civ while none are selected
//5. title header of page - DONE
//6. Random map selector
//7. Remove recently selected civilizations from being selected again
//8. LINE THROUGH WHEN SET TO FALSE
//9. MAKE OWN API TO GET CIVS?

function App() {
  //Array of all civilizations in AOE2
  const civilizations = [
    { name: "Aztecs" },
    { name: "Berbers" },
    { name: "Bohemians" },
    { name: "Britons" },
    { name: "Bulgarians" },
    { name: "Burgundians" },
    { name: "Burmese" },
    { name: "Byzantines" },
    { name: "Celts" },
    { name: "Chinese" },
    { name: "Cumans" },
    { name: "Ethiopians" },
    { name: "Franks" },
    { name: "Goths" },
    { name: "Huns" },
    { name: "Incas" },
    { name: "Indians" },
    { name: "Italians" },
    { name: "Japanese" },
    { name: "Khmer" },
    { name: "Koreans" },
    { name: "Lithuanians" },
    { name: "Magyars" },
    { name: "Malay" },
    { name: "Malians" },
    { name: "Mayans" },
    { name: "Mongols" },
    { name: "Persians" },
    { name: "Poles" },
    { name: "Portuguese" },
    { name: "Saracens" },
    { name: "Sicilians" },
    { name: "Slavs" },
    { name: "Spanish" },
    { name: "Tatars" },
    { name: "Teutons" },
    { name: "Turks" },
    { name: "Vietnamese" },
    { name: "Vikings" },
  ];

  // Some AOE2 wiki links are a different format, so store the civs with the different link in this array
  const conditionsArray = [
    "Aztecs",
    "Berbers",
    "Chinese",
    "Ethiopians",
    "Incas",
    "Indians",
    "Japanese",
    "Mongols",
    "Persians",
    "Portuguese",
    "Spanish",
  ];

  //Give each civ a unique ID
  civilizations.forEach((item, i) => {
    item.id = i++;
  });

  // STATES
  const [checkedState, setCheckedState] = useState(
    new Array(civilizations.length).fill(true)
  );

  const [displayedCiv, setDisplayedCiv] = useState("");
  const [{ errStatus, errMessage }, setErrorMessage] = useState({
    errStatus: false,
    errMessage: "",
  });

  // HANDLERS
  // updates the state of each individual civ(true or false)
  const handleChangeSwitch = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    setErrorMessage(() => ({ status: false, message: "" }));
  };

  // Picks a random civ from the selected civs
  const randomButtonHandler = () => {
    const trueCivilizations = [];
    //If checked state includes true values, proceed as normal
    if (checkedState.includes(true)) {
      setErrorMessage(() => ({ status: false, message: "" }));
      //New array to store selected civilzations
      for (let i = 0; i < checkedState.length; i++) {
        if (checkedState[i] === true) {
          //Add only selected civs to the array
          trueCivilizations.push(civilizations[i].name);
        }
      }
      //if no true values exist, generate error msg
    } else {
      setErrorMessage(() => ({
        errStatus: true,
        errMessage: "No civilization selected!",
      }));
    }

    //Get a random number to pick from selected civilzations
    const randNum = Math.floor(Math.random() * trueCivilizations.length);
    setDisplayedCiv(trueCivilizations[randNum]);
  };

  // Open civ wiki page
  const linkCiv = (e) => {
    e.preventDefault();
    if (conditionsArray.includes(displayedCiv)) {
      window.open(
        `https://ageofempires.fandom.com/wiki/${displayedCiv}_(Age_of_Empires_II)`
      );
      // window.open(`https://aoe2techtree.net/#${displayedCiv}`);
    } else {
      window.open(`https://ageofempires.fandom.com/wiki/${displayedCiv}`);
    }
  };

  // Opens tech tree when clicking civ logo
  const linkTechTree = () => {
    window.open(`https://aoe2techtree.net/#${displayedCiv}`);
  };

  const mapPage = useRef();
  const landingPage = useRef();
  const civPage = useRef();

  const mapPageHandler = () => {
    mapPage.current.scrollIntoView({ behavior: "smooth" });
  };

  const civPickerHandler = () => {
    civPage.current.scrollIntoView({ behavior: "smooth" });
  };

  const homePageHandler = () => {
    landingPage.current.scrollIntoView({ behavior: "smooth" });
  };

  const excludeAllHandler = (e) => {
    e.preventDefault();
    const excludeAllState = checkedState;
    var i,
      n = checkedState.length;
    //set all states to false
    for (i = 0; i < n; ++i) {
      excludeAllState[i] = false;
    }
    //update checked state array with all falses
    setCheckedState(excludeAllState);
    //updates switches on screen
    handleChangeSwitch();
  };

  const includeAllHandler = (e) => {
    e.preventDefault();
    const includeAllState = checkedState;
    var i,
      n = checkedState.length;
    for (i = 0; i < n; ++i) {
      includeAllState[i] = true;
    }
    //update checked state array with all trues
    setCheckedState(includeAllState);
    setErrorMessage(() => ({ status: false, message: "" }));
    //updates switches on screen
    handleChangeSwitch();
  };

  // const inputSubmitHandler = (e) => {
  //   e.preventDefault();
  //   console.log("hey");
  // };

  // RETURN
  return (
    <div className="App">
      <section>
        <header>
          <div className="text-box">
            <h1 ref={landingPage} className="heading-primary">
              <span className="heading-primary-main">
                AoE2 Random Generator
              </span>
            </h1>

            <button
              className="btn btn-white btn-animated"
              onClick={civPickerHandler}
            >
              Civilization Picker
            </button>
            <button
              className="btn btn-white btn-animated"
              onClick={mapPageHandler}
            >
              Map Picker
            </button>
          </div>
        </header>
      </section>

      <section className="section-two">
        <div className="button-wrapper">
          <button className="submit-button" onClick={randomButtonHandler}>
            Random Civilization
          </button>
        </div>

        <div>
          <button
            className="submit-button button-exclude"
            onClick={excludeAllHandler}
          >
            Exclude All
          </button>
          <button
            className="submit-button button-include"
            onClick={includeAllHandler}
          >
            Include All
          </button>
          {/* Commented out - No custom civ input for now */}
          {/* <form className="custom-entry-form">
            <label>
              Enter custom civilization:
              <input type="text" />
            </label>
            <input
              className="submit-button form-submit"
              type="submit"
              value="Add"
              onSubmit={inputSubmitHandler}
            />
          </form> */}
        </div>

        <div ref={civPage} className="display-container">
          <p className="display-civ" onClick={linkCiv}>
            {displayedCiv}
          </p>
          <img
            className="display-civ-logo"
            src={`../assets/CivIcon-${displayedCiv}.png`}
            alt=""
            onClick={linkTechTree}
          />
        </div>
        {errMessage && <div className="error"> {errMessage} </div>}
        <ul className="list-civs">
          {civilizations.map(({ name, id }) => (
            <li key={id}>
              {`${name}`}
              <div className="inner-list">
                <div className="switch">
                  <Switch
                    key={id}
                    name={name}
                    checked={checkedState[id]}
                    onChange={() => handleChangeSwitch(id)}
                  />
                </div>
                <img
                  src={`../assets/CivIcon-${name}.png`}
                  alt="civ icon"
                  className="civ-icons"
                ></img>
              </div>
            </li>
          ))}
        </ul>

        <div className="civPickerNavButtons">
          <button className="map-picker-button" onClick={mapPageHandler}>
            Map Picker
          </button>
          <button className="map-picker-button" onClick={homePageHandler}>
            Home
          </button>
        </div>
      </section>

      <section className="section-three">
        <h1 ref={mapPage}>Map Picker Page - UNDER CONSTRUCTION</h1>
      </section>
    </div>
  );
}

export default App;
