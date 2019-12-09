import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import pika from './assets/pika.png'
import ashGif from './assets/ash.gif'


const MySwal = withReactContent(Swal);

const alert = (nextRound, winner,reset) => {
    
    MySwal.fire({
    
        onClose: () => {
            reset();
        },
        title: `What?`,
        text: `${winner} wins!`,
        background: `rgba( 255, 255, 255, 0.9)`,        
        showConfirmButton: true,
        confirmButtonText: 'Next round!',
    })
}


export const showLoading = (startGameFunction) => {
			  
			
				
    return MySwal.fire({
        title: "Fetching Your Pokemon",
        onClose: () => {
            setTimeout(() => {
                startGameFunction(2, "firstCards");
                
            }, 7000);
        },
        confirmButtonColor: "#142b68",
        text: "Hang tight while the trainers go and catch the Pokemon for your battle ",
        background: '#142b68',
        backdrop: `rgba(19,43,104)`,
        imageUrl: ashGif,
        imageHeight: 400,
        imageWidth: 800,
        showConfirmButton:true,
        customClass: 'swal-wide', 
            
            
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
            title: "Welcome To Pokemon BlackJack!",
            text: "The rules are simple! Player 1 goes first, and will click 'Hit Me' to total their cards as close to 21 without going over. Once they click 'stay', it's time for Player 2. ",
            // icon: "info",
            imageUrl: pika,
            onClose: () => {
                if(getPokemonFunction){
                    getPokemonFunction(2);

                }
            
            },
            imageHeight: 200,
            imageWidth: 250,
            showConfirmButton:true,
            customClass: 'swal-wide', 
  
        })	
	}

export default alert;
