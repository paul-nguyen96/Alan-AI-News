import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import classNames from 'classnames';
import useStyles from './styles'

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage } , i , activeArticle}) => {
    const classes = useStyles();
    const [elementRefs, setElementRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
      setElementRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
    }, [])

    useEffect(() => {
      if(i === activeArticle && elementRefs[activeArticle]) {
        scrollToRef(elementRefs[activeArticle])
      }

    }, [i, activeArticle, elementRefs])

    return (
    <Card ref={elementRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage || 'https://p12cdn4static.sharpschool.com/UserFiles/Servers/Server_1023780/Image/News.jpg'}/>
        <div className={classes.details}>
          <Typography
            variant="body2"
            color="textSecondary"
            component="h2"
          >{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="h2"
          >{source.name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">Learn More</Button>
        <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
