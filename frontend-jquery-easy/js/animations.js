const easyFadeAnimation = (targetNode, delay, duration) => {
    targetNode.css("opacity", 0);

    targetNode.delay(delay).animate({
        opacity: 1,
    }, duration);
};