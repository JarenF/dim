import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link} from 'react-router-dom';
import {createCard,readDeck} from "../../utils/api/index";
import NewCardInput from './NewCardInput';

function NewCard(){
    const {deckId} = useParams();

    const initialCard = {
        front:"",
        back:"",
        deckId,
    };

    const [card, setCard] = useState({...initialCard});
    const [deck,setDeck]=useState({});


    //Load the Deck
    useEffect(()=>{
        async function loadDeck(){
            const deckToLoad = await readDeck(deckId);
            setDeck(deckToLoad);
        }
        loadDeck();
    },[deckId]);


    //Make use of createCard
    function newFront(event){
        setCard({...card,front:event.target.value});
    }
    function newBack(event){
        setCard({...card,back:event.target.value});
    }

    function submitHandler(event){
        event.preventDefault();
        async function makeNewCard(){
            await createCard(deckId,card);
            setCard({...initialCard});
        }
        makeNewCard();
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home  </Link>
                    </li>
                     <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                         Add Card
                    </li>
                </ol>
            </nav>
            <h4>{deck.name}: Add Card</h4>
            <NewCardInput
                submitHandler={submitHandler}
                card={card}
                newFront={newFront}
                newBack={newBack}
            />
        </div>
    )

}

export default NewCard