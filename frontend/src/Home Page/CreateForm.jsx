import { useState } from 'react';
import './CreateForm.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import GifModal from '../GifModal';
import { card_categories } from '../utils';

function CreateForm({ view, closeView }) {
    if (!view) {
        return null;
    }

    const animatedComponents = makeAnimated();

    // State to store form data
    const [formData, setFormData] = useState({
        image: '', // Image URL from Giphy
        title: '',
        category: '',
        author: '',
    });

    // State to control visibility of the GifModal
    const [gifView, setGifView] = useState(false);

    const showGifView = () => {
        setGifView(true);
    };

    const closeGifView = () => {
        setGifView(false);
    };

    // Works for the author and title fields since they behave identically
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCategoryChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            category: selectedOption.value // Category is an object because of react-select so we need to specify value
        }));
    };

    const handleSubmit = async (event) => {
        if (!formData.image) { // Because GIF is different than the other form elements this is a work around to give it the same required effect
            alert('Please select a GIF before submitting.');
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`, {
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
                <h3>Create New Kudos Board</h3>
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
                    <label>Category:</label>
                    <Select
                        placeholder="Select Category"
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        options={card_categories}
                        onChange={handleCategoryChange}
                        value={formData.category.value}
                        required
                    />
                    <label>Author (optional):</label>
                    <input type="text" name="author" value={formData.author} onChange={handleChange}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateForm;