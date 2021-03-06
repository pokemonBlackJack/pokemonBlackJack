import React, { Component } from 'react';
import Header from './Header.js'
import PokemonPlayer from './PokemonPlayer.js'
import axios from "axios";
import Loading from "./Loading.js"
import WelcomeScreen from "./WelcomeScreen.js"
import alert, { nextPlayerAlert, evolutionAlert, levelUpSound, soundToUse, casinoBgm } from "./alert";
import pokeball from "./assets/pokeball.png";

import hitSound from './sounds/hit.ogg';
import tackleSound from './sounds/tackle.ogg';
import openPokeballSound from './sounds/openPokeball.ogg';

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
      winner: null,
      hideCards: false,
      showAll: false,
      loading: false,
      instruction: true,
      disabled: false,
      cleanBoard: false,
      showButtons: true,
    }
  }


  componentDidMount() {
    const buttons = document.querySelectorAll(".playerOptions button");
    buttons.forEach((button) => {
      button.disabled = true;
    })

    this.getNewDeck();
    
    casinoBgm.addEventListener("ended", () => {
      casinoBgm.currentTime = 0;
      casinoBgm.play();
    })

  }


  getNewDeck = () => {
    axios({
      method: 'GET',
      url: 'https://deckofcardsapi.com/api/deck/new/shuffle/',
      dataResponse: 'json',
      params: {
        deck_count: 1
      }
    }).then((data) => {
      this.setState({
        deckId: data.data.deck_id
      })
    });

    casinoBgm.addEventListener("ended", () => {
      casinoBgm.currentTime = 0;
      casinoBgm.play();
    })
  }


  drawCard = (numberOfCards, type) => {

    const buttons = document.querySelectorAll(".playerOptions button");
    buttons.forEach((button) => {
      button.disabled = true;
    })

    // Getting deck id from the state
    const deckId = this.state.deckId;

    // Making Deck API call to draw a card
    const currentPlayer = this.state.currentPlayer;
    const numberOfPlayers = this.state.numberOfPlayers;
    
    axios({
      url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCards}`,
      method: "get",
      responseType: "json",
    }).then((result) => {
      const cards = result.data.cards;
      const playerCards = [...this.state[`player${this.state.currentPlayer}Cards`]];

      cards.forEach((card) => {
        playerCards.push({
          number: card.value,
          suit: card.suit,
          image: card.image
        });
      });

      const arrayOfValues = [];
      const suits = ["QUEEN", "KING", "JACK"];

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
      while (currentPlayerTotal > 21 && arrayOfValues.includes(11)) {
        arrayOfValues[arrayOfValues.indexOf(11, 0)] = 1;
        currentPlayerTotal = arrayOfValues.reduce((a, b) => a + b, 0);
      }

      // If its the first draw then draw 2 cards for each player
      if (type === "firstCards") {
        this.setState({
          [`player${this.state.currentPlayer}Cards`]: playerCards,
          [`player${currentPlayer}Total`]: currentPlayerTotal,
          currentPlayer: this.state.currentPlayer + 1
        }, () => {
          setTimeout(() => {
            buttons.forEach((button) => {
              button.disabled = false;
            })
          }, 1500);
          
          if (this.state.currentPlayer <= this.state.numberOfPlayers) {
            this.drawCard(2, "firstCards");
          } else {
            this.setState({
              currentPlayer: 1
            })
          }
        })
      } else {
        // If the player has a total value higher than 21 then disable the draw a card button
        if (currentPlayerTotal > 21) {
          if (numberOfPlayers === 2 || currentPlayer === 1) {
            this.setState({
              [`player${currentPlayer}Cards`]: playerCards,
              [`player${currentPlayer}Total`]: currentPlayerTotal,
            }, () => {
              buttons.forEach((button) => {
                button.disabled = false;
              })
              this.setState({
                disabled: true,
              });
            })
          } else {
            // If its the cpu turn then stay
            this.stay();
          }
        } else {

          
          if (currentPlayer === 1 || numberOfPlayers !== 3) {
            setTimeout(() => {
              buttons.forEach((button) => {
                button.disabled = false;
              })
            }, 1500);
          }
          this.setState({
            [`player${currentPlayer}Cards`]: playerCards,
            [`player${currentPlayer}Total`]: currentPlayerTotal
          }, () => {
              
              // If playing against the cpu then logic to make the cpu make a choice when playing 

              if (this.state[`player${this.state.currentPlayer}Total`] <= this.state.player1Total
                  && 
                  this.state.player1Total <= 21
                  && 
                  currentPlayer !== 1
                  && 
                  numberOfPlayers === 3) {
                setTimeout(() => {  
                  this.drawCard(1);
                }, 2000);
              } else if (currentPlayer !== 1 && numberOfPlayers === 3) {
                setTimeout(() => {
                  this.stay();
                }, 2000);
            }
          })
        }
      }
    })
  } 


  // Attack animation using vanilla javaScript
  tackle = new Audio(tackleSound);
  hit = new Audio(hitSound);

  attack = (attackingPlayer) => {
    const pokemons = document.querySelectorAll(".pokemon");
    const attackingPokemon = pokemons[attackingPlayer - 1];
    
    attackingPokemon.classList.add("attacking");
    this.tackle.play();
    
    setTimeout(() => {
      attackingPokemon.classList.remove("attacking");
      pokemons.forEach((pokemon,index) => {
        if ((attackingPlayer - 1) !== index) {
          pokemon.classList.add("damaged");
          this.hit.play();
          setTimeout(() => {
            pokemon.classList.remove("damaged");
          }, 1000);
        }
      })
    }, 1000);
  }
  

  // Animation of pokemons using vanilla javaScript
  appear = new Audio(openPokeballSound);
  
  pokemonAppear = () => {
    // Select the pokemon images
    const pokemonImages = document.querySelectorAll(".playerPokemonDiv");
    // For each pokemon image create a pokeball image and start animation
    pokemonImages.forEach((pokemon, i) => {
      const times = i + 1;
      const pokeballImg = document.createElement("img");
      pokeballImg.src = pokeball;
      // Adding the class to th pokeball image that triggers the animation of the pokeball being throw
      pokeballImg.classList.add("pokeball")
      // show a text indicating the pokemon that is being called
      setTimeout(() => {
        const textParagraph = document.createElement("p");
        textParagraph.innerText = `Player ${times} is sending ${this.state.randomPokemons[i].firstPokemon} out!`;
        textParagraph.classList.add("pokemonText");
        document.querySelectorAll(".playerPokemonContainer")[i].appendChild(textParagraph);
        setTimeout(() => {
          // Adding the pokeball to the container so the animations starts
          document.querySelectorAll(".playerPokemonContainer")[i].appendChild(pokeballImg);
          setTimeout(() => {
            // Creating a white div that creates the illusion of the light of the pokeball opening
            const whiteDiv = document.createElement("div");
            whiteDiv.classList.add("whiteDiv");
            document.querySelector("body").appendChild(whiteDiv)
            this.appear.play();
            setTimeout(() => {
              // Removing the elements when the white light is hidding everything and making the pokemon "appear"
              pokeballImg.remove();
              textParagraph.remove();
              pokemon.style.display = "flex";
            }, 300 * times);
            setTimeout(() => {
              let sound = soundToUse(`./${this.state.randomPokemons[i].firstPokemonId}.ogg`);
              let appearSound = new Audio(sound);
              appearSound.play();
              whiteDiv.remove();
            }, 1000 * times);
          }, 1000 * times);
        }, 500 * times);
      }, 3000 * i);
    });
  }


  stay = () => {
    const numberOfPlayers = this.state.numberOfPlayers;
    const currentPlayer = this.state.currentPlayer;

    if (numberOfPlayers === 3 && currentPlayer === 1) {
      const buttons = document.querySelectorAll(".playerOptions button");
      buttons.forEach((button) => {
        button.disabled = true;
      })
      
    }
    
    if (numberOfPlayers === currentPlayer) {
      const player1Total = this.state.player1Total > 21 ? 0 : this.state.player1Total;
      const player2Total = this.state.player2Total > 21 ? 0 : this.state.player2Total;
      const player3Total = this.state.player3Total > 21 ? 0 : this.state.player3Total;
      
      if (numberOfPlayers === 3 && player1Total === 21) {
        this.attack(1)
        setTimeout(() => {
          this.setState({
            player1Score: this.state.player1Score + 1,
            round: this.state.round + 1
          }, () => { this.checkWinner("Player1") });
        }, 2000);

      } else if (player1Total === player2Total && (player2Total === player3Total || numberOfPlayers !== 3)) {
        this.setState({
          showAll: true
        });

        setTimeout(() => {
          alert("Nobody", this.reset)
        }, 1000);
        
      } else if (player1Total > player2Total && player1Total > player3Total) {
        this.attack(1)
        setTimeout(() => {
          this.setState({
            player1Score: this.state.player1Score + 1,
            round: this.state.round + 1
          }, () => { this.checkWinner("Player1") });
        }, 2000);

      } else if (player2Total > player3Total) {
        this.attack(2)
        setTimeout(() => {
          this.setState({
            player2Score: this.state.player2Score + 1,
            round: this.state.round + 1
          }, () => { this.checkWinner("Player2") });
        }, 2000);

      } else if (this.state.numberOfPlayers === 3) {
        this.attack(3)
        setTimeout(() => {
          this.setState({
            player3Score: this.state.player3Score + 1,
            round: this.state.round + 1
          }, () => { this.checkWinner("Player3") });
        }, 2000);
      }
    
    } else {
        this.setState({
          hideCards: true,
          disabled: false
        });
        nextPlayerAlert(this.changeRound, this.state.currentPlayer + 1)
    }
  }


  // Method called to change round
  changeRound = () => {
    
    this.setState({
      currentPlayer: this.state.currentPlayer + 1,
      hideCards: false,
    }, () => {
        
        // If playing against the cpu then logic to make the cpu make a choice when playing 
        
      if (this.state[`player${this.state.currentPlayer}Total`] !== 21
        &&
        this.state[`player${this.state.currentPlayer}Total`] <= this.state.player1Total
        &&
        this.state.currentPlayer !== 1
        &&
        this.state.numberOfPlayers === 3) {

        
            
        setTimeout(() => {
          this.drawCard(1);
        }, 2000)
              
            
      } else if (this.state.currentPlayer !== 1 && this.state.numberOfPlayers === 3) {
        setTimeout(() => {
          this.stay();
            
        }, 2000);
      }
      
    }) 
    
  }  

  // Method to check if there is a game winner
  checkWinner = (player) => {
    // If there is a player with a score of 2 then the game is over if not then play the next round  
    const player1TotalScore = this.state.player1Score;
    const player2TotalScore = this.state.player2Score;
    const player3TotalScore = this.state.player3Score;

    if (player1TotalScore === 2) {
      this.setState({
        winner: 1
      })
      
    } else if (player2TotalScore === 2) {
      this.setState({
        winner: 2
      })
      
    } else if (player3TotalScore === 2) {
      this.setState({
        winner: 3
      })
      
    } else {
      this.setState({
        showAll: true
      })

      setTimeout(() => {
        alert(player, this.reset);
        casinoBgm.pause();
        levelUpSound.play();
      }, 1000)
    }
  }


  // Method to reset hands and totals on each round
  reset = () => {
    this.setState({
      cleanBoard: true,
      hideCards: false
    })
    
    setTimeout(() => {
      this.setState({
        player1Cards: [],
        player2Cards: [],
        player3Cards: [],
        currentPlayer: 1,
        player1Total: 0,
        player2Total: 0,
        player3Total: 0,
        showAll: false,
        hideCards: false,
        cleanBoard: false
      }, () => {
          this.drawCard(2, "firstCards");
      })
      
    }, 2000);
  }


  // Method to reset game in case of playing again
  resetGame = () => {
    this.getNewDeck();
    this.setState({
      randomPokemons: [],
      player1Cards: [],
      player2Cards: [],
      player3Cards: [],
      currentPlayer: 1,
      player1Total: 0,
      player2Total: 0,
      player3Total: 0,
      round: 1,
      player1Score: 0,
      player2Score: 0,
      player3Score: 0,
      winner: null,
      hideCards: false,
      showAll: false,
      loading: true,
      disabled: false,
      cleanBoard: false,
    },()=>{
      this.getRandomPokemon(this.state.numberOfPlayers);
    })
  }


  getRandomPokemon = (numberOfPlayers) => {
    
    this.setState({
      loading:true,
      instruction: false
    })
    
    // Foor loop that will repeat depending on the amount of players that will play the game
    for (let i = 0; i < numberOfPlayers; i++) {
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

          setTimeout(imagesPromises.push(promiseOne), 100);

          const promiseTwo = axios({
            url: `https://pokeapi.co/api/v2/pokemon/${pokemonNextEvolution}`,
            method: "get",
            responseType: "json"
          })

          setTimeout(imagesPromises.push(promiseTwo), 100);

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
              randomPokemons: currentPokemons,
            }, () => {
              if (this.state.randomPokemons.length === this.state.numberOfPlayers) {
                this.pokemonAppear();
                this.setState({
                  loading: false
                });

                setTimeout(() => {
                  this.drawCard(2, "firstCards");
                }, 3500 * this.state.numberOfPlayers);
              }
            })
          })
        }
      })
    }
  }


  numberOfPlayers = (playerCount) => {
    this.setState({
      numberOfPlayers: playerCount
    })
  }

   	seeInstructions = () => {
		this.setState({
			instruction: !this.state.instruction
		})
	}

  render() {
    return (  
      <div className="wrapper">
        
        {this.state.loading && <Loading/>}
		
        {/* Importing the Header Component */}
        <Header showInstructions = {this.seeInstructions}/>
        {this.state.instruction 
          && 
        <WelcomeScreen 
          playerCount={this.numberOfPlayers} 
          getpokemon={this.getRandomPokemon} 
          showButtons={this.state.showButtons} 
          hideButtons={() => { this.setState({ showButtons: false }) }} 
          closeInstructions={this.seeInstructions}/>}

        <PokemonPlayer
          getPokemon={this.state.randomPokemons}
          player1Score={this.state.player1Score}
          player2Score={this.state.player2Score}
          player3Score={this.state.player3Score}
          cleanBoard={this.state.cleanBoard}
          player1Cards={this.state.player1Cards}
          player2Cards={this.state.player2Cards}
          player3Cards={this.state.player3Cards}
          currentPlayer={this.state.currentPlayer}
          showAll={this.state.showAll}
          hideCards={this.state.hideCards}
          winner={this.state.winner}
          numberOfPlayers={this.state.numberOfPlayers} />

        {this.state.winner
          &&
          (
            setTimeout(() => {
              evolutionAlert(
                (this.state.randomPokemons[this.state.winner - 1].firstPokemon), 
                (this.state.randomPokemons[this.state.winner - 1].firstPokemonImg), 
                (this.state.randomPokemons[this.state.winner - 1].firstPokemonId), 
                (this.state.randomPokemons[this.state.winner - 1].evolution), 
                (this.state.randomPokemons[this.state.winner - 1].evolutionPokemonImg), 
                (this.state.randomPokemons[this.state.winner - 1].evolutionPokemonId), 
                this.resetGame, 
                this.state.winner);
            }, 2000))
        }

		{/* Displaying which player's turn it is */}
        <div className="player">          
          <p>{this.state.player2Cards.length<2 
              ? 
            "Shuffling cards.." 
              : 
            `Player ${this.state.currentPlayer} turn`}
          </p>
        </div>

        <div className="gameBoard">
          <div>
            <div className="playerOptions">
              <button disabled={this.state.disabled} onClick={() => { this.drawCard(1, "") }}>Draw a card</button>
              <button onClick={this.stay}>STAY</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
