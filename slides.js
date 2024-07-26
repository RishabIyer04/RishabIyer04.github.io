// // Function to show the specified slide and hide others
// function showSlide(slideId) {
//     document.querySelectorAll('.slide').forEach(slide => {
//         slide.classList.remove('active');
//     });
//     document.getElementById(slideId).classList.add('active');
// }

// // Show the introduction slide initially
// showSlide('slide-intro');

document.addEventListener("DOMContentLoaded", function() {
    // Hide all slides except the first one
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });

    drawPlot1();
    
});


function nextSlide(current, next) {
    document.getElementById(current).style.display = 'none';
    document.getElementById(next).style.display = 'block';
    if (next === 'slide1') drawPlot1();
    if (next === 'slide2') drawPlot2();
    if (next === 'slide3') drawPlot3();
    if (next === 'conlusion') drawPlot4();
}

function previousSlide(current, previous) {
    document.getElementById(current).style.display = 'none';
    document.getElementById(previous).style.display = 'block';
    if (previous === 'slide1') drawPlot1();
    if (previous === 'slide2') drawPlot2();
    if (previous === 'slide3') drawPlot3();
}