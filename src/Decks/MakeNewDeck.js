import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';

import { createDeck } from '../utils/api';
import NewDeckInput from './NewDeckInput';

function MakeNewDeck(){
    const history = useHistory();
    const [deck,setDeck] = useState({
        id:0,
        name:"",
        description:""
    });

    //Submission Handling
    function submitButtonHandler(event){
        event.preventDefault();
        createDeck(deck).then((output)=>history.push(`/decks/${output.id}`));
    }

    function nameChanger(event){
        setDeck({...deck,name:event.target.value});
    }

    function descriptionChanger(event){
        setDeck({...deck,description:event.target.value});
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
            <h4>Create Deck</h4>
            <NewDeckInput
                submit={submitButtonHandler}
                deck={deck}
                nameChanger={nameChanger}
                descriptionChanger={descriptionChanger}
            />
        </div>
    )

}

export default MakeNewDeck;