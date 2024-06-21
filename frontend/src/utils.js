// Categories for react-select filter componed
export const filter_categories = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'celebration', label: 'Celebration' },
    { value: 'thanks', label: 'Thank You' },
    { value: 'inspiration', label: 'Inspiration' }
];


// Categories that can be applied to  describe cards
export const card_categories = [
    { value: 'celebration', label: 'Celebration' },
    { value: 'thanks', label: 'Thank You' },
    { value: 'inspiration', label: 'Inspiration' }
];


/*
Fetches the board data. this is done exogenously 
so we can reuse the file inside the card component for delete as well

this is somewhat obsolete since deletion is now handled through a simpler page reload
*/
export function fetchBoard(boardId) {
    return fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        });
}