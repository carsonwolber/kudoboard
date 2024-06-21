import './BoardList'

function CardList ( {data} ) {
    return (
        <div className='list' key={data.id}>
            {data.map(card => (
                <div>
                    <h3>{card.title}</h3>
                    <p>{card.message}</p>
                    <img src={card.image} alt={card.title} />
                    <p>{card.author}</p>
                    <p>{card.votes}</p>
                </div>
            ))}
        </div>
    )
}

export default CardList;