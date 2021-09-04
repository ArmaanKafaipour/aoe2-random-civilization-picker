import React, { useState } from "react";
import "./App.css";
import { Switch } from "react-switch-input";

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

  // HANDLERS
  // updates the state of each individual civ(true or false)
  const handleChangeSwitch = (position) => {
    // //Reduce checked state to only true items
    // checkedState.reduce(
    //   (out, bool, index) => (bool ? out.concat(index) : out),
    //   []
    // );

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  // Picks a random civ from the selected civs
  const randomButtonHandler = () => {
    //New array to store selected civilzations
    const trueCivilizations = [];
    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i] === true) {
        //Add only selected civs to the array
        trueCivilizations.push(civilizations[i].name);
      }
    }

    //Get a random number to pick from selected civilzations
    const randNum = Math.floor(Math.random() * trueCivilizations.length);
    setDisplayedCiv(trueCivilizations[randNum]);

    // console.log(trueCivilizations);
    // console.log(checkedState);
  };

  // Open civ tech tree wiki page
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

  // RETURN
  return (
    <div className="App">
      <header>
        <h1>AOE2 Civilization Picker</h1>
      </header>
      <div className="button-wrapper">
        <button className="submit-button" onClick={randomButtonHandler}>
          Random Civilization
        </button>
      </div>
      <p className="display-civ" onClick={linkCiv}>
        {displayedCiv}
      </p>
      <ul className="list-civs">
        {civilizations.map(({ name, id }) => (
          <li key={id}>
            <span>
              {`${name}`}
              <div className="switch">
                <Switch
                  key={id}
                  name={name}
                  checked={checkedState[id]}
                  onChange={() => handleChangeSwitch(id)}
                />
              </div>
            </span>
          </li>
          //HOW TO GET MULTIPLE SEPARATE SWITCHES - DONE
          //EACH WITH SEPARATE TRUE/FALSE - DONE
          //CREATE FILTERED ARRAY WITH ONLY TRUE ONES - DONE
          //
          //LINE THROUGH WHEN SET TO FALSE
          //STYLING
        ))}
      </ul>
    </div>
  );
}

export default App;
