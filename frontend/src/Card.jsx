import './Card.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
function Card( {id, title, message, image, author, votes}) {

    const { boardId } = useParams();
    const [cardData, setCardData] = useState({
        title: title,
        message: message,
        image: image,
        author: author,
        votes: votes
    });


    // when upvote is clicked the cardData vote field updates and this is relayed back to the db through a helper
    const increment = () => {
        setCardData({...cardData, votes: cardData.votes + 1});  // this line is enough to update the votes field ui but the value is lost on refresh
    };


    // when clicked this button fetches from delete route endpoint and calls the fetchBoard helper to reload page
    const deleteCard = async () => {
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}/cards/${id}`, {
            method: 'DELETE',
            })
        window.location.reload(); // force page to reload so card disappears
    };


    useEffect(() => {
        // updateVotes syncs [increments] changes to the database anytime card data (i.e. votes) chamges
        const updateVotes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}/cards/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ votes: cardData.votes })
                });
                const result = await response.json();
            } catch (error) {
                console.error('Error updating votes:', error);
            }
        };
            updateVotes();
    }, [cardData]);
 
    
    // votes is the only field that changes using the cardData state so output comes from there – for the rest it doesn't matter so just use the prop directly
    return (
        <div className='card'>
            <img src={image} alt={title}/>
            <h3>{title}</h3>
            <p>{author}</p>
            <p>{message}</p>
            <button onClick={increment} className='votebtn'>{cardData.votes}  ⬆️ </button> 
            <button onClick={deleteCard} className='deletebtn'>Delete🗑️</button>
        </div>
    ); 
}


export default Card;