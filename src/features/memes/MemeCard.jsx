import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Container, Divider, FormControlLabel, ImageListItem, Link, Paper, Typography } from '@mui/material';
import { Favorite, FavoriteBorder, Comment } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

function MemeCard({
    id="#", 
    title, 
    image, 
    poster,
    posterId,
    voteCount=0, 
    commentCount=0, 
    isVotedByUser=false, 
    voteHandler, 
    isToggling, 
    cardSize="sm",
    handleDelete,
    userId,
    isAuthenticated
}) {

    let navigate = useNavigate();
    
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
                            <Checkbox 
                                onClick={voteHandler} 
                                icon={<FavoriteBorder />} 
                                checkedIcon={<Favorite />} 
                                checked={isVotedByUser} 
                                disabled={isToggling}    
                            />
                        }
                        label={voteCount}
                        labelPlacement="end"
                    />

                    <FormControlLabel
                        value="top"
                        control={ 
                            <Checkbox 
                                onClick={()=>navigate(`/memes/${id}/comments`)} 
                                icon={<Comment />} 
                                checkedIcon={<Comment />}
                            />
                        }
                        label={`${commentCount} ${commentCount === 1 ? 'Comment' : 'Comments'}`}
                        labelPlacement="end"
                    />

                    {(isAuthenticated && userId === posterId) &&
                        <Button
                            size="small"
                            color="error"
                            onClick={handleDelete}
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                    }
                       
                    
                </ImageListItem>
                <Divider sx={{ bgcolor: 'secondary.main', mt: 1}}/>
            </Paper>
            
        </Container>   
    );
}

export default MemeCard;