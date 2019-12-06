import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const alert = (nextRound, winner) => {
    
    MySwal.fire({
    
        onClose: () => {
            nextRound(2, "firstCards");
        },
        title: `What?`,
        text: `${winner} wins!`,
        background: `rgba( 255, 255, 255, 0.9)`,
        backdrop: `
                #142b68`,
        
        showConfirmButton: true,
        confirmButtonText: 'Next round!',
    })
}

export default alert;