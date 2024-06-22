import './BoardPage.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CardList from './CardList';
import CreateCardForm from './CreateCardForm'

function BoardPage() {
    const [board, setBoard] = useState(null);
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [cardFormView, setCardFormView] = useState(false);

    const handleBackClick = () => {
        navigate(`/`);
    };

    const showCreateCardForm = () => {
        setCardFormView(true)
      }
    
    const closeCardView = () => {
    setCardFormView(false)
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBoard(data);
            })
            .catch(error => {
                console.error('Error fetching board data:', error);
            });
    }, []);

    return (
        <div>
            {board ? (
                <>
                    <header>
                        <h1>{board.title}</h1>
                    </header>
                    <button onClick={handleBackClick} className='backbtn'>⬅️</button>
                    <CreateCardForm view={cardFormView} closeView={closeCardView} boardId={boardId}/>
                    <CardList data={board.cards} />
                </>
            ) : (
                <p>Loading...</p> // This is just a placeholder while [board] renders (hopefully shouldn't ever see this)
            )}
            <footer>
              <button className="newcardbtn" onClick={showCreateCardForm}>New Card</button>
            </footer>
        </div>
    );
}

export default BoardPage;