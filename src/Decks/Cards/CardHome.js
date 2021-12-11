import React from 'react';
import {Route, Switch} from 'react-router-dom';
import EditCard from "./EditCard";
import NewCard from "./NewCard";
//import { listCards } from '../../utils/api';

function Cards(){
    return (
        <div>
            <Switch>
                <Route path="/decks/:deckId/cards/new">
                    <NewCard/>
                </Route>
                <Route path ="/decks/:deckId/cards/:cardId/edit">
                    <EditCard/>
                </Route>
            </Switch>
        </div>
    )
}

export default Cards;