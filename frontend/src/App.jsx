import './App.css'
import Search from './Search'
import Sort from './Sort'
import BoardList from './BoardList'
import CreateForm from './CreateForm'

import { useState } from 'react';

function App() {
  const [formView, setFormView] = useState(false);

  const showCreateForm = () => {
    setFormView(true)
  }

  const closeView = () => {
    setFormView(false)
  }

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
      <BoardList/>
    </div>
    <footer>
      <button onClick={showCreateForm}>New Board</button>
    </footer>
    </>
  )
}

export default App;
