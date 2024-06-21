import { useState, useEffect } from 'react';
import './CreateForm.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import GifModal from './GifModal';

function CreateForm( {view , closeView} ) {

    if(!view) {
        return null
    }

    const animatedComponents = makeAnimated();


    const [formData, setFormData] = useState({
        image: '', //image meaning gif url
        title: '',
        category: '', 
        author: '',
        search: ''
    })
    const [searchResults, setSearchResults]  = useState([]) //this state stores the actual gifs that match a user search so they can be displayed
    const [gifView, setGifView] = useState(false);

    const showGifView = () => {
        setGifView(true)
      }
    
      const closeGifView = () => {
        setGifView(false)
      }

    useEffect(() => {
        fetchGifData();
    },[formData]);


    const fetchGifData = async () => { //fetches from search endpoint specificially can users can search for the gif they want
        try {
            let url = `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_API_KEY}&q=${formData.search}`
            const response = await fetch(url);
            const gifData = await response.json();
            setSearchResults(gifData.data);
        } catch(error) {
            console.error('Fetch Gif Error', error);
        }
    };

    //when any form input updates, name/value should update to reflect this
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    //because react-select does not process event objects in the same way as vanilla tags it needs it's own handler
    const handleCategoryChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            category: selectedOption.value // category is an object because of react-select so we need to specify value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent refreash
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('author', formData.author);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('coverart', formData.image);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards`, { 
                method: 'POST',
                body: formDataToSend,
              });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
        closeView()
    };

    const handleSearchChange = (newSearch) => {
        setFormData({...formData, search: newSearch.target.value});
    }

    const categories = [
        {value: 'recent', label: 'Recent'},
        {value: 'celebration', label: 'Celebration'},
        {value: 'thanks', label:'Thank You'},
        {value: 'inspiration', label:'Inspiration'}
    ]

    return (
        <div className='form' >
            <div className='form-content'>
            <span className="close" onClick={closeView}>&times;</span>
            <h3>Create New Kudos Board</h3>
            <input type="text" value={formData.search} onChange={handleSearchChange} placeholder='Search for GIFs'/>
            <form onSubmit={handleSubmit}>
                <button onClick={showGifView}>Select a Gif</button>
                <GifModal 
                view = {gifView}
                closeView = {closeGifView}
                />
                <label>Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                <label>Category:</label>
                <Select
                    placeholder="Select Category"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={categories}
                    onChange={handleCategoryChange}
                    value={formData.category}
                    required
                />
                <label>Author:</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} required/>
                <button type="submit">submit</button>
            </form>
            </div>
        </div>
    
    )
}

export default CreateForm;




