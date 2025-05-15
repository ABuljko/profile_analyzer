require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS and public folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Root route: show form
app.get('/', (req, res) => {
  res.render('index', { data: null, error: null });
});

// Analyze GitHub profile
app.get('/analyze', async (req, res) => {
  const username = req.query.username;

  try {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);

    const user = userRes.data;
    const repos = reposRes.data;

    // Language count
    const langCount = {};
    repos.forEach(repo => {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    });

    // Top 5 repos by stars
    const topRepos = repos
      .filter(r => r.stargazers_count > 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map(r => ({
        name: r.name,
        stars: r.stargazers_count,
        url: r.html_url
      }));

    res.render('index', {
      data: {
        user,
        repos,
        langCount,
        topRepos
      },
      error: null
    });

  } catch (err) {
    console.error('Error fetching GitHub data:', err.message);
    res.render('index', {
      data: null,
      error: 'GitHub user not found or API error occurred.'
    });
  }
});

// Start server (bind to 0.0.0.0 for external access on Render)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
