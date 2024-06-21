import './Board.css' //similar to the cardlist here adding more css than what already exists for boards would be redundant
import { useState } from 'react';

function Card( {id, title, message, image, author, votes}) {
    const [cardData, setCardData] = useState({
        title: title,
        message: message,
        image: image,
        author: author,
        votes: votes
    });

    //when upvote is clicked the cardData vote field updates and a helper is called to relay this back to the db
    const increment = async () => {
        setCardData({...cardData, votes: cardData.votes + 1});

    }
    //votes is the only field that changes using the cardData state so output comes from there – for the rest it doesn't matter so just use the prop directly
    return (
        <div className='board'>
            <img src={image} alt={title}/>
            <h3>{title}</h3>
            <p>{author}</p>
            <p>{message}</p>
            <button onClick={increment}>{cardData.votes} : ⬆️ Upvote</button> 
        </div>
    ); 
}


export default Card;