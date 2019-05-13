import { textValues } from './OrganizedData';

export const measurePrep = (ctx, text) => ctx.measureText(text).width

export const createLineLength = function(ctx) {
    if (arguments.length <= 3) {
        return measurePrep(ctx, arguments[1]) * 1.4;
    } else {
        let value = 0;
        for (let i = 1; i < arguments.length; i++) {
            value += measurePrep(ctx, arguments[i]);
        }
        return value * 1.3;
    }
}

export const createText = function(ctx, alpha, x, y) {
    ctx.save()
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.shadowOffset = 3;
    ctx.fillStyle = `rgba(256, 256, 256, ${alpha})`;
    ctx.fillText(arguments[4], x, y);
    if (arguments.length <= 4) {
        return;
    }
    for (let i = 5; i < arguments; i++) {
        ctx.fillStyle = `rgba(256, 256, 256, ${alpha})`;
        ctx.fillText(textValues[0], x, y);
    }
}

export const animationProperties = {
    properties: [],
    add: function(num, object) {
        for (let i = 0; i < num; i++) {
            this.properties.push(object);
        }
    }
}

export const animateProperties = (settings, time) => {
    let length = settings.properties.length;
    let property = settings.properties;
    for (let i = 0; i < length; i++) {
        let { start, end, name, duration, value, speed } = property[i];
        if (time >= start && time <= end) {
            if (name.charAt(0) === 'r') {
                let { size } = property[i];
                property[i].value = size <= value ? value : value + 3;
            } else if (name.charAt(0) === 'w') {
                let { height } = property[i];
                property[i].value = height <= value ? value : value + speed;
            } else {
                if (time >= duration) {
                    property[i].value = value <= 0 ? 0 : value - speed;
                } else {
                    property[i].value = value >= 1 ? 1 : value + speed;
                }
            }
        }
    }
}

export const createLine = (ctx, alpha, listRange, linesArray) => {
    for (let i = listRange.start; i < listRange.end; i++) {
        let { style, text, x, y } = linesArray[i];
        ctx.fillStyle = style + `, ${alpha}`;
        ctx.fillText(text, x, y);
    }
}

export const drawControl = (num, time) => {
    return !(animationProperties.properties[num].end < time);
}

export const checkLoopFinish = (video, time) => {
    if (time >= 6.5) {
        video.pause();
        animationProperties.properties.forEach(prop => {
            prop.value = 0;
        })
        video.currentTime = 0;
        video.play();
    }
}


