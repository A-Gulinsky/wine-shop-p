import { Router } from "express"; 

const articlePage = new Router()

articlePage.get('/articles', async(req, res) => {

  res.render('article', {
    layout: 'article',
    user: req.session.user,
    page: `article`,
  });
  
});

export default articlePage