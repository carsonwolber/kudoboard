import './CreateForm.css'

function CreateForm( {view , closeView} ) {

    if(!view) {
        return null
    }

    return (
        <div className='form' >
            <div className='form-content'>
            <span class="close" onClick={closeView}>&times;</span>
                <p>hi</p>
            </div>
        </div>
    
    )
}

export default CreateForm;




