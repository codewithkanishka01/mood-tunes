/* ══════════════════════════════════════════
   tunes.js — MoodTunes JavaScript
   Linked from tunes.html (before </body>)
   Styles live in tunes.css
══════════════════════════════════════════ */

'use strict';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. PAGE ROUTER
   ─────────────────────────────────────────
   CONCEPT: Single-Page Application (SPA)
   All pages exist in the HTML at once but are
   hidden (display:none). The go() function
   instantly swaps which one is visible.

   WHY requestAnimationFrame (rAF)?
   CSS transitions don't fire on display:none
   elements. When we set display:block, the
   browser needs at least one paint cycle before
   it can start a CSS animation on that element.
   Double-rAF guarantees two full paint frames
   have passed before we add .page-enter, so the
   @keyframes animation in CSS always fires.

   STEPS inside go(name):
   1. Remove .active from current page  → display:none
   2. Scroll window to top instantly    → no smooth scroll
   3. Add .active to target page        → display:block
   4. Double-rAF → add .page-enter     → animation fires
   5. Update nav button highlight       → visual feedback
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ALL_PAGES = [
  'home','moods','login','signup',
  'happy','sad','relaxed','energetic','romantic','focus',
  'profile','explore','charts','settings','favourites'
];

let currentPage = null;

function go(name) {
  /* Step 1 — hide previous page */
  if (currentPage) {
    const prev = document.getElementById('page-' + currentPage);
    if (prev) prev.classList.remove('active', 'page-enter');
  }

  /* Step 2 — instant scroll to top (not smooth) */
  window.scrollTo(0, 0);

  /* Step 3 — show new page */
  const next = document.getElementById('page-' + name);
  if (!next) return;
  next.classList.add('active');
  next.classList.remove('page-enter'); // reset if revisiting

  /* Step 4 — double rAF so CSS animation fires after paint */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      next.classList.add('page-enter');
    });
  });

  currentPage = name;

  /* Step 5 — highlight correct nav button */
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('nav-active'));
  const nb = document.getElementById('nb-' + name);
  if (nb) nb.classList.add('nav-active');
}

/* Boot: show home page as soon as HTML is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => go('home'));
} else {
  go('home');
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. TOAST NOTIFICATION
   ─────────────────────────────────────────
   CONCEPT: CSS class toggling + setTimeout

   CSS keeps toast off-screen with transform.
   Adding .show slides it in (CSS transition).
   setTimeout removes .show after 2.6 seconds.
   clearTimeout cancels any previous timer so
   rapid calls don't queue up wrong timings.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let toastTimer;

function toast(msg) {
  clearTimeout(toastTimer);                                    // cancel any queued hide
  document.getElementById('tmsg').textContent = msg;          // set message text
  document.getElementById('toast').classList.add('show');     // slide in (CSS transition)
  toastTimer = setTimeout(() => {
    document.getElementById('toast').classList.remove('show'); // slide out after 2.6s
  }, 2600);
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. NOW PLAYING BAR
   ─────────────────────────────────────────
   CONCEPT: setInterval + DOM updates

   play() starts the music player UI:
   - Parses duration string "3:24" → seconds
   - Updates DOM elements (title, artist, disc)
   - Adds .show to slide the bar up from bottom
   - Adds .playing so CSS spins the disc
   - Starts setInterval which ticks every 1000ms
     to advance elapsed time and update the bar

   fmt(s) converts seconds to "m:ss" display.
   seekBar() calculates where user clicked on
   the bar as a percentage and jumps elapsed.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let isPlaying = false;
let elapsed   = 0;
let total     = 210;    // seconds
let ticker    = null;   // setInterval reference

/* Convert seconds → "m:ss" string */
const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

function play(title, artist, emoji, dur) {
  /* Parse "3:24" → total seconds */
  const [m, s] = dur.split(':').map(Number);
  total   = m * 60 + s;
  elapsed = 0;

  /* Update DOM */
  document.getElementById('npTitle').textContent   = title;
  document.getElementById('npArtist').textContent  = artist;
  document.getElementById('npDisc').textContent    = emoji;
  document.getElementById('npTotal').textContent   = dur;
  document.getElementById('npFill').style.width    = '0%';
  document.getElementById('npElapsed').textContent = '0:00';
  document.getElementById('npBtn').textContent     = '⏸';

  /* Show bar + spin disc */
  const bar = document.getElementById('npbar');
  bar.classList.add('show', 'playing');
  isPlaying = true;

  /* Start tick — clear any old one first */
  clearInterval(ticker);
  ticker = setInterval(() => {
    if (!isPlaying) return;
    elapsed++;
    if (elapsed >= total) elapsed = 0;       // loop back
    document.getElementById('npFill').style.width    = `${(elapsed / total) * 100}%`;
    document.getElementById('npElapsed').textContent = fmt(elapsed);
  }, 1000);

  toast('🎵 Now playing: ' + title);
}

function togglePlay() {
  isPlaying = !isPlaying;
  document.getElementById('npBtn').textContent = isPlaying ? '⏸' : '▶';
  document.getElementById('npbar').classList.toggle('playing', isPlaying);
}

/* User clicks on the progress bar to seek */
function seekBar(e, el) {
  const rect   = el.getBoundingClientRect();           // bar's position on screen
  const pct    = (e.clientX - rect.left) / rect.width; // 0.0 → 1.0
  elapsed      = Math.floor(pct * total);
  document.getElementById('npFill').style.width    = `${pct * 100}%`;
  document.getElementById('npElapsed').textContent = fmt(elapsed);
}

function closePlayer() {
  clearInterval(ticker);
  document.getElementById('npbar').classList.remove('show', 'playing');
  isPlaying = false;
}

function prevTrack() { elapsed = 0; toast('⏮ Restarted current song'); }
function nextTrack() { elapsed = 0; toast('⏭ Next — connect backend for real queue!'); }


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. FAVOURITES
   ─────────────────────────────────────────
   CONCEPT: Map data structure + dynamic DOM

   favMap stores songs: key = title (string),
   value = { title, artist, emoji, dur }.
   Map is used (not array) because:
     - Fast lookup: favMap.has(title)
     - Easy delete: favMap.delete(title)
     - Preserves insertion order for display

   fav(btn, ...) toggles a song in/out of favMap
   and calls renderFavList() to rebuild the DOM.

   renderFavList() clears old .song-row elements
   and rebuilds them from favMap using
   createElement + innerHTML.

   removeFav() is called from inside the
   Favourites page to delete a song and also
   unheart any matching button in playlists.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const favMap = new Map();  // Map<title, {title,artist,emoji,dur}>

function fav(btn, title, artist, emoji, dur) {
  btn.classList.toggle('on');
  const isOn = btn.classList.contains('on');
  btn.textContent = isOn ? '♥' : '♡';

  if (isOn) {
    favMap.set(title, { title, artist, emoji, dur });
    toast('❤️ Added to favourites: ' + title);
  } else {
    favMap.delete(title);
    toast('🤍 Removed from favourites');
  }
  renderFavList();
}

function renderFavList() {
  const list  = document.getElementById('favList');
  const empty = document.getElementById('favEmpty');

  /* Remove previously generated rows */
  list.querySelectorAll('.song-row').forEach(r => r.remove());

  if (favMap.size === 0) {
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  let i = 1;
  favMap.forEach(({ title, artist, emoji, dur }) => {
    const row = document.createElement('div');
    row.className = 'song-row';
    row.onclick   = () => play(title, artist, emoji, dur);
    row.innerHTML = `
      <div class="sn">${i++}</div>
      <div class="splay">▶</div>
      <div class="sthumb" style="background:linear-gradient(135deg,var(--violet),var(--pink))">${emoji}</div>
      <div class="sinfo">
        <div class="st">${title}</div>
        <div class="sa">${artist}</div>
      </div>
      <span class="sgenre">Fav</span>
      <div class="sdur">${dur}</div>
      <button class="fav-btn on"
        onclick="event.stopPropagation();removeFav(this,'${title.replace(/'/g,"\\'")}')">♥</button>
    `;
    list.appendChild(row);
  });
}

function removeFav(btn, title) {
  favMap.delete(title);

  /* Also unheart the same song in playlist pages */
  document.querySelectorAll('.fav-btn.on').forEach(b => {
    const row = b.closest('.song-row');
    if (row && row.querySelector('.st')?.textContent === title) {
      b.classList.remove('on');
      b.textContent = '♡';
    }
  });

  toast('🤍 Removed: ' + title);
  renderFavList();
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. MOOD SEARCH FILTER
   ─────────────────────────────────────────
   CONCEPT: oninput event + show/hide loop

   Fires on every keystroke via oninput in HTML.
   Reads data-name attribute on each .mood-card
   and hides cards that don't match the query.
   Empty query → shows all cards.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function filterMoods(q) {
  const lq = q.toLowerCase().trim();
  document.querySelectorAll('#moodGrid .mood-card').forEach(card => {
    const match = !lq || (card.dataset.name || '').includes(lq);
    card.style.display = match ? '' : 'none';
  });
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   6. EXPLORE FILTER
   ─────────────────────────────────────────
   CONCEPT: Multiple filters combining

   Two filters run together on every change:
   1. Genre button clicked  → sets activeGenre
   2. Text search input     → filterExplore(q)

   Both must pass for a card to show:
     genreOk = genre matches OR "all" selected
     nameOk  = search query found in data-n

   setFilter() updates the active button style
   and triggers a re-filter.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let activeGenre = 'all';

function setFilter(genre, btn) {
  activeGenre = genre;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  filterExplore(document.getElementById('exQ').value);
}

function filterExplore(q) {
  const lq = q.toLowerCase().trim();
  document.querySelectorAll('#exGrid .explore-card').forEach(card => {
    const genreOk = activeGenre === 'all' || card.dataset.g === activeGenre;
    const nameOk  = !lq || (card.dataset.n || '').includes(lq);
    card.style.display = (genreOk && nameOk) ? '' : 'none';
  });
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   7. SETTINGS PANEL SWITCHER
   ─────────────────────────────────────────
   CONCEPT: Show one, hide all others

   S_PANELS lists all settings section IDs.
   switchS() hides every panel, then shows only
   the target one. Updates .on on nav items.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const S_PANELS = ['account', 'appear', 'audio', 'notifs', 'privacy'];

function switchS(id, el) {
  S_PANELS.forEach(k => {
    const p = document.getElementById('sp-' + k);
    if (p) p.style.display = 'none';
  });
  const target = document.getElementById('sp-' + id);
  if (target) target.style.display = 'block';

  document.querySelectorAll('.s-nav-item').forEach(i => i.classList.remove('on'));
  el.classList.add('on');
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   8. ACCENT COLOUR PICKER
   ─────────────────────────────────────────
   CONCEPT: Live CSS variable update via JS

   document.documentElement = the <html> tag.
   setProperty() changes a CSS variable on it,
   which instantly updates every element that
   uses that variable (var(--violet)) in CSS.

   This means one JS call recolours the entire
   site — nav glow, toggles, player bar, etc.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function setAccent(col, el) {
  document.documentElement.style.setProperty('--violet', col);
  document.querySelectorAll('.theme-opt').forEach(o => o.classList.remove('on'));
  el.classList.add('on');
  toast('🎨 Accent colour updated!');
}