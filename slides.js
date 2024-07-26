document.addEventListener("DOMContentLoaded", function() {
    // Hide all slides except the first one
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });

    window.data = null;
    loadData().then(loadedData => {
        window.data = loadedData;
        drawPlot1(window.data);
    });

});

function nextSlide(current, next) {
    document.getElementById(current).style.display = 'none';
    document.getElementById(next).style.display = 'block';
    if (next === 'slide1' && window.data) drawPlot1(window.data);
    if (next === 'slide2' && window.data) drawPlot2(window.data);
    if (next === 'slide3' && window.data) drawPlot3(window.data);
    if (next === 'conclusion' && window.data) drawPlot4(window.data);
}

function previousSlide(current, previous) {
    document.getElementById(current).style.display = 'none';
    document.getElementById(previous).style.display = 'block';
    if (previous === 'slide1' && window.data) drawPlot1(window.data);
    if (previous === 'slide2' && window.data) drawPlot2(window.data);
    if (previous === 'slide3' && window.data) drawPlot3(window.data);
}