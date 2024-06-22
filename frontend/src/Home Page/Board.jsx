import './Board.css'
import { useNavigate } from 'react-router-dom';

function Board({ id, img, title, category, author }) {
    const navigate = useNavigate();

    // On click navigate to the board specific page
    const handleBoardClick = () => {
        navigate(`/boards/${id}`);
    };

    const deleteBoard = async (e) => {
        e.stopPropagation(); // Used to prevent board page from loading
        fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}}`, {
            method: 'DELETE',
            })
        window.location.reload(); // Force page to reload so card disappears
    };

    return (
        <div className='board' onClick={handleBoardClick}>
            <img src={img} alt={title}/>
            <h3>{title}</h3>
            <p>{category}</p>
            <p>{author}</p>
            <button onClick={deleteBoard} className='deletebtn'>Delete🗑️</button>
        </div>
    );
}
export default Board;