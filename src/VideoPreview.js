import React from 'react';
import VideoData from './VideoData';
import { createLineLength, createLine, animationProperties, animateProperties, drawControl, checkLoopFinish } from './Tools'
import { createVideo, textValues, getLineProperties } from './OrganizedData';

class VideoPreview extends React.Component {
    componentDidMount() {
        document.fonts.ready.then(() => {
            // for some reason, we need to wait a little longer still...
            window.setTimeout(() => {
                this.beginDraw(this.refs.canvas);
            }, 200);
        });
    }


    beginDraw(canvas) {
        // Initialize main variables
        let ctx = canvas.getContext('2d');
        let video = createVideo();

        // Rough sentence length calculation
        let sentenceLength01 = createLineLength(ctx, textValues[0], textValues[1], textValues[2]);
        let sentenceLength02 = createLineLength(ctx, textValues[3]);
        let sentenceLength03 = createLineLength(ctx, textValues[4], textValues[5], textValues[6]);

        // Set animation properties for objects to be drawn
        animationProperties.add(1, { name: 'rectangle01', value: 0, speed: 3, start: 0, end: 3, duration: 3, size: sentenceLength01 });
        animationProperties.add(1, { name: 'rectangle02', value: 0, speed: 3, start: 0, end: 3, duration: 3, size: sentenceLength02 });
        animationProperties.add(1, { name: 'rectangle03', value: 0, speed: 3, start: 3.3, end: 6.5, duration: 6.5, size: sentenceLength03 });
        animationProperties.add(1, { name: 'text01', value: 0, speed: .03, start: 0, end: 3, duration: 2.5, height: canvas.height });
        animationProperties.add(1, { name: 'text02', value: 0, speed: .03, start: 0, end: 3, duration: 2.5, height: canvas.height });
        animationProperties.add(1, { name: 'text03', value: 0, speed: .06, start: 3.3, end: 6.5, duration: 5.5 });
        animationProperties.add(1, { name: 'wipe01', value: 0, speed: 6, start: 2.5, end: 3.3, duration: 3 });
        animationProperties.add(1, { name: 'wipe02', value: 0, speed: 6, start: 5.5, end: 6.5, duration: 6.5 });
        updateCanvas()
        video.play();

        function updateCanvas() {
            // Setup required values
            let linesData = getLineProperties(ctx);
            ctx.font = `10px ${VideoData.font}`;
            let time = Math.floor(video.currentTime);
            // Animate through iteration all properties
            animateProperties(animationProperties, time);

            // Initial canvas clean wipe
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Rectangle Background Layer
            ctx.fillStyle = `rgba(255, 167, 38, 1)`;
            drawControl(0, time) && ctx.fillRect(7, 60, animationProperties.properties[0].value, 12);
            drawControl(1, time) && ctx.fillRect(7, 73, animationProperties.properties[1].value, 12);
            drawControl(2, time) && ctx.fillRect(7, 65, animationProperties.properties[2].value, 12);

            // Set Text over backdrops composite
            ctx.globalCompositeOperation = "source-atop";
            drawControl(3, time) && createLine(ctx, animationProperties.properties[3].value, { start: 0, end: 3 }, linesData);
            drawControl(4, time) && createLine(ctx, animationProperties.properties[4].value, { start: 3, end: 4 }, linesData);
            drawControl(5, time) && createLine(ctx, animationProperties.properties[5].value, { start: 4, end: linesData.length }, linesData);

            // Wipes from left to right
            drawControl(6, time) && ctx.clearRect(0, 0, animationProperties.properties[6].value, canvas.height);
            drawControl(7, time) && ctx.clearRect(0, 0, animationProperties.properties[7].value, canvas.height);

            // Set foreground over background video composite
            ctx.globalCompositeOperation = "destination-over";
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            // There is an issue with the width/height of the canvas. The image is being stretched by CSS. I am not exactly sure how to fix it. 
            // I tried getting the computed values from CSS and forcing the canvas to adjust. I need to do some research and experiment further. 

            // Check end of animation to reset variables
            checkLoopFinish(video, time);

            // Recursive function
            requestAnimationFrame(updateCanvas);
        }
    }

    render() {

        return (
            <div className="lefts-border-line manufacturer-panel">
                <h1 className="manufacturer-title">
                    Video Preview
                </h1>
                <hr />
                <div className="video-container">
                    <div className="aspect-ratio-fixer">
                        <div className="use-aspect-ratio">
                            <canvas ref="canvas" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPreview;
