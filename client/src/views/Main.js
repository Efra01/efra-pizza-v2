import React from "react";
import { navigate } from "@reach/router";
import QuickAction from '../components/QuickAction'

const Main = (props) => { 
    const { setRandom, setFavorite } = props;
    return (
        <div>
            <h2>Quick Options</h2>
            <QuickAction text="New Order" path="/order"/>
            <QuickAction text="Re-order Favorite" path="/order" setFavorite={setFavorite}/>
            <QuickAction text="Random Pizza" path="/order" setRandom={setRandom}/>
                {}
        </div>
    );
};

export default Main;