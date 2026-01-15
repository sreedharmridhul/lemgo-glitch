// 1. Identify which part of the hunt the user just scanned
const urlParams = new URLSearchParams(window.location.search);
const scannedPart = urlParams.get('part'); // Looks for ?part=1 in the URL

// 2. Load existing progress from the phone's memory
let savedProgress = JSON.parse(localStorage.getItem('locali_vibe')) || [];

// 3. If they scanned a new part, add it to their collection
if (scannedPart && !savedProgress.includes(scannedPart)) {
    savedProgress.push(scannedPart);
    localStorage.setItem('locali_vibe', JSON.stringify(savedProgress));
}

// 4. Update the Screen to show what they've found
function updateScreen() {
    const statusText = document.getElementById('status-text');
    const actionBtn = document.getElementById('action-btn');
    
    // Light up the squares (fragments)
    savedProgress.forEach(partNumber => {
        const element = document.getElementById(`frag-${partNumber}`);
        if (element) element.classList.add('active');
    });

    // Change instructions based on progress
    if (savedProgress.length === 0) {
        statusText.innerText = "Scan your first QR code in Lemgo to begin.";
    } else if (savedProgress.length === 1) {
        statusText.innerText = "Part 1 Found! Head to the Rathaus for Part 2.";
    } else if (savedProgress.length === 2) {
        statusText.innerText = "Almost there! Visit the Partner Cafe for the final piece.";
    } else if (savedProgress.length >= 3) {
        // SHOW SUCCESS SCREEN
        document.getElementById('content-area').classList.add('hidden');
        document.getElementById('success-screen').classList.remove('hidden');
        statusText.innerText = "SYSTEM RESTORED";
    }
}

// Run the function immediately when the page opens
updateScreen();
