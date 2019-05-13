import VideoData from './VideoData';
import { measurePrep } from './Tools';

let text1 = VideoData.text[0].content;
let text2 = VideoData.text[1].content;
let highlight01 = VideoData.text[0].keyword_indexes;
let highlight02 = VideoData.text[1].keyword_indexes;

export const textValues = [
    text1.slice(0, 7),
    text1.slice(highlight01[0], highlight01[1]),
    text1.slice(13, 20),
    text1.slice(21),
    text2.slice(0, 6),
    text2.slice(highlight02[0], highlight02[1]),
    text2.slice(9)
];


export const createVideo = () => {
    let video = document.createElement("video");
    video.src = VideoData.background.mp4_url;
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    return video;
}

export const getLineProperties = (ctx) => {
    let spacing = 12;
    return [
        {
            style: `rgba(256, 256, 256`,
            text: textValues[0],
            x: 10,
            y: 70
        },
        {
            style: `rgba(25, 29, 38`,
            text: textValues[1],
            x: measurePrep(ctx, textValues[0]) + spacing,
            y: 70
        },
        {
            style: `rgba(256, 256, 256`,
            text: textValues[2],
            x: measurePrep(ctx, textValues[0]) + measurePrep(ctx, textValues[1]) + spacing * 1.1,
            y: 70
        },
        {
            style: `rgba(256, 256, 256`,
            text: textValues[3],
            x: 10,
            y: 83
        },
        {
            style: `rgba(256, 256, 256`,
            text: textValues[4],
            x: 10,
            y: 75
        },
        {
            style: `rgba(25, 29, 38`,
            text: textValues[5],
            x: measurePrep(ctx, textValues[4]) + spacing,
            y: 74
        },
        {
            style: `rgba(256, 256, 256`,
            text: textValues[6],
            x: measurePrep(ctx, textValues[4]) + measurePrep(ctx, textValues[5]) + spacing * 1.1,
            y: 75
        },
    ]
};