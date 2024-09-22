import React from "react"; 
import WordLetterCounter from "./WordLetterCounter"; 
import "./App.css"; 
  
function App() { 
    return ( 
        <div className="App"> 
            <h1 id="top"> 
            let have some fun!
            </h1> 
            <h1> 
            Words and Letters 
            Counter 
            </h1> 
            <WordLetterCounter /> 
        </div> 
    ); 
} 
  
export default App; 