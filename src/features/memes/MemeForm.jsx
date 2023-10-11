import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

import { Box, Button, Container, ImageListItem, Input, Paper, Typography } from '@mui/material';

import Loader from '../../ui/Loader';
import { useUser } from '../authentication/useUser';
import { usePostMeme } from './usePostMeme';

function isValidFileType(fileType){
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/apng"];
    if (!allowedTypes.includes(fileType)) {
        return false;
    }
    return true;
}

function MemeForm() {
    let navigate = useNavigate();

    let [selectedImage, setSelectedImage] = useState();
    let [title, setTitle] = useState("");
    let [validFileType, setValidFileType] = useState(false);

    let { isLoading: isLoadingUser, user, isAuthenticated } = useUser();
    let { isPosting, postMeme } = usePostMeme();

    function imageChange(e){
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setValidFileType(isValidFileType(e.target.files[0].type));
        }
    };

    function removeSelectedImage(){
        setSelectedImage();
    };

    function resetFields(){
        setTitle("");
        setSelectedImage(undefined);
    }

    function handleSubmit(e){
        e.preventDefault();

        if(!user){
            navigate("/login");
            resetFields();
            return null;
        }
        if(title === "") return null;
        if(!isValidFileType(selectedImage?.type)) return null;

        postMeme(
            {
                title: title,
                image: selectedImage,
                user: user
            }
        );

        resetFields();
    }

    if(isPosting) return(<Loader loadingText="Posting your meme..."/>);

    if(isLoadingUser) return(<Loader loadingText="Loading user..."/>);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 3, borderRadius: 1, gap: 2}}
        >

                {(selectedImage && title && validFileType) 
                && <Button 
                    variant="contained" 
                    type='submit'
                    fullWidth
                    onClick={handleSubmit}
                    endIcon={<SendIcon />}
                >
                    Post
                </Button> }
                
                <Input 
                    id='title'
                    name='title'
                    autoFocus
                    required
                    placeholder="Name your Meme"
                    type="text"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    fullWidth
                    inputProps={{ maxLength: 50 }}
                />

                {selectedImage 
                    ? (<Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                            <Button
                                variant="text"
                                size="small"
                                onClick={removeSelectedImage}
                            >
                                Remove Image
                            </Button>
                        {validFileType ?
                            <Container maxWidth="sm" sx={{ mx: 'auto' }}>

                                <ImageListItem>
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Failed to load image"
                                        loading="lazy"
                                    />
                                </ImageListItem>

                            </Container>

                            :<Typography>Unsupported File Type</Typography>
                        }
                    </Box>)
                    : (<>
                        <Typography>Choose an Image to Upload</Typography>
                        
                        <Input
                            id='image-upload'
                            name='image-upload'
                            accept="image/*"
                            type="file"
                            onChange={imageChange}
                            style={{ display: 'none' }}
                        />

                        <label htmlFor="image-upload">
                            <Button 
                                sx={{ borderRadius: '20rem' }}
                                variant="contained"
                                color="primary"
                                component="span"
                            >
                                Choose An Image
                            </Button>
                        </label>
                    </>)
                }
        </Box>
    );
}

export default MemeForm;