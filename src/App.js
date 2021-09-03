import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch } from "react-switch-input";

function App() {
  // New array to store currently selected arrays

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

  //Give each civ a unique ID
  civilizations.forEach((item, i) => {
    item.id = i++;
  });

  // STATES
  const [checkedState, setCheckedState] = useState(
    new Array(civilizations.length).fill(true)
  );

  const [displayedCiv, setDisplayedCiv] = useState("");

  // Gets the index of the true civs in the array checkedState
  const indices = checkedState.reduce(
    (out, bool, index) => (bool ? out.concat(index) : out),
    []
  );

  // HANDLERS
  // updates the state of each individual civ(true or false)
  const handleChangeSwitch = (position) => {
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
    console.log(trueCivilizations);

    //Get a random number to pick from selected civilzations
    const randNum = Math.floor(Math.random() * trueCivilizations.length);
    setDisplayedCiv(trueCivilizations[randNum]);
    console.log(displayedCiv);
  };

  const getNewTrueCivArray = () => {};

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

      <h2 className="display-civ">{displayedCiv}</h2>

      <ul className="list-civs">
        {civilizations.map(({ name, id }) => (
          <div>
            <span>{`${name}`}</span>
            <Switch
              id={id}
              name={name}
              checked={checkedState[id]}
              onChange={() => handleChangeSwitch(id)}
            />
          </div>
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
