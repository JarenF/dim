import React from 'react';
import { useHistory } from 'react-router-dom';

function CreateDeckButton(){
    const history = useHistory();

    return (
        <button type='button' className='btn btn-primary'
        onClick={()=>history.push('/decks/new')}
        
        >
            + Create New Deck
        </button>
    )
}

export default CreateDeckButton;