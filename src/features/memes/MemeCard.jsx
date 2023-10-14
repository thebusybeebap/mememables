import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Checkbox, Container, Divider, FormControlLabel, ImageListItem, Link, Paper, Typography } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

function MemeCard({id="#", title, image, poster, voteCount, isVotedByUser, cardSize="sm"}) {

    //baka dito na lang yung pag pull nung vote count at isVoted, maaccess na dito yung user id at meme id kasi loaded na
    //MERON DIN KASING INTERACTION DITO NA PAGUPDATE NUNG VALUES

    return(
        <Container maxWidth={cardSize} sx={{ mx: 'auto' }}>
            <Paper elevation={0} sx={{ p: 2 }}>
                <ImageListItem>
                    <Link 
                        gutterBottom
                        variant="h5"
                        underline="hover"
                        component={RouterLink}
                        to={`/memes/${id}`}
                    >
                        {title}
                    </Link>

                    <img
                        src={image}
                        srcSet={image}
                        alt={title}
                        loading="lazy"
                        objectfit="cover"
                    />

                    <Typography gutterBottom variant="subtitle1" component="div" color="secondary.contrast">
                        posted by: {poster}
                    </Typography>
                    <FormControlLabel
                        value="top"
                        control={ 
                            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={isVotedByUser} />
                        }
                        label={voteCount}
                        labelPlacement="end"
                    />
                       
                    
                </ImageListItem>
                <Divider sx={{ bgcolor: 'secondary.main', mt: 1}}/>
            </Paper>
            
        </Container>   
    );
}

export default MemeCard;