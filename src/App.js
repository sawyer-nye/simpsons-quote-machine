import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = () => {
  const [quoteData, setQuoteData] = useState({ quote: null, character: null, image: null });

  /*
  // A simple promise chain
  const getQuote = () => {
    axios
      .get('https://thesimpsonsquoteapi.glitch.me/quotes')
      .then(response => {
        console.log(response.data[0]);
        setQuoteData(response.data[0]);
      })
      .catch(err => console.log(err));
  }
  */

  // Equivalent of the above promise chain function, but with async/await
  const getQuote = async () => {
    try {
      const response = await axios.get('https://thesimpsonsquoteapi.glitch.me/quotes');
      console.log(response.data[0]);
      setQuoteData(response.data[0]);
    }
    catch (err) {
      console.log(err);
      alert('Something went wrong while fetching the quote...');
    }
  }

  useEffect(() => {
    getQuote();
  }, [])

  return (
    <div id='wrapper'>
      <div id='header'>
        <h1>simpson-quotes.react</h1>
      </div>
      <div id='quote-wrapper'>
        <div id='quote-box'>
          <div id='text'>
            <div className='big-quote'>"</div>
            {quoteData.quote}
            <div className='big-quote'>"</div>
          </div>
          <div id='author'>
            - {quoteData.character}
          </div>
          <div id='button-row'>
            <button id='new-quote-button' onClick={() => getQuote()}>New Quote</button>
          </div>
        </div>
        <div id='img-box'>
          <img src={quoteData.image} alt={quoteData.character}/>
        </div>
      </div>      
    </div>
  );
}

const App = () => {

  return (
    <div id='content'>
      <Quote />
    </div>
  );
}

export default App;
