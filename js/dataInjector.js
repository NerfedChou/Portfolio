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
            <li>Clone the repository: <code>git clone https://nerfedchou/guthib/github.git</code>.</li>
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
          <p>For more information, visit https://nerfedchou/guthib.com or check the full documentation.</p>
        `
      },
      {
        date: '2025-10-12',
        version: 'v1.1',
        title: 'Bug Fixes and Improvements',
        description: `
          <p>This minor update includes various bug fixes, performance improvements, and minor feature enhancements to enhance the overall user experience.</p>
          <ul style="padding-left: 1.5rem;">
            <li style="list-style: disc;">Fixed issues with repository forking</li>
            <li style="list-style: disc;">Improved search functionality</li>
            <li style="list-style: disc;">Enhanced UI responsiveness</li>
          </ul>
          <p>Thank you to our contributors for their valuable feedback and contributions!</p>
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
                <img src="../assets/discaya.jpeg" class = "img-expandable" alt="In-game screenshot of Discaya">               
              </li>
               <li class="screen-shots">
                <img src="../assets/marcos.jpeg" class = "img-expandable" alt="In-game screenshot of Marcos">               
              </li>
            </ul>
          `
      },
      {
        date: '2025-10-12',
        version: 'v1.1',
        title: 'New Features and Achievements Added',
        description: `
          <p>This update introduces several new features to enhance gameplay and adds secret achievements for dedicated players. We've expanded the game's mechanics to provide more challenges and rewards.</p>
          <h3>Added Features:</h3>
          <ul style="padding-left: 1.5rem;">
            <li style="list-style: disc;">Enhanced camera system with improved night vision mode for better surveillance.</li>
            <li style="list-style: disc;">New power management mini-games to conserve energy more efficiently.</li>
            <li style="list-style: disc;">Additional office upgrades, including customizable security doors and alarm systems.</li>
            <li style="list-style: disc;">Expanded story mode with more dialogue and branching narratives based on player choices.</li>
            <li style="list-style: disc;">Multiplayer co-op mode for up to 4 players to team up against the corrupt officials.</li>
          </ul>
          <h3>Secret Achievements:</h3>
          <ul style="padding-left: 1.5rem;">
            <li style="list-style: disc;">"Corruption Buster": Survive 10 nights without triggering any alarms.</li>
            <li style="list-style: disc;">"Whistleblower": Discover and expose all hidden corruption clues in a single playthrough.</li>
            <li style="list-style: disc;">"Power Saver": Complete a night using less than 50% of available power.</li>
            <li style="list-style: disc;">"Team Player": Win a co-op game without any team member being caught.</li>
            <li style="list-style: disc;">"Legendary Guard": Achieve a perfect score on all nights in story mode.</li>
          </ul>
          <p>These additions aim to increase replayability and provide new ways for players to engage with the game's themes of corruption and survival. Thank you for your continued support!</p>
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
            <li>Clone the repository: <code>git clone www.nefredchou/b235/bedroom.git</code>.</li>
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
        `
      },
      {
        date: '2025-10-12',
        version: 'v1.1',
        title: 'Added Features with Boilerplates',
        description: `
          <p>In this update, BEDROOM 2:35 expands its core offering with a new set of Smart Containers and ready-made boilerplates designed to make building modern, responsive interfaces even faster and more intuitive.</p>
          
          <h3>What’s New?</h3>
          <ul>
            <li><strong>Modal Container:</strong> Effortlessly create overlays and popups with our new Modal Container, which adapts seamlessly to any screen size. It’s perfect for alerts, dialogs, and feature highlights. The container ensures that your modal content remains centered and accessible, while the background is subtly dimmed for clarity and focus.</li>
            <li><strong>Accordion Container:</strong> Organize your content with the new Accordion Container, ideal for FAQs, menus, or any expandable/collapsible sections. Each section smoothly expands or contracts in response to user interaction, providing a clean, uncluttered presentation that is both mobile-friendly and fully keyboard accessible.</li>
            <li><strong>Carousel Container:</strong> Showcase images, testimonials, or featured content with the Carousel Container. Users can swipe or click through slides, which automatically adjust to fit their device—ensuring a polished, touch-ready experience on phones, tablets, and desktops alike.</li>
          </ul>
          
          <h3>Boilerplate Templates for Rapid Development</h3>
          <p>To help you get started, this release also introduces boilerplate templates for each new Smart Container. These templates offer best-practice layouts and recommended property usage, so you can quickly adapt the structure to your specific project needs. Whether you’re building a landing page, a dashboard, or a mobile-first web app, these templates provide a strong foundation to accelerate your workflow.</p>
          
          <h3>Why This Matters</h3>
          <p>With these additions, BEDROOM 2:35 further reduces the time and effort required to implement complex interface patterns. By standardizing containers and providing clear starting points, developers can focus more on creativity and feature development, and less on repetitive setup work.</p>
          
          <h3>How to Use</h3>
          <p>Simply include the BEDROOM 2:35 framework in your project, and reference the official documentation for detailed guidance on integrating and customizing these new Smart Containers. All containers are designed with flexibility in mind, allowing you to tailor appearance and behavior using straightforward, semantic HTML and your own CSS variables.</p>
          
          <h3>Next Steps</h3>
          <p>We invite you to explore these new features, provide feedback, and contribute your own ideas or improvements to the project. As always, our goal is to empower developers to build beautiful, robust interfaces with confidence and minimal friction.</p>
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
      // Sort updates by date in descending order (newest first)
      project.updates.sort((a, b) => new Date(b.date) - new Date(a.date));

      const latestUpdate = project.updates[0];
      project.history.title = latestUpdate.title;
      project.history.date = new Date(latestUpdate.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      project.history.content = latestUpdate.description;
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
