import { useState, useEffect } from 'react';
import './GifModal.css';

function GifModal({ view, closeView, onSelectGif }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
            fetchGifData();
    }, [searchQuery]); // Fetch GIFs when modal is opened and search query changes

    const fetchGifData = async () => {
        if(searchQuery === '') {
            return;
        } //return if nothings been searched to avoid excessive api calls
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
            <div className='modal-content'>
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search for GIFs'
                        className="search-input"
                    />
                </div>
                <div className="gif-grid">
                    {searchResults.map(gif => (
                        <img
                            key={gif.id}
                            src={gif.images.fixed_height_small}
                            alt={gif.title}
                            onClick={() => handleSelect(gif.images.original.url)}
                            className="gif-item"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GifModal;