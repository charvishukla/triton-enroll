import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { parseHtml } from "./parse_single_department.js";
import { buildcombinedJSON } from "./request_major";

function App() {
  const [formState, setFormState] = useState({
    term: "", // ex: "WI22"
    department: "", // ex: "CSE"
  });

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const combinedJSON = await buildcombinedJSON(
        formState.term,
        formState.department
      );
      const parsedData = parseHtml(combinedJSON);
      console.log("Parsed data: ", parsedData);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Term:
          <input
            type="text"
            name="term"
            placeholder="WI22"
            value={formState.term}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Department:
          <input
            type="text"
            name="department"
            placeholder="CSE"
            value={formState.department}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Fetch Data</button>
      </form>
    </div>
  );
}

export default App;