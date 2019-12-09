import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import pika from './assets/pika.png'
import pikachuSound from './sounds/cries/25.ogg';
import instructionBgm from './sounds/instructionBgm.ogg';
import playBgm from './sounds/playBgm.ogg';
import rollingPokeball from './assets/rollingPokeball.gif';

const MySwal = withReactContent(Swal);
const pikachu = new Audio(pikachuSound);
const casinoBgm = new Audio(instructionBgm);
const playMusic = new Audio(playBgm);

const alert = (nextRound, winner, reset) => {
    MySwal.fire({
    
        onClose: () => {
            nextRound(2, "firstCards");
            reset();
        },
        title: `What?`,
        text: `${winner} wins!`,
        background: `rgba( 255, 255, 255, 0.9)`,        
        showConfirmButton: true,
        confirmButtonText: 'Next round!',
    })
}

export const nextPlayerAlert = (nextplayerFunction, player, message) => {

    MySwal.fire({

        onClose: () => {
            nextplayerFunction();
            
        },
        title: `What?`,
        text: `It's Player ${player} turn next! please press Ok when the next player is ready`,
        background: `rgba( 255, 255, 255, 0.9)`,
        showConfirmButton: true,
        confirmButtonText: 'Ok ready!',
    })
}

export const seeInstructions = (getPokemonFunction) => {

		MySwal.fire({
            title: "Welcome To Pikachu BlackJack!",
            text: "The rules are simple. Player 1 goes first, and will click 'Hit Me' to total their cards as close to 21 without going over. Once they click 'stay', it's time for Player 2. ",
            icon: "info",
            imageUrl: pika,
            onOpen: () => {
                playMusic.pause();
                setTimeout(pikachu.play(), 1000);
                casinoBgm.play();
            },
            onClose: () => {
                if(getPokemonFunction){
                    getPokemonFunction(2)
                };
                casinoBgm.pause();
                casinoBgm.currentTime = 0;
                setTimeout(playMusic.play(), 1000);
            },
            imageHeight: 200,
            imageWidth: 250,
            showConfirmButton:true,
            customClass: 'swal-wide', 
  
        })	
	}

export default alert;
