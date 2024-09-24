const questions = [
    { question: "Was bedeutet das lateinische Wort 'puer'?", answers: ["Mädchen", "Junge", "Hund", "König"], correct: 1 },
    { question: "Wie lautet das lateinische Wort für 'Liebe'?", answers: ["Amor", "Bellum", "Flumen", "Vita"], correct: 0 },
    { question: "Welches lateinische Wort bedeutet 'Krieg'?", answers: ["Terra", "Aqua", "Bellum", "Ventus"], correct: 2 },
    { question: "Was bedeutet das lateinische Wort 'aqua'?", answers: ["Feuer", "Licht", "Wasser", "Luft"], correct: 2 },
    { question: "Wie lautet das lateinische Wort für 'Himmel'?", answers: ["Caelum", "Terra", "Aqua", "Ignis"], correct: 0 },
    { question: "Was ist die lateinische Übersetzung für 'Haus'?", answers: ["Domus", "Civitas", "Via", "Forum"], correct: 0 },
    { question: "Wie heißt das lateinische Wort für 'Freund'?", answers: ["Amicus", "Hostis", "Rex", "Civis"], correct: 0 },
    { question: "Welches lateinische Wort steht für 'Tier'?", answers: ["Animal", "Rex", "Civis", "Fera"], correct: 0 },
    { question: "Was bedeutet 'bellum' auf Deutsch?", answers: ["Krieg", "Frieden", "Liebe", "Wasser"], correct: 0 },
    { question: "Wie heißt das lateinische Wort für 'Stadt'?", answers: ["Civitas", "Domus", "Vila", "Forum"], correct: 0 },
    { question: "Was bedeutet das lateinische Wort 'nox'?", answers: ["Tag", "Nacht", "Mond", "Sonne"], correct: 1 },
    { question: "Wie lautet das lateinische Wort für 'Mond'?", answers: ["Luna", "Sol", "Stella", "Nox"], correct: 0 },
    { question: "Welches lateinische Wort bedeutet 'Sonne'?", answers: ["Sol", "Luna", "Stella", "Astra"], correct: 0 },
    { question: "Wie heißt das lateinische Wort für 'Land'?", answers: ["Terra", "Aqua", "Ignis", "Caelum"], correct: 0 },
    { question: "Was bedeutet das lateinische Wort 'flumen'?", answers: ["Berg", "Fluss", "Tal", "Wald"], correct: 1 },
    { question: "Wie lautet das lateinische Wort für 'König'?", answers: ["Rex", "Imperator", "Dux", "Magister"], correct: 0 },
    { question: "Welches lateinische Wort steht für 'Königin'?", answers: ["Regina", "Imperatrix", "Diva", "Magistra"], correct: 0 },
    { question: "Was bedeutet das lateinische Wort 'corpus'?", answers: ["Kopf", "Körper", "Hand", "Fuß"], correct: 1 },
    { question: "Wie heißt das lateinische Wort für 'Armee'?", answers: ["Exercitus", "Legio", "Cohors", "Classis"], correct: 0 },
    { question: "Welches lateinische Wort bedeutet 'Hilfe'?", answers: ["Auxilium", "Salus", "Opus", "Praesidium"], correct: 0 },
    { question: "Was ist die lateinische Übersetzung für 'Mensch'?", answers: ["Homo", "Vir", "Puer", "Feminam"], correct: 0 }
    // Weitere Fragen hinzufügen
];


let currentQuestionIndex = -1;
let fiftyFiftyUsed = false;
let correctAnswersCount = 0;
const totalQuestions = 5; // Anzahl der Fragen (kann angepasst werden)

// Lade die benutzten Fragen aus dem Local Storage
function loadUsedQuestions() {
    const used = localStorage.getItem('usedQuestions');
    return used ? JSON.parse(used) : [];
}

// Speichere die benutzten Fragen in den Local Storage
function saveUsedQuestions(usedQuestions) {
    localStorage.setItem('usedQuestions', JSON.stringify(usedQuestions));
}

// Initialisiere benutzte Fragen
let usedQuestions = loadUsedQuestions();

function getRandomQuestionIndex() {
    if (questions.length === usedQuestions.length) {
        alert('Alle Fragen wurden bereits beantwortet.');
        return -1; // Keine weitere Frage anzeigen
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));

    usedQuestions.push(randomIndex);
    saveUsedQuestions(usedQuestions);
    return randomIndex;
}

function shuffleAnswers(answers) {
    for (let i = answers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
}

function loadQuestion() {
    const index = getRandomQuestionIndex();
    if (index === -1) {
        return; // Keine Frage anzeigen, da alle Fragen beantwortet wurden
    }

    currentQuestionIndex = index;
    const question = questions[currentQuestionIndex];

    document.getElementById('question').textContent = question.question;

    const answers = shuffleAnswers([...question.answers]);
    answers.forEach((answer, i) => {
        document.getElementById(`answer${i + 1}`).textContent = answer;
        document.getElementById(`answer${i + 1}`).dataset.correct = (answer === question.answers[question.correct]);
    });
}

document.querySelectorAll('.answer').forEach((button) => {
    button.addEventListener('click', () => {
        if (currentQuestionIndex === -1) return; // Keine Frage anzeigen, wenn alle Fragen beantwortet wurden

        const isCorrect = button.dataset.correct === 'true';
        if (isCorrect) {
            button.style.backgroundColor = '#2ecc71';  // Grün für richtige Antwort
            correctAnswersCount++;
            updateProgress(); // Aktualisiere die Fortschrittsanzeige
            if (correctAnswersCount >= totalQuestions) {
                window.location.href = 'gewonnen.html';  // Weiterleitung zur Gewinn-Seite
            } else {
                setTimeout(() => {
                    resetButtons();
                    loadQuestion();
                }, 1000);
            }
        } else {
            button.style.backgroundColor = '#e74c3c';  // Rot für falsche Antwort
            setTimeout(() => {
                window.location.href = 'verloren.html';  // Weiterleitung zur Verloren-Seite
            }, 1000);
        }
    });
});

// Progress Bar
function updateProgress() {
    const progressElement = document.getElementById('progress');
    const percentage = (correctAnswersCount / totalQuestions) * 100; // Berechne den Fortschritt in %
    progressElement.style.width = `${percentage}%`; // Aktualisiere die Breite der Progress-Bar
    progressElement.textContent = `${Math.round(percentage)}%`; // Zeige den Prozentsatz an
}



function resetButtons() {
    document.querySelectorAll('.answer').forEach(button => {
        button.style.backgroundColor = '#3498db';  // Zurück zur ursprünglichen Farbe
        button.style.display = 'inline-block';    // Sichtbar machen
    });
}

// Elemente referenzieren
const popup = document.getElementById("popup");
const openPopupBtn = document.getElementById("open-popup");
const closePopupBtn = document.getElementById("close-popup");

// Überprüfen, ob der Benutzer die Seite schon besucht hat
const firstVisitPopup = document.getElementById("first-visit-popup");
const closeFirstVisitPopupBtn = document.getElementById("close-first-visit-popup");

// Prüfen, ob ein Eintrag im localStorage existiert
if (!localStorage.getItem("firstVisitDone")) {
    // Wenn kein Eintrag existiert, wird das Pop-up angezeigt
    firstVisitPopup.style.display = "block";

    // Sobald der Benutzer das Pop-up schließt, speichern wir im localStorage, dass er die Seite schon besucht hat
    closeFirstVisitPopupBtn.addEventListener("click", () => {
        firstVisitPopup.style.display = "none";
        localStorage.setItem("firstVisitDone", "true"); // Speichern des Besuchs
    });

    // Schließen des Pop-ups, wenn der Benutzer außerhalb klickt
    window.addEventListener("click", (event) => {
        if (event.target === firstVisitPopup) {
            firstVisitPopup.style.display = "none";
            localStorage.setItem("firstVisitDone", "true"); // Speichern des Besuchs
        }
    });
}


// 50:50 Joker einmalig
document.getElementById('fifty-fifty').addEventListener('click', () => {
    if (fiftyFiftyUsed) return;
    fiftyFiftyUsed = true;

    const correctAnswerButton = Array.from(document.querySelectorAll('.answer')).find(button => button.dataset.correct === 'true');
    let incorrectAnswers = Array.from(document.querySelectorAll('.answer')).filter(button => button.dataset.correct === 'false');

    // Nur zwei falsche Antworten entfernen
    if (incorrectAnswers.length > 1) {
        incorrectAnswers = incorrectAnswers.sort(() => 0.5 - Math.random()).slice(0, 2);
        incorrectAnswers.forEach(button => button.style.display = 'none');
    }

    // Den 50:50 Button deaktivieren
    document.getElementById('fifty-fifty').disabled = true;
});

// Reset-Button zum Zurücksetzen der benutzten Fragen
document.getElementById('reset-questions').addEventListener('click', () => {
    localStorage.removeItem('usedQuestions');
    usedQuestions = [];
    location.reload();
    alert('Benutzte Fragen wurden zurückgesetzt. Alle Fragen sind wieder verfügbar.');
});

loadQuestion();

// Made by Leopold weiterleitung
document.getElementById("made-by-button").addEventListener("click", function() {
    window.open("https://github.com/MadebyLeopold", "_blank"); // Öffnet die Seite in einem neuen Tab
});