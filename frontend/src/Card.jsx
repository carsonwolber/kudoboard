import './Board.css' //similar to the cardlist here adding more css than what already exists for boards would be redundant

function Card( {title, message, image, author, votes}) {
    return (
        <div className='board'>
            <img src={image} alt={title}/>
            <h3>{title}</h3>
            <p>{author}</p>
            <p>{message}</p>
            <button>{votes}</button>
        </div>
    );
}


export default Card;