import React, {useState,useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {readDeck, updateDeck} from "../utils/api/index"
import NewDeckInput from "./NewDeckInput";

function EditDeck(){
    const {deckId} = useParams();
    const history = useHistory();
    const [deck,setDeck] = useState({
        id:0,
        name:"",
        description:"",
    });

    //Use Built in function "readDeck" from utils to load deck
    useEffect(()=>{
        async function loadDeck(){
            const deckToLoad = await readDeck(deckId);
            setDeck(deckToLoad);
        }
        loadDeck();
    },[deckId]);

    //Submit Handler
    function submitHandler(event){
        event.preventDefault();
        updateDeck(deck).then((output)=>history.push(`/decks/${output.id}`));
    }

    //Name Changer
    function nameChanger(event){
        setDeck({
            ...deck,
            name: event.target.value
        });
    }

    //Description Changer
    function descriptionChanger(event){
        setDeck({
            ...deck,
            description: event.target.value
        })
    }

    //Display for Edit Deck Page
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className = "breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <h4>Edit Deck</h4>
            <NewDeckInput
            submitFunction={submitHandler}
            deck={deck}
            nameChanger={nameChanger}
            descriptionChanger={descriptionChanger}
            />
        </div>
    )

};

export default EditDeck;