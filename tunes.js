/* ══════════════════════════════════════════
   tunes.js — Clean External Streaming v6
   Linked from index.html / tunes.html
   Styles live in tunes.css
 ══════════════════════════════════════════ */

'use strict';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   0. SONGS DATABASE
   18 tracks — 3 per mood — using verified
   external streaming URLs.
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const L1 = "https://upload.wikimedia.org/wikipedia/commons/2/21/Suhani_Raat_Dhal_Chuki_instrumental.mp3";
const L2 = "https://upload.wikimedia.org/wikipedia/commons/b/bb/Toreador_Song_remix.mp3";
const L3 = "https://upload.wikimedia.org/wikipedia/commons/c/c8/Example.mp3";
const L4 = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ludwig_van_Beethoven_-_Symphony_No._5_in_C_minor%2C_Op._67_-_I._Allegro_con_brio.mp3";
const L5 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const L6 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

const MOOD_META = {
  happy:     { emoji: '😊', label: 'Happy',     grad: 'linear-gradient(145deg,#ff9a3c,#ff4d6d)', desc: 'Uplifting tunes to brighten your day',        badgeBg: 'rgba(255,154,60,.25)',  badgeBdr: 'rgba(255,154,60,.5)',  badgeText: '#ffb87a' },
  sad:       { emoji: '😢', label: 'Sad',       grad: 'linear-gradient(145deg,#00b4d8,#0077b6)', desc: 'Emotional music to feel understood',          badgeBg: 'rgba(0,180,216,.2)',    badgeBdr: 'rgba(0,180,216,.5)',   badgeText: '#80d4f0' },
  relaxed:   { emoji: '😌', label: 'Relaxed',   grad: 'linear-gradient(145deg,#06d6a0,#118ab2)', desc: 'Peaceful sounds to calm your mind',           badgeBg: 'rgba(6,214,160,.22)',   badgeBdr: 'rgba(6,214,160,.5)',   badgeText: '#6effd8' },
  energetic: { emoji: '⚡', label: 'Energetic', grad: 'linear-gradient(145deg,#ffbe0b,#fb5607)', desc: 'High-tempo beats to fuel your fire',          badgeBg: 'rgba(255,190,11,.22)',  badgeBdr: 'rgba(255,190,11,.5)',  badgeText: '#ffe066' },
  romantic:  { emoji: '💕', label: 'Romantic',  grad: 'linear-gradient(145deg,#f72585,#b5179e)', desc: 'Love songs for tender moments',               badgeBg: 'rgba(247,37,133,.2)',   badgeBdr: 'rgba(247,37,133,.5)',  badgeText: '#ff87c0' },
  focus:     { emoji: '🎯', label: 'Focus',     grad: 'linear-gradient(145deg,#7b2ff7,#3a0ca3)', desc: 'Deep work music for the zone',                badgeBg: 'rgba(123,47,247,.25)',  badgeBdr: 'rgba(123,47,247,.5)',  badgeText: '#c4a6ff' }
};

const SONGS_DATABASE = [
  /* ───────── 😊 HAPPY ───────── */
  { id: 1, title: "Suhani Raat (Instrumental)", artist: "Mohammad Rafi", emoji: "🎺", duration: "3:15", genre: "Bollywood", mood: "happy", plays: 15200, url: L1 },
  { id: 2, title: "Toreador Song Remix", artist: "Bizet", emoji: "🕺", duration: "2:54", genre: "Pop", mood: "happy", plays: 14100, url: L2 },
  { id: 3, title: "Uptown Funk", artist: "Bruno Mars", emoji: "🕺", duration: "4:30", genre: "Pop", mood: "happy", plays: 12870, url: L5 },

  /* ───────── 😢 SAD ───────── */
  { id: 4, title: "Channa Mereya", artist: "Arijit Singh", emoji: "💔", duration: "4:49", genre: "Bollywood", mood: "sad", plays: 14680, url: L1 },
  { id: 5, title: "Someone Like You", artist: "Adele", emoji: "🌧️", duration: "4:45", genre: "Pop", mood: "sad", plays: 13210, url: L3 },
  { id: 6, title: "Lovely", artist: "Billie Eilish ft. Khalid", emoji: "😔", duration: "3:20", genre: "Indie", mood: "sad", plays: 11390, url: L6 },

  /* ───────── 😌 RELAXED ───────── */
  { id: 7, title: "Iktara", artist: "Kavita Seth", emoji: "🎸", duration: "4:12", genre: "Bollywood", mood: "relaxed", plays: 12210, url: L3 },
  { id: 8, title: "Sunset Lover", artist: "Petit Biscuit", emoji: "🌅", duration: "3:57", genre: "Lo-fi", mood: "relaxed", plays: 9370, url: L6 },
  { id: 9, title: "Symphony No. 5", artist: "Ludwig van Beethoven", emoji: "🎼", duration: "7:02", genre: "Classical", mood: "relaxed", plays: 10630, url: L4 },

  /* ───────── ⚡ ENERGETIC ───────── */
  { id: 10, title: "Toreador Dance Remix", artist: "Bizet", emoji: "💥", duration: "2:54", genre: "EDM", mood: "energetic", plays: 13110, url: L2 },
  { id: 11, title: "Blinding Lights", artist: "The Weeknd", emoji: "💥", duration: "3:20", genre: "Pop", mood: "energetic", plays: 15980, url: L5 },
  { id: 12, title: "Apna Time Aayega", artist: "Ranveer Singh", emoji: "🎤", duration: "3:24", genre: "Desi Hip-Hop", mood: "energetic", plays: 14320, url: L6 },

  /* ───────── 💕 ROMANTIC ───────── */
  { id: 13, title: "Tum Hi Ho", artist: "Arijit Singh", emoji: "🌹", duration: "4:22", genre: "Bollywood", mood: "romantic", plays: 15010, url: L1 },
  { id: 14, title: "Perfect", artist: "Ed Sheeran", emoji: "💍", duration: "4:23", genre: "Pop", mood: "romantic", plays: 16240, url: L3 },
  { id: 15, title: "Kesariya", artist: "Arijit Singh", emoji: "🍁", duration: "4:28", genre: "Bollywood", mood: "romantic", plays: 11090, url: L5 },

  /* ───────── 🎯 FOCUS ───────── */
  { id: 16, title: "Symphony No. 5 (Focus Edit)", artist: "Ludwig van Beethoven", emoji: "⏳", duration: "7:02", genre: "Classical", mood: "focus", plays: 12760, url: L4 },
  { id: 17, title: "Time", artist: "Hans Zimmer", emoji: "⏳", duration: "4:35", genre: "Ambient", mood: "focus", plays: 9160, url: L5 },
  { id: 18, title: "River Flows in You", artist: "Yiruma", emoji: "🎹", duration: "3:08", genre: "Instrumental", mood: "focus", plays: 11340, url: L4 }
];

const GENRE_FILTER_MAP = {
  'Pop': 'pop',
  'Bollywood': 'bollywood',
  'Sufi': 'sufi',
  'Desi Hip-Hop': 'hiphop',
  'EDM': 'edm',
  'Lo-fi': 'lofi',
  'Ambient': 'ambient', 'Instrumental': 'ambient',
  'Indie': 'indie',
  'Classical': 'classical'
};
const normGenre = g => GENRE_FILTER_MAP[g] || g.toLowerCase().replace(/[^a-z]/g, '');


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. PAGE ROUTER
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let currentPage = null;
const MOOD_NAMES = Object.keys(MOOD_META);

function go(name) {
  if (currentPage) {
    const prev = document.getElementById('page-' + currentPage);
    if (prev) prev.classList.remove('active', 'page-enter');
  }

  document.querySelector('.content-viewport')?.scrollTo(0, 0);

  const next = document.getElementById('page-' + name);
  if (!next) return;
  next.classList.add('active');

  if (MOOD_NAMES.includes(name)) {
    loadPlaylist(name);
  } else if (name === 'explore') {
    renderExplore();
  } else if (name === 'charts') {
    renderCharts();
  } else if (name === 'profile') {
    renderProfile();
  } else if (name === 'favourites') {
    renderFavList();
  }

  next.classList.remove('page-enter');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      next.classList.add('page-enter');
    });
  });

  currentPage = name;

  document.querySelectorAll('.sidebar-links button, .mobile-nav button').forEach(b => b.classList.remove('nav-active'));
  const sb = document.getElementById('sb-' + name);
  if (sb) sb.classList.add('nav-active');
  const mb = document.getElementById('mb-' + name);
  if (mb) mb.classList.add('nav-active');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

function boot() {
  const savedAccent = localStorage.getItem('mt-accent');
  if (savedAccent) {
    document.documentElement.style.setProperty('--violet', savedAccent);
    document.querySelectorAll('.theme-opt').forEach(o => {
      o.classList.toggle('on', o.dataset.accent === savedAccent);
    });
  }
  updateMoodPillCounts();
  initAudio();
  renderSidebarFavs();
  go('home');
}

function updateMoodPillCounts() {
  document.querySelectorAll('[data-mood]').forEach(card => {
    const mood = card.dataset.mood;
    const count = SONGS_DATABASE.filter(s => s.mood === mood).length;
    const pill = card.querySelector('.mood-pill');
    if (pill) pill.textContent = `${count} songs`;
  });
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. TOAST NOTIFICATION
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let toastTimer;
function toast(msg) {
  clearTimeout(toastTimer);
  document.getElementById('tmsg').textContent = msg;
  document.getElementById('toast').classList.add('show');
  toastTimer = setTimeout(() => {
    document.getElementById('toast').classList.remove('show');
  }, 2600);
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. NOW PLAYING BAR (HTML5 AUDIO REGISTRATION)
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let isPlaying   = false;
let elapsed     = 0;
let total       = 0;
let ticker      = null;
let currentVolume = 0.8;
let currentSong = null;
let currentAudio = null;

let currentQueue = SONGS_DATABASE.slice();
let currentIndex = -1;

const fmt = s => {
  if (isNaN(s)) return '0:00';
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

function initAudio() {
  currentAudio = document.getElementById('mainAudio');
  if (!currentAudio) return;

  currentAudio.volume = currentVolume;

  currentAudio.addEventListener('loadedmetadata', () => {
    total = currentAudio.duration;
    document.getElementById('npTotal').textContent = fmt(total);
  });

  currentAudio.addEventListener('timeupdate', () => {
    elapsed = currentAudio.currentTime;
    updateProgressBar();
  });

  currentAudio.addEventListener('ended', () => {
    nextTrack();
  });

  currentAudio.addEventListener('error', () => {
    console.error("HTML5 Audio loading error:", currentAudio.error);
    toast("❌ This external song failed to load. Please try another one!");
    isPlaying = false;
    document.getElementById('npBtn').textContent = '▶';
    document.getElementById('npbar').classList.remove('playing');
  });
}

function playTrack(song, queue) {
  if (queue && queue.length) currentQueue = queue;
  currentIndex = currentQueue.findIndex(s => s.id === song.id);
  if (currentIndex === -1) { currentQueue = [song]; currentIndex = 0; }
  playSong(song);
  recordHistory(song);
}

function playSong(song) {
  clearInterval(ticker);

  if (currentAudio) {
    currentAudio.pause();
  }

  currentSong = song;
  isPlaying = true;
  elapsed = 0;

  document.getElementById('npTitle').textContent   = song.title;
  document.getElementById('npArtist').textContent  = song.artist;
  document.getElementById('npDisc').textContent    = song.emoji;
  document.getElementById('npFill').style.width    = '0%';
  document.getElementById('npElapsed').textContent = '0:00';
  document.getElementById('npBtn').textContent     = '⏸';
  if (MOOD_META[song.mood]) {
    document.getElementById('npDisc').style.background = MOOD_META[song.mood].grad;
  }

  const [m, s] = song.duration.split(':').map(Number);
  total = m * 60 + (s || 0);
  document.getElementById('npTotal').textContent = song.duration;

  if (currentAudio) {
    currentAudio.src = song.url;
    currentAudio.load();
    currentAudio.play().catch(err => {
      console.warn("Autoplay block or loading error:", err);
      toast("❌ This external song failed to load. Please try another one!");
      isPlaying = false;
      document.getElementById('npBtn').textContent = '▶';
      document.getElementById('npbar').classList.remove('playing');
    });
  }

  document.getElementById('npbar').classList.add('show', 'playing');
  toast('🎵 Now playing: ' + song.title);
}

function updateProgressBar() {
  if (total > 0) {
    document.getElementById('npFill').style.width = `${(elapsed / total) * 100}%`;
    document.getElementById('npElapsed').textContent = fmt(elapsed);
  }
}

function togglePlay() {
  isPlaying = !isPlaying;
  document.getElementById('npBtn').textContent = isPlaying ? '⏸' : '▶';
  document.getElementById('npbar').classList.toggle('playing', isPlaying);

  if (currentAudio) {
    if (isPlaying) {
      currentAudio.play().catch(e => {
        console.warn(e);
        toast("❌ This external song failed to load. Please try another one!");
        isPlaying = false;
        document.getElementById('npBtn').textContent = '▶';
        document.getElementById('npbar').classList.remove('playing');
      });
    } else {
      currentAudio.pause();
    }
  }
}

function seekBar(e, el) {
  const rect = el.getBoundingClientRect();
  const pct  = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  if (currentAudio && !isNaN(currentAudio.duration)) {
    currentAudio.currentTime = pct * currentAudio.duration;
  } else {
    elapsed    = Math.floor(pct * total);
    document.getElementById('npFill').style.width = `${pct * 100}%`;
    document.getElementById('npElapsed').textContent = fmt(elapsed);
  }
}

function changeVolume(val) {
  currentVolume = val / 100;
  if (currentAudio) {
    currentAudio.volume = currentVolume;
  }
}
function changeVolumeToast(val) {
  toast('🔊 Volume: ' + val + '%');
}

function closePlayer() {
  isPlaying = false;
  clearInterval(ticker);
  if (currentAudio) {
    currentAudio.pause();
  }
  document.getElementById('npbar').classList.remove('show', 'playing');
}

function nextTrack() {
  if (!currentQueue.length) { toast('⏭ No more songs in the queue!'); return; }
  currentIndex = (currentIndex + 1) % currentQueue.length;
  const song = currentQueue[currentIndex];
  playSong(song);
  recordHistory(song);
}

function prevTrack() {
  if (!currentQueue.length) {
    elapsed = 0;
    toast('⏮ Restarted current song');
    return;
  }
  currentIndex = (currentIndex - 1 + currentQueue.length) % currentQueue.length;
  const song = currentQueue[currentIndex];
  playSong(song);
  recordHistory(song);
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. FAVOURITES
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const favMap = new Map();

function toggleFav(song, btnEl) {
  const isOn = favMap.has(song.id);
  if (isOn) {
    favMap.delete(song.id);
    toast('🤍 Removed from favourites');
  } else {
    favMap.set(song.id, song);
    toast('❤️ Added to favourites: ' + song.title);
  }
  syncFavButtons(song.id, !isOn);
  renderSidebarFavs();
  if (currentPage === 'favourites') renderFavList();
  if (currentPage === 'profile') renderProfileStats();
}

function syncFavButtons(id, isOn) {
  document.querySelectorAll(`.fav-btn[data-song-id="${id}"]`).forEach(b => {
    b.classList.toggle('on', isOn);
    b.textContent = isOn ? '♥' : '♡';
  });
}

function renderFavList() {
  const list  = document.getElementById('favList');
  const empty = document.getElementById('favEmpty');
  if (!list) return;

  list.querySelectorAll('.song-row').forEach(r => r.remove());

  if (favMap.size === 0) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  const favSongs = Array.from(favMap.values());
  favSongs.forEach((song, i) => list.appendChild(buildSongRow(song, i + 1, favSongs)));
}

function renderSidebarFavs() {
  const list = document.getElementById('sidebarFavList');
  if (!list) return;
  list.innerHTML = '';

  if (favMap.size === 0) {
    list.innerHTML = `<div class="lib-empty">Heart some tracks to build your library!</div>`;
    return;
  }

  const favSongs = Array.from(favMap.values());
  favSongs.forEach(song => {
    const item = document.createElement('div');
    item.className = 'lib-item';
    item.onclick = () => playTrack(song, favSongs);
    item.innerHTML = `
      <div class="lib-thumb">${song.emoji}</div>
      <div class="lib-info">
        <div class="lib-title">${song.title}</div>
        <div class="lib-artist">${song.artist}</div>
      </div>
    `;
    list.appendChild(item);
  });
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHARED DOM COMPONENT BUILDERS
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildSongRow(song, displayIndex, queue) {
  const row = document.createElement('div');
  row.className = 'song-row';
  row.onclick = () => playTrack(song, queue);

  const isFav = favMap.has(song.id);
  row.innerHTML = `
    <div class="sn">${displayIndex}</div>
    <div class="splay">▶</div>
    <div class="sthumb" style="background:linear-gradient(135deg, var(--violet), var(--pink))">${song.emoji}</div>
    <div class="sinfo">
      <div class="st">${song.title}</div>
      <div class="sa">${song.artist}</div>
    </div>
    <span class="sgenre">${song.genre}</span>
    <div class="sdur">${song.duration}</div>
    <button class="fav-btn ${isFav ? 'on' : ''}" data-song-id="${song.id}">${isFav ? '♥' : '♡'}</button>
  `;
  row.querySelector('.fav-btn').onclick = (e) => {
    e.stopPropagation();
    toggleFav(song, e.currentTarget);
  };
  return row;
}

function buildExploreCard(song) {
  const card = document.createElement('div');
  card.className = 'explore-card';
  card.dataset.g = normGenre(song.genre);
  card.dataset.n = (song.title + ' ' + song.artist).toLowerCase();

  const isFav = favMap.has(song.id);
  const grad = MOOD_META[song.mood] ? MOOD_META[song.mood].grad : 'linear-gradient(145deg,#7b2ff7,#3a0ca3)';
  card.innerHTML = `
    <div class="ex-cover" style="background:${grad}">
      ${song.emoji}
      <button class="fav-btn ex-fav ${isFav ? 'on' : ''}" data-song-id="${song.id}">${isFav ? '♥' : '♡'}</button>
    </div>
    <div class="ex-body">
      <h4>${song.title}</h4>
      <p>${song.artist}</p>
      <span class="ex-tag">${song.genre}</span>
    </div>
  `;
  card.onclick = () => playTrack(song, SONGS_DATABASE);
  card.querySelector('.ex-fav').onclick = (e) => {
    e.stopPropagation();
    toggleFav(song, e.currentTarget);
  };
  return card;
}

const durationToSeconds = dur => {
  const [m, s] = dur.split(':').map(Number);
  return m * 60 + (s || 0);
};


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. MOOD SEARCH FILTER
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function filterMoods(q) {
  const lq = q.toLowerCase().trim();
  document.querySelectorAll('#moodGrid .mood-card').forEach(card => {
    const match = !lq || (card.dataset.name || '').includes(lq);
    card.style.display = match ? '' : 'none';
  });
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   6. EXPLORE PAGE
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let activeGenre = 'all';
let exploreRendered = false;

function renderExplore() {
  const grid = document.getElementById('exGrid');
  if (!grid) return;
  grid.innerHTML = '';
  SONGS_DATABASE.forEach(song => grid.appendChild(buildExploreCard(song)));
  exploreRendered = true;
  filterExplore(document.getElementById('exQ')?.value || '');
}

function setFilter(genre, btn) {
  activeGenre = genre;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  filterExplore(document.getElementById('exQ').value);
}

function filterExplore(q) {
  if (!exploreRendered) renderExplore();
  const lq = q.toLowerCase().trim();
  let visible = 0;
  document.querySelectorAll('#exGrid .explore-card').forEach(card => {
    const genreOk = activeGenre === 'all' || card.dataset.g === activeGenre;
    const nameOk  = !lq || (card.dataset.n || '').includes(lq);
    const show = genreOk && nameOk;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  let emptyMsg = document.getElementById('exEmpty');
  if (visible === 0) {
    if (!emptyMsg) {
      emptyMsg = document.createElement('div');
      emptyMsg.id = 'exEmpty';
      emptyMsg.className = 'explore-empty';
      emptyMsg.innerHTML = `🔍 No songs match "${q || 'this filter'}" — try another search or genre.`;
      document.getElementById('exGrid').appendChild(emptyMsg);
    }
  } else if (emptyMsg) {
    emptyMsg.remove();
  }
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   7. SETTINGS PANEL SWITCHER
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
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function setAccent(col, el) {
  document.documentElement.style.setProperty('--violet', col);
  document.querySelectorAll('.theme-opt').forEach(o => o.classList.remove('on'));
  el.classList.add('on');
  localStorage.setItem('mt-accent', col);
  toast('🎨 Accent colour updated!');
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   9. DYNAMIC PLAYLIST RENDERER
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function loadPlaylist(moodName) {
  const filteredSongs = SONGS_DATABASE.filter(song => song.mood === moodName);
  const listContainer = document.getElementById(`${moodName}-song-list`);
  if (!listContainer) return;

  listContainer.innerHTML = '';

  if (filteredSongs.length === 0) {
    listContainer.innerHTML = `<p style="color:var(--muted); padding:1rem;">No songs found for this mood.</p>`;
    return;
  }

  filteredSongs.forEach((song, index) => {
    listContainer.appendChild(buildSongRow(song, index + 1, filteredSongs));
  });

  const totalSeconds = filteredSongs.reduce((sum, s) => sum + durationToSeconds(s.duration), 0);
  const countEl = document.querySelector(`#page-${moodName} .pl-count`);
  if (countEl) countEl.textContent = `${filteredSongs.length} songs · ${Math.round(totalSeconds / 60)} min`;
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   10. TRENDING CHARTS
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function formatPlays(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(n);
}

function trendMarkup(song) {
  const mod = song.id % 4;
  if (mod === 0) return `<div class="tu">▲${(song.id % 5) + 1}</div>`;
  if (mod === 1) return `<div class="td">▼${(song.id % 3) + 1}</div>`;
  if (mod === 2) return `<div class="tu">🆕</div>`;
  return `<div class="tn">—</div>`;
}

function renderCharts() {
  const top10 = [...SONGS_DATABASE].sort((a, b) => b.plays - a.plays).slice(0, 10);

  const list = document.getElementById('chartList');
  if (list) {
    list.innerHTML = '';
    top10.forEach((song, i) => {
      const rank = i + 1;
      const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
      const grad = MOOD_META[song.mood] ? MOOD_META[song.mood].grad : 'linear-gradient(135deg,#7b2ff7,#3a0ca3)';
      const row = document.createElement('div');
      row.className = 'chart-row';
      row.onclick = () => playTrack(song, top10);
      row.innerHTML = `
        <div class="c-rank ${rankClass}">${rank}</div>
        <div class="c-thumb" style="background:${grad}">${song.emoji}</div>
        <div class="c-info"><div class="ct">${song.title}</div><div class="ca">${song.artist}</div></div>
        <div class="c-plays">${formatPlays(song.plays)}</div>
        ${trendMarkup(song)}
      `;
      list.appendChild(row);
    });
  }

  const moodTotals = {};
  SONGS_DATABASE.forEach(s => { moodTotals[s.mood] = (moodTotals[s.mood] || 0) + s.plays; });
  renderBarList('moodPopList', moodTotals, key => MOOD_META[key]?.label || key);

  const genreTotals = {};
  SONGS_DATABASE.forEach(s => { genreTotals[s.genre] = (genreTotals[s.genre] || 0) + s.plays; });
  renderBarList('genrePopList', genreTotals, key => key, true);
}

function renderBarList(containerId, counts, labelFor, hidePct) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const max = entries.length ? entries[0][1] : 1;
  const cls = ['bf1', 'bf2', 'bf3'];
  el.innerHTML = entries.map(([key, val], i) => {
    const pct = Math.round((val / max) * 100);
    return `
      <div class="bar-row">
        <span class="bar-lbl">${labelFor(key)}</span>
        <div class="bar-track"><div class="bar-fill ${cls[i % 3]}" style="width:${pct}%"></div></div>
        ${hidePct ? '' : `<span class="bar-pct">${pct}%</span>`}
      </div>`;
  }).join('');
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   11. PROFILE
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let playHistory = [];
let totalPlaysCount = 0;
const exploredMoodsSet = new Set();
const sessionMoodCounts = {};

function recordHistory(song) {
  totalPlaysCount++;
  exploredMoodsSet.add(song.mood);
  sessionMoodCounts[song.mood] = (sessionMoodCounts[song.mood] || 0) + 1;

  playHistory.unshift({ ...song, playedAt: Date.now() });
  if (playHistory.length > 30) playHistory.pop();

  if (currentPage === 'profile') renderProfile();
}

function fmtTimeAgo(ts) {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1)  return 'Just now';
  if (mins < 60) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

function renderProfile() {
  renderRecentHistory();
  renderProfileStats();
  renderMoodHistory();
}

function renderRecentHistory() {
  const list = document.getElementById('recentHistoryList');
  if (!list) return;

  if (playHistory.length === 0) {
    list.innerHTML = `<div class="h-empty">🎧 No listening history yet this session — play a song and it'll show up here!</div>`;
    return;
  }

  list.innerHTML = '';
  playHistory.slice(0, 6).forEach(entry => {
    const item = document.createElement('div');
    item.className = 'h-item';
    const grad = MOOD_META[entry.mood] ? MOOD_META[entry.mood].grad : 'linear-gradient(135deg,#7b2ff7,#3a0ca3)';
    const isFav = favMap.has(entry.id);
    item.innerHTML = `
      <div class="h-icon" style="background:${grad}">${entry.emoji}</div>
      <div><div class="h-t">${entry.title}</div><div class="h-a">${entry.artist} · ${fmtTimeAgo(entry.playedAt)}</div></div>
      <button class="fav-btn ${isFav ? 'on' : ''}" data-song-id="${entry.id}">${isFav ? '♥' : '♡'}</button>
    `;
    item.querySelector('.fav-btn').onclick = () => toggleFav(entry, item.querySelector('.fav-btn'));
    list.appendChild(item);
  });
}

function renderProfileStats() {
  const songsEl = document.getElementById('statSongsPlayed');
  const favsEl  = document.getElementById('statFavourites');
  const moodsEl = document.getElementById('statMoodsExplored');
  if (songsEl) songsEl.textContent = 142 + totalPlaysCount;
  if (favsEl)  favsEl.textContent  = favMap.size;
  if (moodsEl) moodsEl.textContent = Math.max(exploredMoodsSet.size, 0) + '/6';
}

function renderMoodHistory() {
  const badgeWrap = document.getElementById('moodHistoryBadges');
  const banner    = document.getElementById('topMoodBanner');
  if (!badgeWrap) return;

  const combined = MOOD_NAMES.map(mood => ({
    mood,
    count: (sessionMoodCounts[mood] || 0)
  })).sort((a, b) => b.count - a.count);

  badgeWrap.innerHTML = combined.map(({ mood, count }) => {
    const m = MOOD_META[mood];
    return `<span class="mood-badge" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:var(--text)">${m.emoji} ${m.label} ×${count}</span>`;
  }).join('');

  if (banner && combined.length) {
    const top = combined[0];
    const m = MOOD_META[top.mood];
    const totalMinutes = Math.round(top.count * 3.2);
    banner.innerHTML = `
      <span style="font-size:2rem">${m.emoji}</span>
      <div><div style="font-weight:700;font-size:.95rem">${m.label}</div>
      <div style="font-size:.76rem;color:var(--muted);margin-top:.1rem">${top.count} sessions · ${Math.floor(totalMinutes/60)}h ${totalMinutes%60}m total</div></div>
      <span style="margin-left:auto;font-size:.76rem;color:var(--amber);font-weight:700">🏆 Top Mood</span>
    `;
  }
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   12. VOICE SEARCH
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
let voiceTimeout = null;

function startVoiceSearch() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    toast("❌ Your browser doesn't support Voice Search!");
    return;
  }

  if (voiceTimeout) clearTimeout(voiceTimeout);
  if (!exploreRendered) renderExplore();

  const recognition = new SpeechRecognition();
  const micBtn = document.getElementById('voice-btn');
  const searchInput = document.getElementById('exQ');

  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    micBtn.classList.add('listening');
    micBtn.textContent = '🛑';
    toast('🎙️ Listening... you have 10 seconds!');

    voiceTimeout = setTimeout(() => {
      recognition.stop();
      toast('⏱️ Time out! No speech detected.');
    }, 10000);
  };

  recognition.onend = () => {
    micBtn.classList.remove('listening');
    micBtn.textContent = '🎙️';
    if (voiceTimeout) clearTimeout(voiceTimeout);
  };

  recognition.onresult = (event) => {
    if (voiceTimeout) clearTimeout(voiceTimeout);
    const speechToText = event.results[0][0].transcript.toLowerCase().trim();
    toast(`🎙️ You said: "${speechToText}"`);
    searchInput.value = speechToText;
    filterExplore(speechToText);
  };

  recognition.onerror = (event) => {
    if (voiceTimeout) clearTimeout(voiceTimeout);
    console.error('Speech recognition error', event.error);
    toast(event.error === 'no-speech' ? '❌ No speech detected!' : '❌ Voice recognition failed.');
  };

  recognition.start();
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   13. AI MOOD DETECTOR
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function detectMoodWithAI() {
  const promptInput = document.getElementById('aiPrompt');
  const text = promptInput.value.toLowerCase().trim();

  if (!text) {
    toast('⚠️ Type something first!');
    return;
  }

  const moodKeywords = {
    happy: ['happy', 'khush', 'mazzedar', 'awesome', 'great', 'party', 'exam achha', 'win', 'jeet', 'celebrate', 'dance', 'good', 'badhiya'],
    sad: ['sad', 'udhas', 'broken', 'cry', 'dukhi', 'bekar', 'fail', 'fight', 'akela', 'lonely', 'miss', 'bura', 'hurt'],
    relaxed: ['chill', 'peace', 'relax', 'sukoon', 'sleepy', 'calm', 'nature', 'baarish', 'rain', 'slow', 'thak', 'tired'],
    energetic: ['gym', 'workout', 'run', 'power', 'charge', 'hype', 'fast', 'dance', 'high', 'josh', 'running'],
    romantic: ['love', 'pyar', 'ishq', 'date', 'romantic', 'valentines', 'beautiful', 'crush', 'sapne'],
    focus: ['study', 'padhai', 'code', 'coding', 'work', 'office', 'exam kal', 'concentration', 'project', 'focus']
  };

  let detectedMood = null;
  let maxMatches = 0;

  for (const [mood, keywords] of Object.entries(moodKeywords)) {
    let matchCount = 0;
    keywords.forEach(keyword => { if (text.includes(keyword)) matchCount++; });
    if (matchCount > maxMatches) {
      maxMatches = matchCount;
      detectedMood = mood;
    }
  }

  if (detectedMood) {
    toast(`🤖 AI Result: your mood seems "${detectedMood.toUpperCase()}"! Loading playlist...`);
    setTimeout(() => { promptInput.value = ''; go(detectedMood); }, 2000);
  } else {
    toast("🤖 AI status: mood's complex! Picking a 'Relaxed' vibe for you.");
    setTimeout(() => { promptInput.value = ''; go('relaxed'); }, 2000);
  }
}