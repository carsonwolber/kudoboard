import './Board.css'
import { useNavigate } from 'react-router-dom';

function Board({ id, img, title, category, author }) {
    const navigate = useNavigate();

    //on click navigate to the board specific page
    const handleBoardClick = () => {
        navigate(`/boards/${id}`);
    };
    return (
        <div className='board' onClick={handleBoardClick}>
            <img src={img} alt={title}/>
            <h3>{title}</h3>
            <p>{category}</p>
            <p>{author}</p>
        </div>
    );
}
export default Board;