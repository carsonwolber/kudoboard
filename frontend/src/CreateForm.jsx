import { useState } from 'react';
import './CreateForm.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

function CreateForm( {view , closeView} ) {

    if(!view) {
        return null
    }

    const animatedComponents = makeAnimated();

    //a card can have a picture/gif and need a title, author, and category
    const [formData, setFormData] = useState({
        image: '/assets/cardplaceholder.jpg',
        title: '',
        category: null,
        author: ''
    })

    //when any form input updates, name/value should update to reflect this
    const handleChange = (e) => {
        const { name, type } = e.target;
        if (type === 'file') {  // if the object changed was the image, we need to access the target file array
            const file = e.target.files[0];
            setFormData(prevState => ({
                ...prevState,
                [name]: file
            }));
        } else {
            const { value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    //because react-select does not process event objects in the same way as vanilla tags it needs it's own handler
    const handleCategoryChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            category: selectedOption // Set the whole option object as the value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent refreash
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('author', formData.author);
        formDataToSend.append('category', formData.category.value); // category is an object because of react-select so we need to specify value
        formDataToSend.append('coverart', formData.image);
        try {
            const response = await fetch('https://needtosetrealendpoint', { 
                method: 'POST',
                body: formDataToSend,
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
            <form onSubmit={handleSubmit}>
                <label>Cover Art:</label>
                    <input type='file' name="coverart" accept='image/jpg, image/jpeg, image/gif, image/png' onChange={handleChange}/>
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




