import React,{useEffect,useState} from 'react';
import {useHistory, useParams} from 'react-router';
import {Link} from 'react-router-dom';
import {readDeck,updateCard,readCard} from "../../utils/api/index";
import NewCardInput from './NewCardInput';


function EditCard(){

    const {deckId, cardId} = useParams();
    const history = useHistory();
    const [card,setCard] = useState({
        id: cardId,
        front: "",
        back: "",
        deckId: Number(deckId),
    })

    const [name,setName] = useState("");

    //readCard and readDeck from utils
    useEffect(()=>{
        async function loadCard(){
            const cardToLoad = await readCard(cardId);
            setCard({
                id: cardId,
                deckId: Number(deckId),
                front:cardToLoad.front,
                back: cardToLoad.back,
            });
        }
        async function loadDeckName(){
            const deck = await readDeck(deckId);
            setName(deck.name);
        }
        loadCard();
        loadDeckName();
    },[cardId,deckId])

    function changeFront(event){
        setCard({...card, front: event.target.value})
    }
    function changeBack(event){
        setCard({...card,back: event.target.value})
    }

    function submitHandler(event){
        event.preventDefault();
        updateCard(card).then((output)=>history.push(`/decks/${output.deckId}`))
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card
                    </li>
                </ol>
            </nav>
            <h4>Edit Deck</h4>
            <NewCardInput
                submitHandler={submitHandler}
                card={card}
                changeFront={changeFront}
                changeBack={changeBack}
            />
        </div>
    )

}

export default EditCard;