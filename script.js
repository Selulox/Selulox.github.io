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
    title: 'KING\'S SECRET',
    link: 'https://eggzodiac.itch.io/kings-secret',
    content: [
      { type: 'image', src: 'images/Projects/KINGS_SECRET/kıngs_secret.png' },
      { type: 'image', src: 'images/Projects/KINGS_SECRET/Kings_road_gamplay.gif',},
      { type: 'row',
        src: 'images/Projects/KINGS_SECRET/Kings_road_map.png',
        text: 'This was university gamejam project. I did the level design of the game.' },
      { type: 'duo',
        srcLeft: 'images/Projects/KINGS_SECRET/combat.jpg',
        src: 'images/Projects/KINGS_SECRET/inventory.jpg',
        text: 'We implemented a comprehensive inventory system for the game and managed the balance of items and resources also made a combat system from undertale.' },
    ]
  },

  'project-2': {
    title: 'STARGAZE',
    link: 'https://eggzodiac.itch.io/stargaze',
    content: [
      { type: 'image', src: 'images/Projects/STARGAZE/main_wallpaper_star.jpg' },
      { type: 'row',
        src: 'images/Projects/STARGAZE/stargaze_gameplay.gif',
        text: 'Stargaze is a game combining elements from galaga and vampire survivors.' },
      { type: 'row',
        src: 'images/Projects/STARGAZE/star_gaze_upgrade.jpg',
        text: 'When the player reaches a certain score, they can unlock new upgrades for their ship.' },
      { type: 'duo',
        srcLeft: 'images/Projects/STARGAZE/Effects_2.gif',
        src: 'images/Projects/STARGAZE/star_gaze_effects_1.jpg',
        text: 'I have implemented visual effects for the game, enhancing the overall aesthetic and player experience.' },
    ]
  },

  'project-3': {
    title: 'DATAMON',
    link: 'https://eggzodiac.itch.io/datamon',
    content: [
      { type: 'hero', src: 'images/Projects/DATAMON/datamon_wallp.jpg', text: 'Welcome to DATAMON! This is a retro-style RPG inspired by classic Pokémon games.' },

      { type: 'row',
        src: 'images/Projects/DATAMON/datanob.gif',
        text: 'In Datamon, you can catch, use potions and battle with datamons.' },

      { type: 'duo',
        srcLeft: 'images/Projects/DATAMON/battle.jpg',
        src: 'images/Projects/DATAMON/battle_move.jpg',
        text: 'This is a battle scene with a Pokémon in action. Pokemon battles are turn-based, where you select moves to attack, defend, or use items. Each pokemon can inflict different status effects and have unique stats that influence the battle outcome.' 
      },

      { type: 'row',
        src: 'images/Projects/DATAMON/move1.jpg',
        text: 'Each Pokémon has a set of moves. The left panel shows the move list; you can debuff, bleed or even stress the opponent.' },

      { type: 'duo',
        srcLeft: 'images/Projects/DATAMON/pokemon.jpg',
        src: 'images/Projects/DATAMON/part.jpg',
        text: 'I have written a script to manage pokemons in a data level. Manage your party between battles. Swap members, check stats, and plan your team composition.' },

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

// Lightbox 
let _lbImages = []; 
let _lbIndex = 0;

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
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev();
  if (e.key === 'ArrowRight') lbNext();
});

// Project detail overlay 
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

  // Helper: clickable img tag
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

const designs = [
  { src: 'images/Design/Gun_model.jpg', href: '#' },
  { src: 'images/Design/hayalet.png', href: '#' },
  { src: 'images/Design/Bendable_model.gif', href: '#' },
  { src: 'images/Design/KEYDOT2.png', href: '#' },
  { src: 'images/Design/hppotion.png', href: '#' },
  { src: 'images/Design/vampire.png', href: '#' },
  { src: 'images/Design/sword.png', href: '#' },
  { src: 'images/Design/off hand - book.png', href: '#' },
  { src: 'images/Design/base_planet_1.png', href: '#' },
  { src: 'images/Design/base_planet_2.png', href: '#' },
  { src: 'images/Design/base_background_combo.png', href: '#' },
  { src: 'images/Design/fight bar.png', href: '#' },
  { src: 'images/Design/scrolldeneme.png', href: '#' },
  { src: 'images/Design/empty hand.png', href: '#' },

];

const grid = document.getElementById('thumb-grid');
designs.forEach(item => {
  const a = document.createElement('a');
  a.href = item.href;
  const img = document.createElement('img');
  img.src = item.src;
  img.alt = '';
  a.appendChild(img);
  grid.appendChild(a);
});

// Pacman animation
(function() {
  const canvas = document.getElementById('pacman-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const H = 32;
  const CY = H / 2;
  const R = 7;
  const GR = 6;
  const SPEED = 1.6;

  const COL = '#F0EAD6';
  const CEYE = '#8A9BB0';
  const CPUP = '#0D1B2A';
  const CDOT = '#F0EAD6';

  let W = canvas.offsetWidth || 760;
  canvas.width  = W;
  canvas.height = H;

  // dots
  let dots = [];
  function makeDots() {
    dots = [];
    for (let x = 14; x < W - 14; x += 16) dots.push({ x, eaten: false });
  }
  makeDots();

  let dir = 1; // 1=right, -1=left
  let pacX = -R * 3;
  let ghostX = pacX - GR * 4;
  let mouthT = 0; // 0=closed, 1=open
  let mouthD = 1;

  function drawPac(x, t, d) {
    // draw a filled circle then cut the mouth wedge out
    const angle = t * Math.PI / 3; // 0 to 60 degrees
    ctx.save();
    ctx.translate(x, CY);
    if (d === -1) ctx.scale(-1, 1); // flip for left direction
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, angle, 2 * Math.PI - angle, false);
    ctx.closePath();
    ctx.fillStyle = COL;
    ctx.fill();
    ctx.restore();
  }

  function drawGhost(x) {
    const t = CY - GR;
    const b = CY + GR;
    const bm = GR * 0.4;
    ctx.beginPath();
    ctx.arc(x, t + GR * 0.6, GR, Math.PI, 0, false);
    ctx.lineTo(x + GR, b);
    ctx.quadraticCurveTo(x + GR * 0.67, b + bm, x + GR * 0.33, b);
    ctx.quadraticCurveTo(x, b - bm,  x - GR * 0.33, b);
    ctx.quadraticCurveTo(x - GR * 0.67, b + bm,  x - GR, b);
    ctx.lineTo(x - GR, t + GR * 0.6);
    ctx.closePath();
    ctx.fillStyle = COL;
    ctx.fill();
    // eyes
    const ey = CY - GR * 0.2;
    const ps = dir * 1.5;
    [-GR * 0.35, GR * 0.35].forEach(ox => {
      ctx.beginPath();
      ctx.ellipse(x + ox, ey, GR * 0.28, GR * 0.32, 0, 0, Math.PI * 2);
      ctx.fillStyle = CEYE; ctx.fill();
      ctx.beginPath();
      ctx.ellipse(x + ox + ps, ey, GR * 0.12, GR * 0.14, 0, 0, Math.PI * 2);
      ctx.fillStyle = CPUP; ctx.fill();
    });
  }

  let last = null;
  function frame(ts) {
    // cap delta so tab-switch doesn't cause a huge jump
    const dt = last === null ? 16 : Math.min(ts - last, 50);
    last = ts;
    const step = SPEED * dt / 16;

    W = canvas.offsetWidth || W;
    if (canvas.width !== W) { canvas.width = W; makeDots(); }

    ctx.clearRect(0, 0, W, H);

    dots.forEach(d => {
      if (!d.eaten) {
        ctx.beginPath();
        ctx.arc(d.x, CY, 2, 0, Math.PI * 2);
        ctx.fillStyle = CDOT;
        ctx.fill();
      }
      if (!d.eaten && Math.abs(d.x - pacX) < R) d.eaten = true;
    });

    mouthT += 0.09 * mouthD * (dt / 16);
    if (mouthT >= 1) { mouthT = 1; mouthD = -1; }
    if (mouthT <= 0) { mouthT = 0; mouthD =  1; }

    drawGhost(ghostX);
    drawPac(pacX, mouthT, dir);

    pacX   += step * dir;
    ghostX += step * dir;

    if (dir === 1 && pacX > W + R * 3) {
      dir = -1; pacX = W + R * 3; ghostX = pacX + GR * 4;
      dots.forEach(d => d.eaten = false);
    } else if (dir === -1 && pacX < -R * 3) {
      dir = 1; pacX = -R * 3; ghostX = pacX - GR * 4;
      dots.forEach(d => d.eaten = false);
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();

// Orbital Pacman around about photo
(function() {
  const canvas = document.getElementById('orbit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SIZE = 190; // canvas px
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const ORBIT  = 87; // orbit radius (just outside the 150px photo)
  const R = 7; // pacman radius
  const GR = 6; // ghost radius
  const SPEED  = 0.022; // radians per frame at 60fps

  canvas.width  = SIZE;
  canvas.height = SIZE;

  const COL  = '#F0EAD6';
  const CEYE = '#8A9BB0';
  const CPUP = '#0D1B2A';
  const CDOT = '#F0EAD6';

  // dots evenly around the orbit
  const DOT_COUNT = 28;
  const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
    angle: (i / DOT_COUNT) * Math.PI * 2,
    eaten: false
  }));

  let angle    = 0;     // pacman angle
  let gAngle   = angle - 0.32; // ghost trails behind
  let mouthT   = 0;
  let mouthD   = 1;

  function drawPac(a, t) {
    const x = CX + Math.cos(a) * ORBIT;
    const y = CY + Math.sin(a) * ORBIT;
    // facing direction = tangent of orbit = a + PI/2
    const face = a + Math.PI / 2;
    const open = t * Math.PI / 3;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(face);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, open, 2 * Math.PI - open, false);
    ctx.closePath();
    ctx.fillStyle = COL;
    ctx.fill();
    ctx.restore();
  }

  function drawGhost(a) {
    const x = CX + Math.cos(a) * ORBIT;
    const y = CY + Math.sin(a) * ORBIT;
    const b = GR;
    const bm = GR * 0.4;

    ctx.save();
    ctx.translate(x, y - GR);
    ctx.beginPath();
    ctx.arc(0, GR * 0.6, GR, Math.PI, 0, false);
    ctx.lineTo(GR, b * 2);
    ctx.quadraticCurveTo( GR * 0.67, b * 2 + bm,  GR * 0.33, b * 2);
    ctx.quadraticCurveTo( 0, b * 2 - bm, -GR * 0.33, b * 2);
    ctx.quadraticCurveTo(-GR * 0.67, b * 2 + bm, -GR, b * 2);
    ctx.lineTo(-GR, GR * 0.6);
    ctx.closePath();
    ctx.fillStyle = COL;
    ctx.fill();

    // eyes
    const ey = GR * 0.4;
    const ps = 1.2; // shift right
    [-GR * 0.35, GR * 0.35].forEach(ox => {
      ctx.beginPath();
      ctx.ellipse(ox, ey, GR * 0.28, GR * 0.32, 0, 0, Math.PI * 2);
      ctx.fillStyle = CEYE; ctx.fill();
      ctx.beginPath();
      ctx.ellipse(ox + ps, ey, GR * 0.12, GR * 0.14, 0, 0, Math.PI * 2);
      ctx.fillStyle = CPUP; ctx.fill();
    });
    ctx.restore();
  }

  let last = null;
  function frame(ts) {
    const dt = last === null ? 16 : Math.min(ts - last, 50);
    last = ts;
    const step = SPEED * (dt / 16);

    ctx.clearRect(0, 0, SIZE, SIZE);

    // draw dots
    dots.forEach(d => {
      if (!d.eaten) {
        const dx = CX + Math.cos(d.angle) * ORBIT;
        const dy = CY + Math.sin(d.angle) * ORBIT;
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fillStyle = CDOT;
        ctx.fill();
      }
      // eat if pacman is close in angle
      if (!d.eaten) {
        let diff = ((d.angle - angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (diff > Math.PI) diff = Math.PI * 2 - diff;
        if (diff < 0.18) d.eaten = true;
      }
    });

    // reset dots when all eaten
    if (dots.every(d => d.eaten)) dots.forEach(d => d.eaten = false);

    mouthT += 0.09 * mouthD * (dt / 16);
    if (mouthT >= 1) { mouthT = 1; mouthD = -1; }
    if (mouthT <= 0) { mouthT = 0; mouthD =  1; }

    drawPac(angle, mouthT);

    angle += step;
    gAngle += step;

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();