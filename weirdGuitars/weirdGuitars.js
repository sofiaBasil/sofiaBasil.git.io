// Guitar - https://www.youtube.com/watch?v=geRBqZjBgQs
// Really great tutorial that I learned a lot from ^^ 

// Gets access to the root information on the CSS page 
const root = document.documentElement; 

// BELOW CODE MAKES STRINGS & FRETBOARD 
// Fretboard object 
const fretBoard = document.querySelector('.fretboard');
const numOfFrets = 12; 
const numOfStrings = 6; 

// BELOW CODE MAKES STRINGS & FRETBOARD 
const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];

// Array with the names of the notes 
const flatNotes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const sharpNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Figures out what note to put where using mod(%)
let accidentals = 'flats';
// E is the first note and is the 4th note in the array 
// B is the second note and is the 11th note in the array etc...
const guitarTuning = [4, 11, 7, 2, 9, 4]; 

// BELOW CODE MAKES STRINGS & FRETBOARD 
// App object 
const app = {
    init() {
        this.setUpFretboard();
        this.setupEventListeners();
    },
    setUpFretboard() {
        root.style.setProperty('--numOfStrings', numOfStrings);

        let x = 0; 
        // Add strings to fretboard
        for (var i = 0; i < numOfStrings; i++) {
            let string = tools.createElement('div');
            string.classList.add('string');
            fretBoard.appendChild(string);
            console.log(i);

            // Creates the frets 
            for (let fret = 0; fret <= numOfFrets; fret++) {
                // Creates a variable for the note 
                let noteFret = tools.createElement('div');
                noteFret.classList.add('note-Fret');
                // Appends string created in first loop to note-Fret
                string.appendChild(noteFret);

                // Create a variable for the name of the note for each fret
                let noteName = this.generateNotes((fret + guitarTuning[i]));
                noteFret.setAttribute('data-note', noteName); 

                // Checks if it is one of the single mark spots in the array
                // If in array, adds SINGLE mark 
                if (i == 0 && singleFretMarkPositions.indexOf(fret) != -1) {
                    noteFret.classList.add('single-Fretmark');
                }

                // Checks if it is one of the double mark spots in the array
                // If in array, adds DOUBLE marks
                if (i == 0 && doubleFretMarkPositions.indexOf(fret) != -1) {
                    let doubleFretMark = tools.createElement('div');
                    doubleFretMark.classList.add('double-Fretmark');
                    // Put it inside the noteFret div
                    noteFret.appendChild(doubleFretMark);
                }
            }
        }
    }, 
    generateNotes(noteIndex) {
        // Mode 12 because we have 12 notes
        noteIndex = noteIndex % 12; 
        let noteName; 
        // If note is flat 
        if (accidentals == 'flats') {
            noteName = flatNotes[noteIndex];
        }
        // Else note is sharp 
        else if (accidentals == 'sharps') {
            noteName = sharpNotes[noteIndex];
        }
        return noteName; 
    }, 
    setupEventListeners() {
        fretBoard.addEventListener('mouseover', (event) => {
        });
    }
}

// BELOW CODE MAKES STRINGS & FRETBOARD 
// Creates elements 
const tools = {
    createElement(element, content) {
        element = document.createElement(element); 
        // If the length of the amount of argmuents > 1
        if (arguments.length > 1) {
            element.innerHTML = content; 
        }
        return element; 
    }
}

app.init();