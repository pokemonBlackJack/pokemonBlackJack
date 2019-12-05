// import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import preCrySound from './sounds/cries/1.ogg';
import postCrySound from './sounds/cries/2.ogg';
import evolveMusic from './sounds/evolution.ogg';
import evolvedSound from './sounds/evolvedSound.ogg';

const MySwal = withReactContent(Swal)

let preCry = new Audio(preCrySound);
let postCry = new Audio(postCrySound);
let evolveBgm = new Audio(evolveMusic);
let evolveSoundEffect = new Audio(evolvedSound);

const evolutionAlert = (pre, preImg, post, postImg) => {
    MySwal.fire({
        onOpen: () => {
            preCry.play();
            setTimeout(() => (evolveBgm.play()),500,);
        },
        onClose: () => {
            evolveBgm.pause();
            evolveBgm.currentTime = 0;
        },
        title: `What?`,
        text: `${pre} is evolving!`,
        imageUrl: preImg,
        imageWidth: 300,
        background: `rgba( 255, 255, 255, 0.9)`,
        backdrop: `
            #142b68`,
        timer: 12000,
        timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: 'Skip',
    }).then(() => {
        return MySwal.fire({
            onOpen: () => {
                postCry.play();
                setTimeout(() => (evolveSoundEffect.play()), 1200,)
            },
            title: `Congratulations!`,
            text: `Your ${pre} evolved into ${post}!`,

            imageUrl: postImg,
            imageWidth: 300,
            backdrop: `
            #edfeff`
        })
    })
}

export default evolutionAlert;