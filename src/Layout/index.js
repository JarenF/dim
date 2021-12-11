import React,{Fragment, useEffect,useState} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import{ Route, Switch} from 'react-router-dom';
import Home from "./Home/Home";

import {listDecks} from '../utils/api/index';
import DecksHome from "../Decks/DecksHome";



function Layout() {

  const [decks,setDecks]=useState([]);

  useEffect(()=>{
    async function loadDecks(){
      const currentDecks = await listDecks();
      setDecks(currentDecks);
    }
    loadDecks();
  },[]);




  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path = "/">
            <Home decks={decks}/>
          </Route>
          <Route path ="/decks">
            <DecksHome decks={decks}/>
          </Route>
          
          
          <Route>
            <NotFound />
          </Route>
        </Switch>
        
      </div>
    </Fragment>
  );
}

export default Layout;
