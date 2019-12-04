import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import axios from "axios";

class App extends Component {

  constructor() {
    super();
    this.state = {
      randomPokemons:[]
    }
  }

  componentDidMount() {

	  //Calling deck of cards API to get a deck key, and then generate random cards.

	  axios({
  		method:'GET',
  		url: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
 		dataResponse: 'json', 
		parameter: {
			deck_count: 6
		}


	}).then( (data) => {
		console.log(data.data.deck_id)  
});





    // Calling the method to get the random pokemons when the app is starting
    this.getRandomPokemon(2);
    
  }

  getRandomPokemon = (numberOfPlayers) => {

    // Foor loop that will repeat depending on the amount of players that will play the game

    for (let i = 0; i < numberOfPlayers; i++){

      // Create an empty object that will store the information about the pokemon that we get randomly

      const pokemons = {};
      
      // Getting a random number between 1 and 500 using the random function

      const randomNumber = Math.ceil(Math.random() * 300);
  
      // Making an API call using the random number in order to get a random pokemon

      axios({
        url: `https://pokeapi.co/api/v2/evolution-chain/${randomNumber}/`,
        method: "get",
        responseType: "json",
      }).then((response) => {

        // Storing the part of the response that we need in an array
        const pokemonEvolutionsArray = response.data.chain.evolves_to;
  
        // Check if the pokemon has an evolution, if it doesn't then use recursion to call the function one more time and get a new pokemon.

        if (pokemonEvolutionsArray.length === 0) {
          this.getRandomPokemon(1);
        } else {

          // If the pokemon has an evolution then store the base pokemon name and the evolution name in the empty object we created before

          const pokemonName = response.data.chain.species.name;
          const pokemonNextEvolution = pokemonEvolutionsArray[0].species.name;

          console.log(pokemonName);
          console.log(pokemonNextEvolution);
  
          pokemons.firstPokemon = pokemonName;
          pokemons.evolution = pokemonNextEvolution;
          
          // Make an empty array to store the promises of calling the api to get the base pokemon and the evolution image

          const imagesPromises = [];
          
          // Make the api call for both images and store the promise in the array

          const promiseOne = axios({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
            method: "get",
            responseType: "json"
          })
  
          imagesPromises.push(promiseOne);
  
          const promiseTwo = axios({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonNextEvolution}`,
            method: "get",
            responseType: "json"
          })
  
          imagesPromises.push(promiseTwo);

          // Use promise.all to wait for both responses before storing them on the state

          Promise.all(imagesPromises).then((response) => {

            // When both promises resolve then get the current pokemons in the state and store them in a variable.

            const currentPokemons = [...this.state.randomPokemons];
  
            // Store both images in the object we first created

            pokemons.firstPokemonImg = response[0].data.sprites.front_default;
  
            pokemons.evolutionPokemonImg = response[1].data.sprites.front_default;

            // Push the object with all the info into the array that has the current state stored

            currentPokemons.push(pokemons);
  
            // Set the state to the new array

            this.setState({
              randomPokemons: currentPokemons
            }, () => {
                
                // Console login when all of this is done just to see the result

                console.log(this.state.randomPokemons);
            })
          })
        }
      })
    }
  }

  render() {
    return (
      <div>
		  {/* Importing the Header Component */}
		  <Header />
        {/* Rendering the pokemons and the names just to see what we are getting */}
        {this.state.randomPokemons.map((pokemon) => {
          return <div>
            <p>{pokemon.firstPokemon}</p>
            <img src={pokemon.firstPokemonImg} alt="" />
            <p>{pokemon.evolution}</p>
            <img src={pokemon.evolutionPokemonImg} alt="" />
          </div>
        })}
      </div>
    )
  }
}

export default App;
