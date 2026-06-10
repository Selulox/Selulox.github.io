// Page switching 
function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (el && el.classList) el.classList.add('active');
  window.scrollTo(0, 0);
}

// Project data 
// HOW TO ADD IMAGES:
//   1. Put your image files in the same folder as this HTML (e.g. images/project1-1.jpg)
//   2. Replace the empty src: '' with the relative path, e.g. src: 'images/project1-1.jpg'
const projects =
{
  'project-1': {
    title: 'Project One',
    link: 'https://itch.io/',
    content: [
      { type: 'image', src: '' },   // e.g. 'images/project1-screen1.jpg'
      { type: 'text',  body: 'Describe what is happening in the screenshot above. Walk the reader through the mechanic, level, or system on display.' },
      { type: 'image', src: '' },
      { type: 'text',  body: 'Another screenshot, another moment. Keep building the picture of how the game works and what you contributed.' },
      { type: 'image', src: '' },
      { type: 'text',  body: 'Final thought — what did you learn, what would you do differently, what are you proud of?' },
    ]
  },
  'project-2': {
    title: 'Project Two',
    link: 'https://itch.io/',
    content: [
      { type: 'image', src: '' },
      { type: 'text',  body: 'Describe what is happening in the screenshot above.' },
      { type: 'image', src: '' },
      { type: 'text',  body: 'Continue the breakdown of the project here.' },
    ]
  },
  'project-3': {
    title: 'Project Three',
    link: 'https://itch.io/',
    content: [
      { type: 'image', src: '' },
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

// Project detail overlay 
function openDetail(id) {
  const p = projects[id];
  if (!p) return;
  document.getElementById('pd-title').textContent = p.title;
  document.getElementById('pd-link').href = p.link;

  const container = document.getElementById('pd-content');
  container.innerHTML = p.content.map(block => 
  {
    if (block.type === 'image') 
    {
      return block.src
        ? `<div class="pd-image"><img src="${block.src}" alt=""></div>`
        : `<div class="pd-image"><div class="pd-image-placeholder"></div></div>`;
    } 
    else 
    {
      return `<p>${block.body}</p>`;
    }
  }).join('');

  const el = document.getElementById('project-detail');
  el.classList.add('active');
  el.scrollTop = 0;
}

function closeDetail() {
  document.getElementById('project-detail').classList.remove('active');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDetail(); });

// Thumbnail grid 
// HOW TO USE REAL IMAGES:
//   Replace the placeholder div generation below with:
//   const img = document.createElement('img');
//   img.src = 'images/thumb-01.jpg';   // one per thumbnail
//   a.appendChild(img);
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
