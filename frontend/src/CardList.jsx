import './BoardList'

function CardList ( {data} ) {
    return (
        <div className='list' key={data.id}>
            {data.map(card => (
                <div>
                    <h3>{card.title}</h3>
                    <p>{card.message}</p>
                    <img src={card.image} alt={card.title} />
                    <p>Author: {card.author}</p>
                    <p>Votes: {card.votes}</p>
                </div>
            ))}
        </div>
    )
}

export default CardList;