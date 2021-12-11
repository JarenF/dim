import React, { useEffect, useState } from 'react';
import { Link, useHistory,useParams } from 'react-router-dom';
import { deleteCard, deleteDeck, readDeck } from '../utils/api';

function SingleDeckView(){
    
    const history = useHistory();

    const {deckId} = useParams();
    const [deck,setDeck] = useState({
        id:0,
        name:"",
        cards:[],
    });


    //Use Built in function "readDeck" from utils to load deck
    useEffect(()=>{
        async function loadDeck(){
            const deckToLoad = await readDeck(deckId);
            setDeck(deckToLoad);
        }
        loadDeck();
    },[deckId])


    //Loading Screen
    if(!deck){
        return <p>Loading...</p>
    }

    //Delete Card
    function deleteCardHandler(cardId){
        if(window.confirm("Are you sure you want to permanently delete this card")){
            deleteCard(cardId)
            .then((output)=>history.go(0));
        }
    }

    //Delete Deck
    function deleteDeckHandler(deckId){
        if(window.confirm("Are you sure you want to permanently Delete this Deck?")){
            deleteDeck(deckId);
            history.push("/");
        }
    }

    //Map the cards into their own variable
    const CardsInDeck = deck.cards.map((card)=>(
        <div className="card w-100" key={card.id}>
            <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">{card.front}</p>
                <hr/>
                <p className="card-text">{card.back}</p>
                <div className="d-flex flex-row-reverse">
                    <button
                    className="btn btn-danger ml-2"
                    onClick={()=>deleteCardHandler(card.id)}>
                        Delete Card
                    </button>
                    <Link
                    className = "btn btn-secondary ml-2"
                    to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                        Edit Card
                    </Link>
                </div>
            </div>
        </div>
    ));
    
    
    
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>
            <h4>{deck.name}</h4>
            <p>{deck.description}</p>
            <div className="row mb-5">
                <div className="d-flex flex-row col-8">
                    <Link className="btn btn-secondary m-2" to={`/decks/${deck.id}/edit`}>
                        Edit Deck
                    </Link>
                    <Link className="btn btn-primary m-2" to={`/decks/${deck.id}/study`}>
                        Study Deck
                    </Link>
                    <Link className="btn btn-primary m-2" to={`/decks/${deck.id}/cards/new`}>
                        Add Card
                    </Link>
                </div>
                <div className="d-flex flex-row-reverse col-4">
                    <button className ="btn btn-danger m-2"
                    onClick = {()=>deleteDeckHandler(deck.id)}>
                        Delete Deck
                    </button>
                </div>
            </div>
            
            <div className="card-list">
                {CardsInDeck}
            </div>



        </div>
    )
}

export default SingleDeckView;