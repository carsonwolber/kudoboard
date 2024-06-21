import './App.css'
import Search from './Search'
import Sort from './Sort'
import BoardList from './BoardList'
import CreateForm from './CreateForm'

import { useState, useEffect } from 'react';

function App() {
  const [formView, setFormView] = useState(false);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [shownCards, setShownCards] = useState([]); //shownCards is used for search and sort because modifying the card state directly causes us to lose data


  useEffect(() => {
    fetchCards();
  }, []);
  /*form view is handled by a basic boolean (if false the component just returns null
  the handler therefore needs to be in the parent component which is why show/hide are here
  */
  const showCreateForm = () => {
    setFormView(true)
  }

  const closeView = () => {
    setFormView(false)
  }

  const handleSearch = (query) => {
    setSearch(query)
    const filtered = cards.filter(card => 
      card.title.toUpperCase().includes(query.toUpperCase())
    );
    setShownCards(filtered);
  };


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
      setShownCards(data);
    })
    .catch(error => {
      console.error('Error fetching card:', error);
    });
  };

  return (
    <>
    <header>
      <h3>Kudos Board</h3>
      <Search searchQuery={search} setSearchQuery={handleSearch}/>
      <Sort/>
    </header>
    <div className='App'>
      <CreateForm
        view = {formView}
        closeView = {closeView}
      />
      <BoardList data={shownCards}/>
    </div>
    <footer>
      <button onClick={showCreateForm}>New Board</button>
    </footer>
    </>
  )
}

export default App;
