import React, { Component } from 'react';
import './App.css';
import Header from './Header.js'
import axios from "axios";
import EvolveWindow from './EvolveWindow';

class App extends Component {

  constructor() {
    super();
    this.state = {
      randomPokemons: [],
      deckId: "",
      player1Cards: [],
      player2Cards: [],
      player3Cards: [],
      currentPlayer: 1,
      numberOfPlayers: 2,
      player1Total: 0,
      player2Total: 0,
      player3Total: 0,
      round: 1,
      player1Score: 0,
      player2Score: 0,
      player3Score: 0,
      winner: null
    }
  }

  componentDidMount() {

	  //Calling deck of cards API to get a deck key, and then generate random cards.

      axios({
        method:'GET',
        url: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
      dataResponse: 'json', 
      params: {
        deck_count: 1
      }


    }).then( (data) => {
      this.setState({
        deckId:data.data.deck_id
      })  
    });



    // Calling the method to get the random pokemons when the app is starting
    this.getRandomPokemon(2);
    
  }

  // Method to draw a card from the deck

  drawCard = (numberOfCards) => {

    // Getting deck id from the state

    const deckId = this.state.deckId;


    // Making Deck API call to draw a card

    axios({
      url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCards}`,
      method: "get",
      responseType: "json",
      
    }).then((response) => {
      const currentPlayer = this.state.currentPlayer;

      const currentCard = response.data.cards[0];

    
      const suits = ["QUEEN", "KING","JACK"];
      
      // Making a copy that we can modify from the state

      const playerCards = [...this.state[`player${currentPlayer}Cards`]];

      // push the new card into the copy we made

      playerCards.push({
        number: currentCard.value,
        suit: currentCard.suit,
        image: currentCard.image
      });

      // Create an empty array to store the cards values

      let arrayOfValues = [];

      // We loop through each card on the players hand and check if the card is an ACE then we give it a value of 11 and if it is a QUEEN, KING OR JACK we give it a value of 10.

      playerCards.forEach((card) => {
        
        if (suits.includes(card.number)) {
          arrayOfValues.push(10);
        } else if (card.number === "ACE") {
          arrayOfValues.push(11);
        } else {
          arrayOfValues.push(parseInt(card.number))
        }

      })


      // We sum up the values of the array

      let currentPlayerTotal = arrayOfValues.reduce((a, b) => a + b, 0);


      // Use a while loop to check if the users total is higher than 21 and if there is an ace in the hand in order to start changing the value of the aces to 1.

      while (currentPlayerTotal > 21 && arrayOfValues.includes(11) ) {
        arrayOfValues[arrayOfValues.indexOf(11, 0)] = 1;
        currentPlayerTotal = arrayOfValues.reduce((a, b) => a + b, 0);

      }

      // If the player has a total value higher than 21 then change the turn to the next player

      if (currentPlayerTotal > 21) {
        if (currentPlayer === this.state.numberOfPlayers) {
          this.setState({
            [`player${currentPlayer}Cards`]: playerCards,
            [`player${currentPlayer}Total`]: currentPlayerTotal,
            
          }, () => {
              this.stay();
            console.log(this.state[`player${currentPlayer}Cards`]);
            console.log(this.state[`player${currentPlayer}Total`]);
          })
        } else {
          this.setState({
            [`player${currentPlayer}Cards`]: playerCards,
            [`player${currentPlayer}Total`]: currentPlayerTotal,
            currentPlayer: currentPlayer + 1
          }, () => {
            console.log(this.state[`player${currentPlayer}Cards`]);
            console.log(this.state[`player${currentPlayer}Total`]);
          })
        }
        
      } else {
        this.setState({
          [`player${currentPlayer}Cards`]: playerCards,
          [`player${currentPlayer}Total`]: currentPlayerTotal
        }, () => {
          console.log(this.state[`player${currentPlayer}Cards`]);
          console.log(this.state[`player${currentPlayer}Total`]);
        })
      }
      
    })

  }


  stay = () => {
    const numberOfPlayers = this.state.numberOfPlayers;
    const currentPlayer = this.state.currentPlayer;

    

    if (numberOfPlayers === currentPlayer) {
      const player1Total = this.state.player1Total > 21 ? 0 : this.state.player1Total;
      const player2Total = this.state.player2Total > 21 ? 0 : this.state.player2Total;
      const player3Total = this.state.player3Total > 21 ? 0 : this.state.player3Total;

      if (player1Total === player2Total && (player2Total === player3Total && numberOfPlayers === 3)) {
        console.log("its a tie");
        
        this.setState({
          player1Cards: [],
          player2Cards: [],
          player3Cards: [],
          currentPlayer: 1,
          player1Total: 0,
          player2Total: 0,
          player3Total: 0,
        })
        
      } else if (player1Total > player2Total && player1Total > player3Total) {
        this.setState({
          player1Score: this.state.player1Score + 1,
          round: this.state.round + 1
        }, this.checkWinner)
        console.log("Player 1 won!");
      } else if (player2Total > player3Total) {
        this.setState({
          player2Score: this.state.player2Score + 1,
          round: this.state.round + 1
        }, this.checkWinner)
        console.log("Player 2 won!");
      } else if (this.state.numberOfPlayers === 3) {
        this.setState({
          player3Score: this.state.player3Score + 1,
          round: this.state.round + 1
        }, this.checkWinner)
        console.log("Player 3 won!");
      }

    } else {
      this.setState({
        currentPlayer: currentPlayer + 1
      })
    }
    
  }


  checkWinner = () => {
    console.log(this.state.round);
    if (this.state.player1Score === 2 || this.state.player2Score === 2 || this.state.player3Score === 2) {

      const player1TotalScore = this.state.player1Score;
      const player2TotalScore = this.state.player2Score;
      const player3TotalScore = this.state.player3Score;


      if (player1TotalScore > player2TotalScore && player1TotalScore > player3TotalScore) {
        this.setState({
          winner: "Player 1"
        })
        console.log("Player 1 won!");
      } else if (player2TotalScore > player3TotalScore) {
        this.setState({
          winner: "Player 2"
        })
        console.log("Player 2 won!");
      } else {
        this.setState({
          winner: "Player 3"
        })
        console.log("Player 3 won!");
      }

      
    }

    this.setState({
      player1Cards: [],
      player2Cards: [],
      player3Cards: [],
      currentPlayer: 1,
      player1Total: 0,
      player2Total: 0,
      player3Total: 0,
    })
  }

  getRandomPokemon = (numberOfPlayers) => {

    // Foor loop that will repeat depending on the amount of players that will play the game

    for (let i = 0; i < numberOfPlayers; i++){

      // Create an empty object that will store the information about the pokemon that we get randomly

      const pokemons = {};
      
      // Getting a random number between 1 and 500 using the random function

      const randomNumber = Math.ceil(Math.random() * 200);
  
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

            pokemons.firstPokemonId = response[0].data.id;
  
            pokemons.evolutionPokemonImg = response[1].data.sprites.front_default;

            pokemons.evolutionPokemonId = response[1].data.id;

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
        <p>{`Player ${this.state.currentPlayer} turn`}</p>
        {this.state.randomPokemons.length !== 0
          &&
        <EvolveWindow 
          preName={this.state.randomPokemons[0].firstPokemon}
          preImg={this.state.randomPokemons[0].firstPokemonImg}
          postName={this.state.randomPokemons[0].evolution}
          postImg={this.state.randomPokemons[0].evolutionPokemonImg} 
          />
        }
        {/* Rendering the pokemons and the names just to see what we are getting */}
        {this.state.randomPokemons.map((pokemon) => {
          return <div>
            <p>{pokemon.firstPokemon}</p>
            <img src={pokemon.firstPokemonImg} alt="" />
            <p>{pokemon.evolution}</p>
            <img src={pokemon.evolutionPokemonImg} alt="" />
          </div>
        })}
        <p>Player 1 score: {this.state.player1Score}</p>
        <p>Player 2 score: {this.state.player2Score}</p>
        <p>Player 1 cards:</p>
        {this.state.player1Cards.map((card) => {
          return <p>{card.number}</p>
        })}

        <p>Player 2 cards:</p>
        {this.state.player2Cards.map((card) => {
          return <p>{card.number}</p>
        })}

        <button onClick={() => { this.drawCard(1) }}>Draw a card</button>
        <button onClick={this.stay}>STAY</button>
      </div>
    )
  }
}

export default App;
