import './App.css'
import Search from './Home Page/Search'
import Filter from './Home Page/Filter'
import BoardList from './Home Page/BoardList'
import CreateForm from './Home Page/CreateForm'
import BoardPage from './Board Page/BoardPage';

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [formView, setFormView] = useState(false);
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [shownCards, setShownCards] = useState([]); // shownCards is used for search and sort because modifying the card state directly causes us to lose data


  useEffect(() => {
    fetchCards();
  }, []);

  /* Form view is handled by a basic boolean (if false the component just returns null
  the handler therefore needs to be in the parent component which is why show/hide are here
  */
  const showCreateForm = () => {
    setFormView(true)
  }

  const closeView = () => {
    setFormView(false)
  }

  // When a search  or filter is made perform a filter pattern matching the search [query] or filter(s) to shownCards
  const handleSearch = (query) => {
    setSearch(query)
    const matchingCards = cards.filter(card => 
      card.title.toUpperCase().includes(query.toUpperCase())
    );
    setShownCards(matchingCards);
  };


  const handleFilter = (filters) => {
    setFilter(filters);
    if (filters.length === 0) {
      setShownCards(cards); // Reset to all cards if no filters are selected
    } else {
      let resultCards = cards;
  
      // If 'recent' is one of the filters, sort the cards by a timestamp or similar property
      if (filters.includes('recent')) {
        resultCards = [...resultCards].sort((a, b) => b.id - a.id); // Assuming 'id' can be used as a proxy for recency
      }
  
      // Apply category filters if there are any filters other than 'recent'
      if (filters.some(filter => filter !== 'recent')) {
        resultCards = resultCards.filter(card => 
          filters.includes(card.category)
        );
      }
  
      setShownCards(resultCards);
    }
  };


  const fetchCards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setCards(data);
      setShownCards(data); // Both sets of cards should have the full suite to start and then the shown state is dynamic for rendering
    })
    .catch(error => {
      console.error('Error fetching card:', error);
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/boards/:boardId" element={<BoardPage />} />
        <Route path="/" element={
          <>
            <header>
              <h1>Kudos Board</h1>
              <div className='banner'>
                <Search searchQuery={search} setSearchQuery={handleSearch}/>
                <Filter setFilters={handleFilter}/>
                <p>Create a new Board Today!(this is the banner)</p>
              </div>
            </header>
            <div className='App'>
              <CreateForm view={formView} closeView={closeView}/>
              <BoardList data={shownCards}/>
            </div>
            <footer>
              <button className='newboardbtn' onClick={showCreateForm}>New Board</button>
            </footer>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
