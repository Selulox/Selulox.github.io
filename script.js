// Page switching 
function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (el && el.classList) el.classList.add('active');
  window.scrollTo(0, 0);
}

const projects =
{
  'project-1': {
    title: 'DATAMON',
    link: 'https://eggzodiac.itch.io/datamon',
    content: [
      { type: 'hero', src: 'images/Projects/DATAMON/datamon_wallp.jpg', text: 'Welcome to DATAMON! This is a retro-style RPG inspired by classic Pokémon games.' },

      { type: 'duo',
        srcLeft: 'images/Projects/DATAMON/battle.jpg',
        src: 'images/Projects/DATAMON/battle_move.jpg',
        text: 'This is a battle scene with a Pokémon in action.' 
      },

      { type: 'row',
        src: 'images/Projects/DATAMON/move1.jpg',
        text: 'Each Pokémon has a set of moves. The left panel shows the move list; the right shows it in action during battle.' },

      { type: 'duo',
        srcLeft: 'images/Projects/DATAMON/pokemon.jpg',
        src: 'images/Projects/DATAMON/part.jpg',
        text: 'Manage your party between battles. Swap members, check stats, and plan your team composition.' },

      { type: 'duo',
        srcLeft: 'images/Projects/DATAMON/shopstock.jpg',
        src: 'images/Projects/DATAMON/shop_list.jpg',
        text: 'The shop lets you stock up on items. Stock view on the left, the purchase list on the right.' },

      { type: 'row',
        src: 'images/Projects/DATAMON/inventory.jpg',
        text: 'Your inventory keeps track of everything you carry — potions, balls, and key items.' },

      { type: 'duo',
        srcLeft: 'images/Projects/DATAMON/routes1.jpg',
        src:     'images/Projects/DATAMON/route.jpg',
        text:    'Routes connect towns and are filled with wild encounters. Each route has its own Pokémon pool and difficulty curve.' },
    ]
  },
  'project-2': {
    title: 'STARGAZE',
    link: 'https://eggzodiac.itch.io/stargaze',
    content: [
      { type: 'image', src: 'images/Projects/STARGAZE/main_wallpaper_star.jpg' },
      { type: 'text',  body: 'Describe what is happening in the screenshot above.' },
      { type: 'image', src: '' },
      { type: 'text',  body: 'Continue the breakdown of the project here.' },
    ]
  },
  'project-3': {
    title: 'KING\'S SECRET',
    link: 'https://eggzodiac.itch.io/kings-secret',
    content: [
      { type: 'image', src: 'images/Projects/KINGS_SECRET/kıngs_secret.png' },
      { type: 'text',  body: 'Describe what is happening in the screenshot above.' },
      { type: 'image', src: '' },
      { type: 'text',  body: 'Continue the breakdown of the project here.' },
    ]
  },
  'project-4': {
    title: 'Project Four',
    link: 'https://itch.io/',
    content: [
      { type: 'image', src: '' },
      { type: 'text',  body: 'Describe what is happening in the screenshot above.' },
      { type: 'image', src: '' },
      { type: 'text',  body: 'Continue the breakdown of the project here.' },
    ]
  }
};

// Wire portfolio play buttons from projects data
document.querySelectorAll('.proj-play-icon[data-project]').forEach(a => {
  const p = projects[a.dataset.project];
  if (p) a.href = p.link;
});

// ── Lightbox ──────────────────────────────────────────────────────────────────
let _lbImages = [];   // flat array of src strings for current project
let _lbIndex  = 0;

function openLightbox(srcs, startIndex) {
  _lbImages = srcs;
  _lbIndex  = startIndex;
  _renderLightbox();
  document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

function lbPrev() {
  _lbIndex = (_lbIndex - 1 + _lbImages.length) % _lbImages.length;
  _renderLightbox();
}

function lbNext() {
  _lbIndex = (_lbIndex + 1) % _lbImages.length;
  _renderLightbox();
}

function _renderLightbox() {
  const img = document.getElementById('lb-img');
  const counter = document.getElementById('lb-counter');
  img.src = _lbImages[_lbIndex];
  counter.textContent = (_lbIndex + 1) + ' / ' + _lbImages.length;
  // hide arrows if only one image
  document.getElementById('lb-prev').style.display = _lbImages.length > 1 ? '' : 'none';
  document.getElementById('lb-next').style.display = _lbImages.length > 1 ? '' : 'none';
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('active')) {
    if (e.key === 'Escape') closeDetail();
    return;
  }
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  lbPrev();
  if (e.key === 'ArrowRight') lbNext();
});

// ── Project detail overlay ───────────────────────────────────────────────────
function openDetail(id) {
  const p = projects[id];
  if (!p) return;
  document.getElementById('pd-title').textContent = p.title;
  document.getElementById('pd-link').href = p.link;

  const container = document.getElementById('pd-content');

  // Collect all real image srcs in order for the lightbox gallery
  const allSrcs = [];
  p.content.forEach(block => {
    if (block.type === 'hero'  && block.src)     allSrcs.push(block.src);
    if (block.type === 'row'   && block.src)     allSrcs.push(block.src);
    if (block.type === 'duo') {
      if (block.srcLeft) allSrcs.push(block.srcLeft);
      if (block.src)     allSrcs.push(block.src);
    }
    if (block.type === 'image' && block.src)     allSrcs.push(block.src);
  });

  // Helper: clickable img tag — clicking opens lightbox at correct index
  function imgTag(src, srcList) {
    if (!src) return `<div class="pd-image-placeholder" style="aspect-ratio:16/9"></div>`;
    const idx = srcList.indexOf(src);
    const safeJson = JSON.stringify(srcList).replace(/'/g, "&#39;");
    return `<img src="${src}" alt="" class="lb-trigger" data-srcs='${safeJson}' data-idx="${idx}" title="Click to enlarge">`;
  }

  container.innerHTML = p.content.map(block => {
    if (block.type === 'hero') {
      return `<div class="pd-block-hero">${imgTag(block.src, allSrcs)}</div>`;
    }
    else if (block.type === 'row') {
      return `
        <div class="pd-block-row">
          <div class="pd-block-img">${imgTag(block.src, allSrcs)}</div>
          <div class="pd-block-text"><p>${block.text}</p></div>
        </div>`;
    }
    else if (block.type === 'duo') {
      // Layout: image left, image centre, text right (3 columns: 1fr 1fr 0.8fr)
      return `
        <div class="pd-block-row-duo">
          <div class="pd-block-img">${imgTag(block.srcLeft, allSrcs)}</div>
          <div class="pd-block-img">${imgTag(block.src, allSrcs)}</div>
          <div class="pd-block-text"><p>${block.text}</p></div>
        </div>`;
    }
    else if (block.type === 'image') {
      return block.src
        ? `<div class="pd-image">${imgTag(block.src, allSrcs)}</div>`
        : `<div class="pd-image"><div class="pd-image-placeholder"></div></div>`;
    }
    else {
      return `<p>${block.body}</p>`;
    }
  }).join('');

  // Wire lightbox clicks via event delegation (avoids inline onclick quote issues)
  container.querySelectorAll('.lb-trigger').forEach(img => {
    img.addEventListener('click', () => {
      const srcs = JSON.parse(img.dataset.srcs);
      const idx  = parseInt(img.dataset.idx, 10);
      openLightbox(srcs, idx);
    });
  });

  const el = document.getElementById('project-detail');
  el.classList.add('active');
  el.scrollTop = 0;
}

function closeDetail() {
  document.getElementById('project-detail').classList.remove('active');
}

// Thumbnail grid 
const grid = document.getElementById('thumb-grid');
for (let i = 0; i < 25; i++) {
  const a = document.createElement('a');
  a.href = '#';
  const d = document.createElement('div');
  d.className = 'thumb-placeholder';
  const v = 27 + Math.floor(Math.random() * 15);
  d.style.background = `linear-gradient(135deg, rgb(${v},${v+10},${v+20}), rgb(${v+8},${v+18},${v+28}))`;
  a.appendChild(d);
  grid.appendChild(a);
}