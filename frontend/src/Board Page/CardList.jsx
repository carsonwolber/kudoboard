import '../Home Page/BoardList.css' //css will be identical to the main boards so just reuse
import Card from './Card'

function CardList ( {data} ) {
    return (
        <div className='list' key={data.id}>
            {data.map(card => (
                <Card
                    id={card.id}
                    title = {card.title}
                    message = {card.message}
                    image = {card.image}
                    author = {card.author}
                    votes = {card.votes}
                />
            ))}
        </div>
    )
}

export default CardList;