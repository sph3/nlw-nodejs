import 'dotenv/config';
import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.get('/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
