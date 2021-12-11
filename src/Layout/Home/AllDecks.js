import React from 'react';
import { useHistory,Link } from 'react-router-dom';
import {deleteDeck} from '../../utils/api/index'


function AllDecks({decks}){
    const history =useHistory();
    
    //Need a delete handler still
    function deleteDeckHandler(deckId){
        if(
            window.confirm("Are you sure you want to permanently delete this deck?")
        ){
            deleteDeck(deckId).then(history.go(0));
        }
    } 
    //TODO: Map out the deck card
    const deckMap = decks.map((deck,index)=>(
        <div className="card w-100" key={index}>
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <h6>{deck.cards.length} cards</h6>
                <p>{deck.description}</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                        View Deck
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                        Study Deck
                    </Link>
                    <button 
                    onClick={()=>deleteDeckHandler(deck.id)} 
                    className="btn btn-danger" >
                        Delete Deck
                    </button>
                    </div> 

            </div>

        </div>
    ));

    return <div className="d-flex flex-column">{deckMap}</div>

};


export default AllDecks;