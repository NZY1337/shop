import React, { useState, MouseEvent } from 'react';
import { Container, Typography, Box, } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Navigation from '../navigation';
import useHeroStyle from './style';
import { DataArray } from './types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; 
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BaseModal from '../helpers/modal/BaseModal';
import settings from './settings.tsx'

// https://github.com/sdras/hero-generator?tab=readme-ov-file

interface HeroProps {
    handleOpen: (e: MouseEvent) => void;
    handleClose: () => void;
    open: boolean;
    onHandleAddGridSpacing: (value: 'inc' | 'dec') => void;
    gridSpacing: number;
}

const iconMapping = {
    AddIcon: AddIcon,
    DeleteIcon: DeleteIcon,
    AddCircleIcon: AddCircleIcon,
  };

const Hero: React.FC<HeroProps> = ({ handleOpen, handleClose, open, gridSpacing }) => {
    const classes = useHeroStyle();
    const [data, setData] = useState<DataArray>(settings);

    // const handleDeleteColumn = (id: number) => {
    //     setColumnData(prev => prev.filter((column, i) => column.id !== id));
    // };

    return (
        <Container maxWidth={false} className={classes.container}>
            <Navigation />

            <Container>
                {data?.grid?.map((item, groupIndex) => {
                    if (item.container?.columns?.length > 0) {
                        return (
                            <Grid className={classes.columnParent} sx={item.container?.containerSettings.sx} container spacing={gridSpacing} key={groupIndex + 1}>
                                {item.container.columns.map((column, index) => {
                                    const IconComponent = iconMapping[column.columnButton.hasIcon.icon];
                                    const iconPosition = column.columnButton.hasIcon; 

                                    return (
                                        <Grid size={column.breakPoints} item className={classes.columnChild} sx={column.columnSettings} key={index}>
                                            {/* <Box className="columnControls"> 
                                                <AddIcon  
                                                    onClick={(e) => {
                                                        setSelectedIndex(index + 1);    
                                                        handleOpen(e);
                                                    }} 
                                                />
                                                <DeleteIcon onClick={() => handleDeleteColumn(item.id)} />
                                            </Box> */}
                                            {column.columnImage.enabled && (
                                                <img src={column.columnImage.url} alt="hero" style={column.columnImage.sx} />
                                            )}

                                            {column.columnTitle.enabled && (
                                                <Typography variant={column.columnTitle.variant} sx={column.columnTitle.sx}>
                                                    {column.columnTitle.text}
                                                </Typography>
                                            )}
                                                                                
                                            {column.columnSubtitle.enabled && (
                                                <Typography variant={column.columnSubtitle.variant} sx={column.columnSubtitle.sx}>
                                                    {column.columnSubtitle.text}
                                                </Typography>
                                            )}
                                            
                                            {column.columnDescription.enabled && (
                                                <Typography variant={column.columnDescription.variant} sx={column.columnDescription.sx}>
                                                    {column.columnDescription.text}
                                                </Typography>
                                                )
                                            }   
                                            
                                            {column.columnButton.enabled && (
                                                    <Button 
                                                        sx={{
                                                            ...column.columnButton.sx,
                                                            ...column.columnButton.getButtonStyles(iconPosition),
                                                        }} 
                                                        variant={column.columnButton.variant}
                                                    >
                                                        <Typography>{column.columnButton.text}</Typography>
                                                        {column.columnButton.hasIcon.enabled && ( 
                                                            <IconComponent />
                                                        )}
                                                    </Button>
                                                )
                                            }
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        );
                    } 
                })}

                {/* 
                <Button variant="contained" onClick={() => onHandleAddGridSpacing('inc')}>Increase</Button>
                <Button variant="contained" onClick={() => onHandleAddGridSpacing('dec')}>Decrease</Button> */}
                {/* <Typography variant="h2" color={"danger"}>{gridSpacing}</Typography> */}

                <BaseModal selectedIndex={1} handleOpen={handleOpen} handleClose={handleClose} open={open} >
                </BaseModal>

            </Container>
        </Container>
    );
};

export default Hero;
