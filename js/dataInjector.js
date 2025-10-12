// dataInjector.js - Injects project update data into the DOM

const projectData = {
  'github-clone': {
    updates: [
      {
        date: '2025-05-14',
        version: 'v1.0',
        title: 'Stable Version v1.0 Released',
        description: `
          <p>A fully functional, open-source clone of the GitHub platform, designed to replicate core collaboration and repository management features while emphasizing simplicity, performance, and security. This project serves as an educational tool and alternative implementation, built from the ground up using modern web technologies.</p>
          <h3>Key Features:</h3>
          <ul style="padding-left: 1.5rem;">
            <li style="list-style: disc;">Repository Management: Create, fork, and manage repositories with full version control integration.</li>
            <li style="list-style: disc;">Issues and Pull Requests: Track bugs, feature requests, and code changes through a streamlined issue tracker and pull request system.</li>
            <li style="list-style: disc;">User Profiles: Personalized profiles with activity feeds, repositories, and collaboration history.</li>
            <li style="list-style: disc;">Search and Discovery: Advanced search functionality to find repositories, users, and code snippets.</li>
            <li style="list-style: disc;">Collaboration Tools: Branching, merging, and code review workflows to facilitate team development.</li>
          </ul>
          <h3>Technologies Used:</h3>
          <ul style="padding-left: 1.5rem;">
            <li style="list-style: disc;">Frontend: Vanilla HTML, CSS, and JavaScript for a lightweight, dependency-free user interface.</li>
            <li style="list-style: disc;">Backend: Rust for high-performance, memory-safe server-side logic, ensuring reliability and speed.</li>
            <li style="list-style: disc;">Database: [Specify if applicable, e.g., PostgreSQL or SQLite for data persistence].</li>
            <li style="list-style: disc;">Deployment: Hosted on [e.g., Cloudflare] for global scalability and low-latency access.</li>
          </ul>
          <p><strong>Why This Project?</strong> Inspired by the need for a customizable, self-hosted alternative to GitHub, this clone prioritizes developer freedom and learning. It's ideal for developers looking to understand platform architecture, experiment with web technologies, or deploy a private GitHub-like service. The Rust backend guarantees safety and performance, making it suitable for production use.</p>
          <h3>Getting Started:</h3>
          <ol style="padding-left: 1.5rem;">
            <li>Clone the repository: <code>git clone [your-repo-url]</code>.</li>
            <li>Install dependencies: [e.g., <code>cargo build</code> for Rust backend].</li>
            <li>Run the application: [e.g., <code>npm start</code> or equivalent].</li>
            <li>Access at <code>http://localhost:3000</code>.</li>
          </ol>
          <p><strong>Contributing:</strong> We welcome contributions! Please submit issues or pull requests. For major changes, open an issue first to discuss.</p>
          <p><strong>License:</strong> This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>
          <h3>Roadmap:</h3>
          <ul style="padding-left: 1.5rem;">
            <li style="list-style: disc;">API enhancements</li>
            <li style="list-style: disc;">Mobile responsiveness</li>
            <li style="list-style: disc;">Integration with external services</li>
          </ul>
          <p>For more information, visit [your-website] or check the full documentation.</p>
        `
      }
    ],
    history: {
      title: '',
      date: '',
      content: ``
    }
  },
  'five-nights-malacanang': {
    updates: [
      {
        date: '2025-04-21',
        version: 'v1.0',
        title: 'Beta Test is Open',
        description: `
          <p>The initial release of Five Nights at Malacañang, a thrilling survival game inspired by Philippine corruption. Players must survive the night as a security guard, managing power and monitoring cameras to fend off corrupt officials.</p>
          <h3>In-game Screen-Shots: </h3>
            <ul style="padding-left: 1.5rem;" class="screen-shots-list">
              <li class="screen-shots">
                <img src="../assets/discaya.jpeg" alt="In-game screenshot of Discaya">               
              </li>
               <li class="screen-shots">
                <img src="../assets/marcos.jpeg" alt="In-game screenshot of Marcos">               
              </li>
            </ul>
          `
      }
    ],
    history: {
      title: '',
      date: '',
      content: ''
    }
  },
  'bedroom-235': {
    updates: [
      {
        date: '2025-09-07',
        version: 'v1.0',
        title: 'The Spark of Dream',
        description: `
          <p>BEDROOM 2:35 is a revolutionary open-source framework born out of a developer's frustration—a 2 AM realization that current web frameworks are a prison of complexity, forcing creators to spend years memorizing syntax and fighting against rigid code. We reject this. BEDROOM 2:35 is the fundamental inversion of control, designed to solve the biggest problems in front-end development by guaranteeing both Freedom and Assurance.</p>
          <h3>Key Features:</h3>
          <ul style="padding-left: 1.5rem;">
            <li style="list-style: disc;">Smart Containers: A core set of 10-20 unstyled, perfectly responsive LEGO Bricks that structure your website with minimal code.</li>
            <li style="list-style: disc;">Custom Saw: Use vanilla CSS with simple modifier properties (e.g., --padding) instead of learning new utility languages like Tailwind, eliminating steep learning curves and design rigidity.</li>
            <li style="list-style: disc;">Smart Engine: Works invisibly in the background, converting beginner errors like fixed px units to responsive rem, and defending layout integrity against aggressive JavaScript manipulation.</li>
            <li style="list-style: disc;">Freedom and Assurance: Guarantees your code won't break, allowing you to fly without worrying.</li>
            <li style="list-style: disc;">Developer-Centric: Focuses purely on design mastery, making your skills immediately productive.</li>
          </ul>
          <h3>Technologies Used:</h3>
          <ul style="padding-left: 1.5rem;">
            <li style="list-style: disc;">Frontend: Vanilla HTML, CSS, and JavaScript for maximum compatibility and performance.</li>
            <li style="list-style: disc;">Backend: Rust for safety, performance, and reliability.</li>
            <li style="list-style: disc;">Deployment: Optimized for global scalability and low-latency access.</li>
          </ul>
          <p><strong>Why This Project?</strong> By offering this solution for free and focusing the developer purely on design mastery, BEDROOM 2:35 is poised to dominate the market by becoming the essential, anti-fragile, and developer-centric foundation for the next generation of the web.</p>
          <h3>Getting Started:</h3>
          <ol style="padding-left: 1.5rem;">
            <li>Clone the repository: <code>git clone [your-repo-url]</code>.</li>
            <li>Install dependencies: [e.g., <code>cargo build</code> for Rust backend].</li>
            <li>Run the application: [e.g., <code>npm start</code> or equivalent].</li>
            <li>Access at <code>http://localhost:3000</code>.</li>
          </ol>
          <p><strong>Contributing:</strong> We welcome contributions! Please submit issues or pull requests. For major changes, open an issue first to discuss.</p>
          <p><strong>License:</strong> This project is licensed under the MIT License - see the <a href="../LICENSE">LICENSE</a> file for details.</p>
          <h3>Roadmap:</h3>
          <ul style="padding-left: 1.5rem;">
            <li style="list-style: disc;">Expand Smart Containers library</li>
            <li style="list-style: disc;">Enhanced Smart Engine features</li>
            <li style="list-style: disc;">Community-driven extensions</li>
          </ul>
          <p>For more information, visit [your-website] or check the full documentation.</p>
        `
      }
    ],
    history: {
      title: '',
      date: '',
      content: ''
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
      project.history.content = firstUpdate.description;
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

    // Add click handlers to update items
    updatesUl.querySelectorAll('.updates-item').forEach((li, index) => {
      li.addEventListener('click', () => {
        const update = projectInfo.updates[index];
        const historyArticle = project.querySelector('.history-description');
        historyArticle.querySelector('.update-title').textContent = update.title;
        historyArticle.querySelector('time strong').textContent = new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        historyArticle.querySelector('.description-content').innerHTML = update.description;
      });
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
