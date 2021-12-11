import React from 'react';
import {useHistory} from 'react-router-dom';

function NewDeckInput({submit, deck={},nameChanger,descriptionChanger}){
    
    const history = useHistory();

    function deckName(){
        return deck.name ? deck.name : "";
    }

    function deckDesc(){
        return deck.description ? deck.description : "";
    }

    return (
        <form>
            <div className="form-group">
                <label htmlFor="DeckNameInput">Deck Name</label>
                <input
                type="text"
                className="form-control"
                id="DeckNameInput"
                value={deckName()}
                onChange={nameChanger}>

                </input>
            </div> 
            <div className="form-group">
                <label htmlFor="DeckDescriptionInput">Deck Description</label>
                <textarea
                    className="form-control"
                    id="DeckDescriptionInput"
                    rows="4"
                    value={deckDesc()}
                    onChange={descriptionChanger}>
                    </textarea>

            </div>
            <button 
                className="btn btn-secondary"
                type="button"
                onClick={()=>history.go(-1)}
            >
                Cancel
            </button>
            <button
                className="btn btn-primary"
                type="submit"
                onClick={submit}
            >
                Submit
            </button>
                
        </form>
    )

};

export default NewDeckInput;