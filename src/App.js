import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from 'words-to-numbers'
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";

const alanKey =
  "c458f2ef98d5ee15bf2dc26c19d73cc82e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if(command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true}) : number;
          const article = articles[parsedNumber - 1];

          if(parsedNumber > 20) {
            alanBtn().playText('Please try that again.')
          } else if(article) {

            window.open(article.url, '_blank');
            alanBtn().playText('Opening...')
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        {" "}
        <img
          src="https://alan.app/brand_assets/logo-horizontal/color/alan-logo-horizontal-color.png"
          className={classes.alanLogo}
          alt="alan logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
