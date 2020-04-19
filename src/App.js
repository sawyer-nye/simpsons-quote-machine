import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quote = () => {
  const [quoteData, setQuoteData] = useState({ quote: null, character: null, image: null });

  const colors = ['Tomato', 'PaleTurquoise', 'Orchid', 'DarkKhaki', 'PaleVioletRed', 'SlateGrey', 'IndianRed'];

  const getRandomColor = () => colors[Math.floor(Math.random() * (colors.length - 1))];

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
      document.documentElement.style.setProperty('--current-color', getRandomColor());
      const response = await axios.get('https://thesimpsonsquoteapi.glitch.me/quotes');
      console.log(response.data[0]);
      setQuoteData(response.data[0]);
    }
    catch (err) {
      console.log(err);
      alert('Something went wrong while fetching the quote...');
      setQuoteData({ quote: 'No quote was fetched to display' });
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
