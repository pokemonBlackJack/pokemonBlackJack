import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import instructionBgm from './sounds/instructionBgm.ogg';
import playBgm from './sounds/playBgm.ogg';
import evolveMusic from './sounds/evolution.ogg';
import evolvedSound from './sounds/evolvedSound.ogg';
import levelUp from './sounds/levelUp.ogg';

// Declare audio that will be used in other components
export const casinoBgm = new Audio(instructionBgm);
export const playMusic = new Audio(playBgm);
export const levelUpSound = new Audio(levelUp);

// Dynamically imports sound files based on parameter passed
export const soundToUse = require.context('./sounds/cries', true);

// SweetAlert2
const MySwal = withReactContent(Swal);

// Evolution 
export const evolutionAlert = (pre, preImg, preId, post, postImg, postId, resetGame, winner) => {
    let preCrySound = soundToUse(`./${preId}.ogg`);
    let preCry = new Audio(preCrySound);
    let postCrySound = soundToUse(`./${postId}.ogg`);
    let postCry = new Audio(postCrySound);
    let evolveBgm = new Audio(evolveMusic);
    let evolveSoundEffect = new Audio(evolvedSound);
    let interval;
    
    const evolutionAnimation = () => {
        const pokemonImage = document.querySelector(".swal2-image");
        let counter = 1;
        let image = 1;

        interval = setInterval(() => {
            let source = "";
            counter++;
            if (image === 1) {
                source = preImg
                image = 2;
            } else {
                source = postImg
                image = 1;
            };
            pokemonImage.src = source;
        }, 500 - (15 * counter));

        setTimeout(() => {
            clearInterval(interval);
        }, 12500);
    };

    MySwal.fire({
        onOpen: () => {
            casinoBgm.pause();
            casinoBgm.currentTime = 0;
            document.querySelector(".swal2-confirm").disabled = true;
            setTimeout(() => (preCry.play()), 500);
            setTimeout(() => {
                evolutionAnimation()
                evolveBgm.play();
                document.querySelector(".swal2-confirm").disabled = false;
            }, 1000);
        },
        onClose: () => {
            evolveBgm.pause();
            evolveBgm.currentTime = 0;
            clearInterval(interval);
        },
        text: `It looks like something is happening to ${pre}!`,
        imageUrl: preImg,
        imageWidth: 300,
        background: `rgba( 255, 255, 255, 0.9)`,
        backdrop: `#142b68`,
        timer: 13500,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: 'Skip',
    }).then(() => {
        return MySwal.fire({
            onOpen: () => {
                evolveBgm.pause();
                evolveBgm.currentTime = 0;
                postCry.play();
                setTimeout(() => (evolveSoundEffect.play()), 1200)
            },
            onClose: () => {
                resetGame();
                casinoBgm.play();
            },
            title: `Congratulations Player${winner}!`,
            text: `Your ${pre} evolved into ${post}!`,
            imageUrl: postImg,
            imageWidth: 300,
            backdrop: `#142b68`,
            confirmButtonText: 'Play Again',
        })
    })
}

const alert = (winner, reset) => {
    MySwal.fire({
        onClose: () => {
            reset();
            casinoBgm.play();
        },
        title: `Congrats ${winner}!`,
        text: `${winner} wins this round!`,
        background: `rgba( 255, 255, 255, 0.9)`,        
        showConfirmButton: true,
        confirmButtonText: 'Next round!',
    })
}

export const nextPlayerAlert = (nextplayerFunction, player) => {
    MySwal.fire({
        onClose: () => {
            nextplayerFunction(); 
        },
        title: `It's Player ${player} turn!`,
        text: `Please press Ok when the next player is ready`,
        background: `rgba( 255, 255, 255, 0.9)`,
        showConfirmButton: true,
        confirmButtonText: 'Ok ready!',
    })
}

export default alert;
