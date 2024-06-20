import './App.css'
import Search from './Search'
import Sort from './Sort'
import BoardList from './BoardList'

function App() {


  return (
    <>
    <header>
      <h3>Kudos Board</h3>
    </header>
    <div className='App'>
      <Search/>
      <Sort/>
      <BoardList/>
    </div>
    <footer>
      <button>New Board</button>
    </footer>
    </>
  )
}

export default App;
