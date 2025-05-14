require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Homepage
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

    // Count languages
    const langCount = {};
    repos.forEach(repo => {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    });

    // Get top 5 repos by stars
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
      data: { user, repos, langCount, topRepos },
      error: null
    });

  } catch (err) {
    res.render('index', { data: null, error: 'GitHub user not found.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
