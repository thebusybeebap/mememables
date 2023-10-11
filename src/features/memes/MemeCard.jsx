import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Divider, ImageListItem, Link, Paper, Typography } from '@mui/material';

function MemeCard({id="#", title, image, poster, cardSize="sm"}) {

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
                    
                </ImageListItem>
                <Divider sx={{ bgcolor: 'secondary.main', mt: 1}}/>
            </Paper>
            
        </Container>   
    );
}

export default MemeCard;