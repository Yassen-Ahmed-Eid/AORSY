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
    const text4Element = document.getElementById('text4'); // New text element

    const text = 'Hello in ASORY site';
    const text2 = "Here you can find all the information you.";
    const text3 = "need about space and the dangers that";
    const text4 = "approach Earth,Stay tuned for more !"; // New text

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
                                type(text4Element, text4);
                            }, 1000); // Delay before starting the fourth text
                        });
                    }, 1000); // Delay before starting the third text
                });
            }, 1000); // Delay before starting the second text
        });
    }

    setTimeout(startTyping, 3000); // Start typing the first text after 3 seconds
});
