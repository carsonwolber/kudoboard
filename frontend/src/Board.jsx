import './Board.css'

function Board( {img, title, category, author } ) {
    return (
       <div className='card'>
        <img src={img}/>
        <h3>{title}</h3>
        <p>{category}</p>
        <p>{author}</p>
       </div>
    )
}

export default Board;