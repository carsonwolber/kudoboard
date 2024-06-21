import './BoardPage.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardList from './CardList';

function BoardPage() {
    const [board, setBoard] = useState(null);
    const { boardId } = useParams();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("data", data);
                setBoard(data);
            })
            .catch(error => {
                console.error('Error fetching board data:', error);
            });
    }, [boardId]);

    return (
        <div>
            {board ? (
                <>
                    <h2>{board.title}</h2>
                    <CardList data={board.cards} />
                </>
            ) : (
                <p>Loading...</p> //this is just a placeholder while board renders (hopefully shouldn't need to be called)
            )}
        </div>
    );
}

export default BoardPage;