import React from 'react';
import {useHistory} from 'react-router';

function NewCardInput({
    submitHandler,
    card={},
    newFront,
    newBack,
}){

    const history = useHistory();



    //default to an empty string if no card front or back
    function cardFront(){
        return card.front ? card.front : "";
    }
    function cardBack(){
        return card.back ? card.back:"";
    }


    return (
        <form>
            <div className="form-group">
                <label htmlFor="cardFrontInput">Front</label>
                <textarea
                    className="form-control"
                    id="front"
                    rows="3"
                    value={cardFront()}
                    onChange={newFront}
                    ></textarea> 
            </div>
            <div className="form-group">
                <label htmlFor="cardBackInput">Back</label>
                <textarea
                    className="form-control"
                    id="back"
                    rows="3"
                    value={cardBack()}
                    onChange={newBack}
                    ></textarea>

            </div>
            <button
                className="btn btn-secondary ml-2"
                type="button"
                onClick={()=>history.go(-1)}
            >
                    Cancel
            </button>
            <button
                className="btn btn-primary ml-2"
                type="submit"
                onClick={submitHandler}
            >
                Save
            </button>
            
        </form>
    )

}

export default NewCardInput;