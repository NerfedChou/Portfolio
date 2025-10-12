// dataInjector.js - Injects project update data into the DOM

const projectData = {
  'github-clone': {
    updates: [
      {
        date: '2025-09-07',
        version: 'v1.0',
        title: 'First Initial Release',
        description: 'The initial release of the GitHub Clone Website, featuring full repository management, issues, pull requests, and user profiles. Built with vanilla HTML, CSS, and JavaScript for the frontend, and Rust for the backend to ensure safety and performance.'
      }
    ],
    history: {
      title: '',
      date: '',
      content: 'The initial release of the GitHub Clone Website, featuring full repository management, issues, pull requests, and user profiles. Built with vanilla HTML, CSS, and JavaScript for the frontend, and Rust for the backend to ensure safety and performance.'
    }
  },
  'five-nights-malacanang': {
    updates: [
      {
        date: '2025-09-07',
        version: 'v1.0',
        title: 'First Initial Release',
        description: 'The initial release of Five Nights at Malacañang, a thrilling survival game inspired by Philippine corruption. Players must survive the night as a security guard, managing power and monitoring cameras to fend off corrupt officials.'
      }
    ],
    history: {
      title: '',
      date: '',
      content: 'The initial release of Five Nights at Malacañang, a thrilling survival game inspired by Philippine corruption. Players must survive the night as a security guard, managing power and monitoring cameras to fend off corrupt officials.'
    }
  },
  'bedroom-235': {
    updates: [
      {
        date: '2025-09-07',
        version: 'v1.0',
        title: 'The Spark of Dream',
        description: 'The initial release of BEDROOM 2:35 Framework, an open-source framework designed to simplify front-end development with Smart Containers and responsive design principles.'
      }
    ],
    history: {
      title: '',
      date: '',
      content: `
        <p>The initial release includes:</p>
        <ul style="padding-left: 1.5rem;">
          <li style="list-style: disc;">Full repository management</li>
          <li style="list-style: disc;">Issues and pull requests</li>
          <li style="list-style: disc;">User profiles</li>
          <li style="list-style: disc;"><strong>Rust backend</strong> for safety and performance</li>
        </ul>
        <p>Built with vanilla technologies for maximum compatibility. Blazing fast with performance.</p>
        <p>Still maybe be on beta test we will close the beta at the end of this year.</p>
      `
    }
  }
};

// Function to dynamically set history title and date from the first update
function setHistoryFromUpdates(data) {
  for (const projectId in data) {
    const project = data[projectId];
    if (project.updates && project.updates.length > 0) {
      const firstUpdate = project.updates[0];
      project.history.title = firstUpdate.title;
      project.history.date = new Date(firstUpdate.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  }
}

setHistoryFromUpdates(projectData);

// Function to fetch data (for future backend integration)
async function fetchProjectData() {
  // For now, return static data. Later, replace with fetch('/api/projects')
  return projectData;
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchProjectData();
  const projects = document.querySelectorAll('.project-card');

  projects.forEach(project => {
    const projectId = project.dataset.project;
    const projectInfo = data[projectId];
    if (!projectInfo) return;

    const updatesUl = project.querySelector('.updates');
    updatesUl.innerHTML = ''; // Clear existing placeholder

    projectInfo.updates.forEach(update => {
      const li = document.createElement('li');
      li.className = 'updates-item';
      li.innerHTML = `
        <div class="updates-item-wrapper" tabindex="0">
          <div class="update-badge">
            <time datetime="${update.date}">${new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span class="versions">${update.version}</span>
          </div>
          <h4 class="update-title">${update.title}</h4>
        </div>
      `;
      updatesUl.appendChild(li);
    });

    // Populate history with the first update's description or dedicated history
    const historyArticle = project.querySelector('.history-description');
    if (projectInfo.history) {
      historyArticle.querySelector('.update-title').textContent = projectInfo.history.title;
      historyArticle.querySelector('time strong').textContent = projectInfo.history.date;
      historyArticle.querySelector('.description-content').innerHTML = projectInfo.history.content;
    }
  });
});
