import { Fragment, useState } from 'react';

import { useComments } from "./useComments";
import { Avatar, Box, Button, Container, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';;
import FaceIcon from '@mui/icons-material/Face';
import ClearIcon from '@mui/icons-material/Clear';
import SmallLoader from "../../ui/SmallLoader";
import { usePostComment } from './usePostComment';
import { useDeleteComment } from './useDeleteComment';
import { useNavigate } from 'react-router-dom';

function CommentsSection({user, isAuthenticated, autoFocus}) {
    let {isLoading, comments} = useComments();
    let {isPosting, postComment} = usePostComment();
    let { isDeleting, deleteComment } = useDeleteComment();
    let [commentText, setCommentText] = useState("");
    let navigate = useNavigate();


    function postCommentHanlder(userId){
        let text = commentText;
        if(!isAuthenticated){
            navigate("/login");
        }
        if(text === "" || text === undefined || !text.trim().length){
            return;
        }
        postComment({text, userId});
        setCommentText("");
    }

    function deleteCommentHandler(commentId){
        if(confirm("Are you sure you want to delete your comment?")){
            deleteComment(commentId);
        }
    }

    if(isLoading){
        return <SmallLoader/>;
    }

    return (
        <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}> 
            <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', gap: '10px'}}>    
                {isAuthenticated ?
                    (<Avatar
                        alt={user?.user_metadata?.full_name}
                        src={user?.user_metadata?.avatar_url}
                    />)
                    :
                    (<Avatar>
                        <FaceIcon/>
                    </Avatar>
                    )
                }

                <TextField
                    value={commentText}
                    onChange={(e)=>setCommentText(e.target.value)}
                    disabled={isPosting}
                    id="comment"
                    autoFocus={autoFocus}
                    fullWidth 
                    multiline
                    minRows={2}
                    maxRows={5}
                    placeholder="Type Your Comment Here..."
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>    

                <Button 
                    disabled={isPosting || !commentText}
                    variant="contained" 
                    onClick={()=>postCommentHanlder(user?.id)}
                >
                    Post
                </Button>
                
            </Box>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {comments.map((comment)=>{
                    return(
                        <Fragment key={comment.id}>
                            <ListItem alignItems="flex-start">

                                <ListItemAvatar>
                                    <Avatar alt={comment.full_name} src={comment.avatar_url} />
                                </ListItemAvatar>

                                <ListItemText
                                    primary={comment.full_name}
                                    secondary={comment.text}
                                />

                                {comment.full_name === user?.user_metadata?.full_name && 
                                    <IconButton aria-label="delete" size="small" onClick={()=>deleteCommentHandler(comment.id)}>
                                        <ClearIcon fontSize="inherit" />
                                    </IconButton>
                                }

                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    );
                })}

            </List>
        </Container>
    );
}

export default CommentsSection;