import { userAgent } from 'next/server'
import React, { useState } from 'react'
import { useAuth } from '../Authentication/auth'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Blogs = () => {

  const auth = useAuth();

  const [wholetext, setWholeText] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [arrParagraph, setArrParagraph] = useState([]);

  function handleChange(event) {
    setParagraph(event.target.value);
    setParagraph(event.target.value);
  }

  function handleKeyPress(event) {
    // check if the Enter key is pressed
    if (event.key === "Enter") {
      // add a new attribute to the object with the current date and time as its value
      setArrParagraph((prevState) => ({
        ...prevState,
        [new Date().toLocaleString()]: paragraph,
      }));
      // clear the input field
      setParagraph("");
    }
  }

  const handleCheck = () => {
    console.log(arrParagraph);
  }


  return (
    <div>
      <Header />
      <div>
        {auth.role == "admin" && (
          <div>
            <div>
              <input
                type="text"
                value={wholetext}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button onClick={handleCheck}>check</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Blogs

//review
//http://localhost:8000/review/getBlogs