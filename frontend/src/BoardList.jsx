import './BoardList.css'
import Board from './Board'

function BoardList( {data}) {
    return (
        <div className='list' key={data.id}>
            {data.map(card => (
                    <Board 
                        img={card.image}
                        title={card.title}
                        category={card.category}
                        author={card.author}
                    />
                ))}
        </div>
    );
}

export default BoardList;