// import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import evolveMusic from './sounds/evolution.ogg';
import evolvedSound from './sounds/evolvedSound.ogg';
// import preCrySound from './sounds/cries/1.ogg';
// import postCrySound from './sounds/cries/2.ogg';

const MySwal = withReactContent(Swal);

const soundToUse = require.context('./sounds/cries', true);

const evolutionAlert = (pre, preImg, preId, post, postImg, postId) => {
    let preCrySound = soundToUse(`./${preId}.ogg`);
    let preCry = new Audio(preCrySound);
    let postCrySound = soundToUse(`./${postId}.ogg`);
    let postCry = new Audio(postCrySound);
    let evolveBgm = new Audio(evolveMusic);
    let evolveSoundEffect = new Audio(evolvedSound);

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