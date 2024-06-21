import './Filter.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { categories } from './utils';

function Filter( {setFilters}) {
    const animatedComponents = makeAnimated();
    const handleChange = (selectedOptions) => {
        const selectedFilters = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFilters(selectedFilters);
    };

    return (
        <div className='filterbar' key={'filter'}>
            <Select
                placeholder="Filter by …"
                isMulti
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={categories}
                onChange={handleChange}
                isClearable={true}
                className='filter'
            />
        </div>
    );
}
export default Filter;