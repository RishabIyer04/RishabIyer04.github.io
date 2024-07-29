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
        drawPlot('#graph1', '#legend', window.data, 'PG');
    });

});

function nextSlide(current, next) {
    document.getElementById(current).style.display = 'none';
    document.getElementById(next).style.display = 'block';
    if (next === 'slide1' && window.data) drawPlot('#graph1', '#legend', window.data, 'PG');
    if (next === 'slide2' && window.data) drawPlot('#graph2', '#legend', window.data, 'SF');
    if (next === 'slide3' && window.data) drawPlot('#graph3', '#legend', window.data, 'C');
    if (next === 'conclusion' && window.data) drawPlot('#graph4', '#legend', window.data, document.getElementById('positionFilter').value);
}

function previousSlide(current, previous) {
    document.getElementById(current).style.display = 'none';
    document.getElementById(previous).style.display = 'block';
    if (previous === 'slide1' && window.data) drawPlot('#graph1', '#legend', window.data, 'PG');
    if (previous === 'slide2' && window.data) drawPlot('#graph2', '#legend', window.data, 'SF');
    if (previous === 'slide3' && window.data) drawPlot('#graph3', '#legend', window.data, 'C');
}

function filterPosition() {
    if (window.data) {
        const position = document.getElementById('positionFilter').value;
        drawPlot('#graph4', '#legend', window.data, position);
    }
}