import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal);

const alert = (nextRound, winner,reset) => {
    
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

export default alert;
