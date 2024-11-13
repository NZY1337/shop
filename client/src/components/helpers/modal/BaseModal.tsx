import React from 'react';
import { Typography, Box, Modal, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';

// https://github.com/sdras/hero-generator?tab=readme-ov-file
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "35%",
    backgroundColor: 'rgb(15, 18, 20)',
    backgroundImage: 'radial-gradient(120% 140% at 50% 10%, transparent 30%, rgba(0, 59, 117, 0.3) 80%)',
    boxShadow: 24,
    borderRadius: '5px',
    border: '1px solid rgba(61, 71, 81, 0.3)',
    p: 4,
    color: '#fff',
    outline: 'none',
    borderImage: 'initial', 
};

interface BaseModalProps {
    children: React.ReactNode;
    handleOpen: (E: React.MouseEvent) => void;
    handleClose: () => void;
    open: boolean;
    selectedIndex: number | null;
}

const BaseModal: React.FC<BaseModalProps> = ({ children, handleOpen, handleClose, open, selectedIndex }) => {
    return (
        <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
            <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h4" component="h2" sx={{color: "orange", fontWeight: 'bold', textAlign: 'center' }}>
                    Grid {selectedIndex}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item size={{xl: 12 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Title"
                            placeholder="Type something..."
                            sx={{
                                '& .MuiInputBase-root': {
                                    color: '#fff', // Text color
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#fff', // Label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'primary.main', // Label color when focused
                                },
                            }}
                        />
                    </Grid>
                    <Grid item size={{xl: 12 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Subtitle"
                            placeholder="Type something..."
                            sx={{
                                '& .MuiInputBase-root': {
                                    color: '#fff', // Text color
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#fff', // Label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'primary.main', // Label color when focused
                                },
                            }}
                        />
                    </Grid>

                    <Grid sx={{flexDirection: 'column', display: 'flex', }} item size={{xl: 12}}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            variant="outlined"
                            label="Description"
                            placeholder="Type something..."
                            sx={{
                                '& .MuiInputBase-root': {
                                    color: '#fff', // Text color
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#ccc',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                                '& .MuiInputLabel-root': {
                                    color: '#fff', // Label color
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'primary.main', // Label color when focused
                                },
                            }}
                        />

                        <Button variant="contained" sx={{ mt: 2 }}>Save</Button>
                    </Grid>
                </Grid>
            </Box> 
        </Modal>
    );
};

export default BaseModal;