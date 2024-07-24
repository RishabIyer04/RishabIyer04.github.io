// // Function to show the specified slide and hide others
// function showSlide(slideId) {
//     document.querySelectorAll('.slide').forEach(slide => {
//         slide.classList.remove('active');
//     });
//     document.getElementById(slideId).classList.add('active');
// }

// // Show the introduction slide initially
// showSlide('slide-intro');

function nextSlide(current, next) {
    document.getElementById(current).style.display = 'none';
    document.getElementById(next).style.display = 'block';
}

function previousSlide(current, previous) {
    document.getElementById(current).style.display = 'none';
    document.getElementById(previous).style.display = 'block';
}