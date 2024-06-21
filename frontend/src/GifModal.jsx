import { useState, useEffect } from 'react';
import './GifModal.css';

function GifModal({ view, closeView, searchQuery, onSelectGif }) {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (view && searchQuery) {
            fetchGifData();
        }
    }, [view, searchQuery]); // Fetch GIFs when modal is opened and search query changes

    const fetchGifData = async () => {
        try {
            let url = `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_API_KEY}&q=${searchQuery}`;
            const response = await fetch(url);
            const gifData = await response.json();
            setSearchResults(gifData.data);
        } catch (error) {
            console.error('Fetch Gif Error', error);
        }
    };

    const handleSelect = (gifUrl) => {
        onSelectGif(gifUrl);
        closeView();
    };

    if (!view) {
        return null;
    }

    return (
        <div className="gif-modal">
            {searchResults.map(gif => (
                <img
                    key={gif.id}
                    src={gif.images.fixed_height.url}
                    alt={gif.title}
                    onClick={() => handleSelect(gif.images.fixed_height.url)}
                    style={{ cursor: 'pointer', margin: '5px' }}
                />
            ))}
        </div>
    );
}

export default GifModal;