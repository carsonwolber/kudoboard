import './App.css'
import Search from './Search'
import Sort from './Sort'
import BoardList from './BoardList'
import CreateForm from './CreateForm'

import { useState, useEffect } from 'react';

function App() {
  const [formView, setFormView] = useState(false);
  const [cards, setCards] = useState([]);


  useEffect(() => {
    fetchCards();
  }, []);
  //form view is handled by a basic boolean (if false the component just returns null
  //the handler therefore needs to be in the parent component which is why show/hide are here
  const showCreateForm = () => {
    setFormView(true)
  }

  const closeView = () => {
    setFormView(false)
  }

  const fetchCards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setCards(data);
    })
    .catch(error => {
      console.error('Error fetching card:', error);
    });
  };




  return (
    <>
    <header>
      <h3>Kudos Board</h3>
    </header>
    <div className='App'>
      <Search/>
      <Sort/>
      <CreateForm
        view = {formView}
        closeView = {closeView}
      />
      <BoardList data={cards}/>
    </div>
    <footer>
      <button onClick={showCreateForm}>New Board</button>
    </footer>
    </>
  )
}

export default App;
