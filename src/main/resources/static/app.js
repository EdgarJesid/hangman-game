const API = 'http://localhost:8080';
let stompClient = null;
let currentRoom = null;

const letras = 'abcdefghijklmnñopqrstuvwxyz';

function conectar(roomId) {
    const socket = new SockJS(`${API}/hangman-websocket`);
    stompClient = Stomp.over(socket);
    stompClient.debug = null;

    stompClient.connect({}, () => {
        stompClient.subscribe(`/topic/game/${roomId}`, (message) => {
            const state = JSON.parse(message.body);
            updateUI(state);
        });
    });
}

function createGame() {
    const roomId = document.getElementById('roomId').value.trim();
    if (!roomId) return alert('Escribe un código de sala');
    currentRoom = roomId;

    fetch(`${API}/api/game/${roomId}/create`)
        .then(res => res.json())
        .then(state => {
            conectar(roomId);
            showGame(state);
        });
}

function joinGame() {
    const roomId = document.getElementById('roomId').value.trim();
    if (!roomId) return alert('Escribe un código de sala');
    currentRoom = roomId;

    fetch(`${API}/api/game/${roomId}`)
        .then(res => res.json())
        .then(state => {
            if (!state) return alert('Sala no encontrada');
            conectar(roomId);
            showGame(state);
        });
}

function showGame(state) {
    document.getElementById('roomSection').style.display = 'none';
    document.getElementById('gameSection').style.display = 'block';
    buildKeyboard();
    updateUI(state);
}

function buildKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    for (const letra of letras) {
        const btn = document.createElement('button');
        btn.className = 'key';
        btn.textContent = letra;
        btn.onclick = () => sendGuess(letra);
        btn.id = `key-${letra}`;
        keyboard.appendChild(btn);
    }
}

function sendGuess(letra) {
    if (!stompClient || !currentRoom) return;
    stompClient.send(`/app/game/${currentRoom}/guess`, {}, letra);
    document.getElementById(`key-${letra}`).disabled = true;
}

function updateUI(state) {
    document.getElementById('maskedWord').textContent = state.maskedWord;
    document.getElementById('attempts').textContent = state.remainingAttempts;

    const letrasUsadas = state.guessedLetters.length > 0
        ? state.guessedLetters.join(', ')
        : '—';
    document.getElementById('guessedLetters').textContent = letrasUsadas;

    drawHangman(6 - state.remainingAttempts);

    if (state.status === 'won') {
        showStatus('¡Ganaron! La palabra era: ' + state.word, false);
    } else if (state.status === 'lost') {
        showStatus('¡Perdieron! La palabra era: ' + state.word, true);
    }
}

function showStatus(message, isLost) {
    const banner = document.getElementById('statusBanner');
    banner.style.display = 'block';
    banner.className = 'status-banner' + (isLost ? ' lost' : '');
    document.getElementById('statusMessage').textContent = message;
}

function resetGame() {
    document.getElementById('roomSection').style.display = 'block';
    document.getElementById('gameSection').style.display = 'none';
    document.getElementById('statusBanner').style.display = 'none';
    document.getElementById('roomId').value = '';
    currentRoom = null;
    if (stompClient) stompClient.disconnect();
}

function drawHangman(errors) {
    const canvas = document.getElementById('hangmanCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    // Base
    ctx.beginPath();
    ctx.moveTo(20, 190); ctx.lineTo(180, 190);
    ctx.moveTo(60, 190); ctx.lineTo(60, 20);
    ctx.moveTo(60, 20);  ctx.lineTo(130, 20);
    ctx.moveTo(130, 20); ctx.lineTo(130, 40);
    ctx.stroke();

    if (errors >= 1) { // Cabeza
        ctx.beginPath();
        ctx.arc(130, 55, 15, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (errors >= 2) { // Cuerpo
        ctx.beginPath();
        ctx.moveTo(130, 70); ctx.lineTo(130, 120);
        ctx.stroke();
    }
    if (errors >= 3) { // Brazo izquierdo
        ctx.beginPath();
        ctx.moveTo(130, 80); ctx.lineTo(105, 105);
        ctx.stroke();
    }
    if (errors >= 4) { // Brazo derecho
        ctx.beginPath();
        ctx.moveTo(130, 80); ctx.lineTo(155, 105);
        ctx.stroke();
    }
    if (errors >= 5) { // Pierna izquierda
        ctx.beginPath();
        ctx.moveTo(130, 120); ctx.lineTo(105, 150);
        ctx.stroke();
    }
    if (errors >= 6) { // Pierna derecha
        ctx.beginPath();
        ctx.moveTo(130, 120); ctx.lineTo(155, 150);
        ctx.stroke();
    }
}