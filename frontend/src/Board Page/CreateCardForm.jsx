import '../Home Page/CreateForm.css' //this component is very similar to CreateForm so css can be repeated but different input types e.g. message necessiate a different component still 
import { useState } from 'react';
import GifModal from '../GifModal';


function CreateCardForm ({view, closeView, boardId}) {
    if (!view) {
        return null;
    }

    // State to store form data
    const [formData, setFormData] = useState({
        image: '', // Image URL from Giphy
        title: '',
        author: '',
        message: '',
        votes: 0
    });

    const [gifView, setGifView] = useState(false);

    const showGifView = () => {
        setGifView(true);
    };

    const closeGifView = () => {
        setGifView(false);
    };

    // New to this component the default change handler works for message as well
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        if (!formData.image) { // Because GIF is different than the other form elements this is a work around to give it the same required effect
            alert('Please select a GIF before submitting.');
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log(result);
            closeView();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className='form'>
        <div className='form-content'>
            <span className="close" onClick={closeView}>&times;</span>
            <h3>Create New Card</h3>
            <button type="button" onClick={showGifView}>Select a Gif</button>
            <img className="gifpreview" src={formData.image}/>
            <GifModal
                view={gifView}
                closeView={closeGifView}
                onSelectGif={(gifUrl) => setFormData({ ...formData, image: gifUrl })}
            />
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                <label>Author (optional):</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange}/>
                <label>Message:</label>
                <input type="text" name="message" value={formData.message} onChange={handleChange} required/>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    );
}


export default CreateCardForm;










 
