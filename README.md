# GitHub Profile Analyzer

An elegant web application that visualizes GitHub profile data using Chart.js and GitHub's public API. Built with Node.js, Express, and EJS.

## ✨ Features

- **Live GitHub Data**: Fetches real-time user information and repositories.
- **Language Usage Chart**: Displays repository language usage in a responsive pie chart.
- **Repository List**: Shows all public repositories with names and descriptions.
- **Percentage Breakdown**: Includes precise language usage percentages using `chartjs-plugin-datalabels`.
- **Clean UI**: Responsive, accessible, and mobile-friendly layout with modern design.

## 🚀 Getting Started

1. **Clone** this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/profile_analyzer.git
   cd profile_analyzer/github-analyzer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the app**:
   ```bash
   node app.js
   ```

4. **Visit the app**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

- [`app.js`](github-analyzer/app.js): Main server logic (Express).
- [`views/index.ejs`](github-analyzer/views/index.ejs): UI rendering with dynamic GitHub data.
- [`public/css/style.css`](github-analyzer/public/css/style.css): Styling for the profile card, chart, and layout.
- [`public/js/chart.js`](github-analyzer/public/js/chart.js): Chart.js and plugin config to show language usage percentages.

## 🛠️ Dependencies

- [Express](https://expressjs.com/) — Node.js web framework
- [EJS](https://ejs.co/) — Embedded JavaScript templating
- [Axios](https://axios-http.com/) — HTTP client for GitHub API
- [Chart.js](https://www.chartjs.org/) — JavaScript chart library
- [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/) — Percentage labels in pie chart

## 🔑 Configuration

- **Environment Variables (optional)**  
  Create a `.env` file in the root:
  ```env
  PORT=3000
  ```

## 🌍 Deployment

Deploy this app easily using [Render](https://render.com):

- **Build Command**: `npm install`
- **Start Command**: `node app.js`
- **Root Directory**: `github-analyzer` (if applicable)
