import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

const coursedata = require('./request_major.js');


function App() {
    // the user inputs the term and department 
    const [formState, setFormState] = useState({
      term: "",   // ex: "WI22"
      department: ""   // ex: "CSE"
    });

    // not sure what this is doing ......
    const handleChange = (event) => {
      setFormState({
        ...formState,
        [event.target.name]: event.target.value,
      });
    }; 

    // case where the user inputs nothing
    const inputEmpty = () => {
      return formState.term === "" || formState.department === "";
    };

    
    // add the json to DB 
    const add_to_database = async () =>{
      if (inputEmpty()) {
        window.alert("The input is empty");
      }
      else {
        try {
          // add everything to data base 
        } catch (e) {
          
        }
      }
    }
}

export default App;