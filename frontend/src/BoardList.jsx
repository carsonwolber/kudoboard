import './BoardList.css'
import Board from './Board'

function BoardList( {data}) {
    return (
        <>
            {data.map(card => (
                <div className='list' key={card.id}>
                    <Board 
                        img={card.image}
                        title={card.title}
                        category={card.category}
                        author={card.author}
                    />
                </div>
            ))}
        </>
    );
}

export default BoardList;