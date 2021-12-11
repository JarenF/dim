import React from 'react';
import { Switch,Route } from 'react-router-dom';
import SingleDeckView from './SingleDeckView';
import MakeNewDeck from './MakeNewDeck';
import StudyDeck from './StudyDeck';
import Cards from './Cards/CardHome';
import EditDeck from './EditDeck';





function DecksHome({decks}){
    return (
    
        <div>
            <Switch>
                <Route path="/decks/new">
                    <MakeNewDeck/>
                </Route>
                
                <Route path="/decks/:deckId/study">
                    <StudyDeck decks={decks}/>
                </Route>
                
                <Route path="/decks/:deckId/edit">
                    <EditDeck/>
                </Route>
                
                <Route path="/decks/:deckId/cards">
                    <Cards/>
                </Route>


                <Route path="/decks/:deckId">
                    <SingleDeckView/>
                </Route>

            </Switch>
        </div>
        
    )
};

export default DecksHome;