require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index', { data: null }));

app.get('/analyze', async (req, res) => {
  const username = req.query.username;
  try {
    const user = await axios.get(`https://api.github.com/users/${username}`);
    const repos = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
    
    // Analyze languages
    const langCount = {};
    repos.data.forEach(repo => {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    });

    // Top 5 repos by stars
    const topRepos = repos.data
      .filter(r => r.stargazers_count > 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map(r => ({
        name: r.name,
        stars: r.stargazers_count
      }));

    res.render('index', {
      data: {
        user: user.data,
        repos: repos.data,
        langCount,
        topRepos
      }
    });

  } catch (err) {
    res.render('index', { data: null, error: 'User not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
