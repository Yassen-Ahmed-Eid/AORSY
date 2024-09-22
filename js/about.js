/*Music Toggle Script*/ 
document.getElementById('music-toggle').addEventListener('click', function(event) {
    event.preventDefault();
    var music = document.getElementById('background-music');
    if (music.paused) {
        music.play();
        this.querySelector('i').style.color = '#f39c12'; // Change icon color to orange
    } else {
        music.pause();
        music.currentTime = 0; // Reset music to the beginning
        this.querySelector('i').style.color = ''; // Reset icon color
    }
});
/****************************************************************************************/
// JavaScript code for typing animation
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('text');
    const text2Element = document.getElementById('text2');
    const text3Element = document.getElementById('text3');
    const text4Element = document.getElementById('text4');
    const text5Element = document.getElementById('text5'); // New text element for the fifth text

    const text = 'About us';
    const text2 = "We are a group of students from Egypt";
    const text3 = "In STEM schools grade 11,We wanted";
    const text4 = "to spread awareness about space and";
    const text5 = "objects that may pose a danger to Earth."; // New text for the fifth element

    let index = 0;

    function type(element, text, callback) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(() => type(element, text, callback), 100); // Adjust typing speed here
        } else if (callback) {
            callback();
        }
    }

    function startTyping() {
        type(textElement, text, () => {
            // Start typing the second text after the first one finishes
            setTimeout(() => {
                index = 0; // Reset index for the second text
                type(text2Element, text2, () => {
                    // Start typing the third text after the second one finishes
                    setTimeout(() => {
                        index = 0; // Reset index for the third text
                        type(text3Element, text3, () => {
                            // Start typing the fourth text after the third one finishes
                            setTimeout(() => {
                                index = 0; // Reset index for the fourth text
                                type(text4Element, text4, () => {
                                    // Start typing the fifth text after the fourth one finishes
                                    setTimeout(() => {
                                        index = 0; // Reset index for the fifth text
                                        type(text5Element, text5);
                                    }, 500); // Delay before starting the fifth text
                                });
                            }, 500); // Delay before starting the fourth text
                        });
                    }, 500); // Delay before starting the third text
                });
            }, 500); // Delay before starting the second text
        });
    }

    setTimeout(startTyping, 3000); // Start typing the first text after 3 seconds
});
