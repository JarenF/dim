import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import NotEnoughCards from './Cards/NotEnoughCards';


function StudyDeck({decks}){

    const history = useHistory();
    const {deckId} = useParams();
    const [deck,setDeck] = useState({});

    const [study, setStudy] = useState({
        cards: [],
        currentCard: 0,
        front: true,
        flipped: false,
    });

    //Get each card data
    useEffect(()=>{
        async function loadDecks(){
            const loadedDeck = await readDeck(deckId);
            setDeck(loadedDeck);
            setStudy({
                currentCard: 0,
                front: true,
                flipped: false,
                cards: loadedDeck.cards,
                cardTotal: loadedDeck.cards.length,

            });
        }
        loadDecks();

    },[deckId])

    //Loading Screen
    if(!deck){
        return <p>Loading...</p>
    }

    if(
        //Deck Must have at least 3 cards
        study.cards.length < 3
    ){
        return <NotEnoughCards deck={deck}/>
    }

    //Flip Cards
    function controlFlip(){
        setStudy({
            ...study,
            front: !study.front,
            flipped: true
        });
    }

    //Show the correct side
    function sideToShow(){
        return study.front 
        ? study.cards[study.currentCard].front
        : study.cards[study.currentCard].back;
    }

    //Display the number of cards left
    function cardsLeft(){
        return `${study.currentCard + 1} of ${study.cardTotal}`
    }

    //Last Card
    function lastCard(){
        return study.currentCard >= study.cardTotal -1;
    }


    //Go to the next card
    function nextCard(){
        if(lastCard()){
            if(window.confirm("Start Over")){
                setStudy({
                    ...study,
                    currentCard: 0,
                    flipped: false,
                    front: true,
                });
            }else{
                history.push('/')
            }
        }else{
            setStudy({
                ...study,
                currentCard: study.currentCard +1,
                flipped: false,
                front: true,
            });
        }
    }




    //Next button
    function nextButton(){
        return study.flipped ? (
            <button className="btn btn-warning" onClick={nextCard}>
                Next
            </button>
        ) : null;
    }
    

    ///Display for the Card page
    return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className = "breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Study
                    </li>
                </ol>
            </nav>
            <h4>Study: {deck.name}</h4>
            <div className="card w-100">
                <div className=" card=body">
                    <h6>Card {cardsLeft()}</h6>
                    <p className="card=text">{sideToShow()}</p>
                    <button className="btn btn-primary" onClick={controlFlip}>
                        Flip Card
                    </button>
                    {nextButton()}
                </div>
            </div>
        </div>
    )



};

export default StudyDeck;