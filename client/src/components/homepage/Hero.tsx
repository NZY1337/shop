import React from 'react';
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Navigation from '../navigation';
import useHeroStyle from './style';

// https://github.com/sdras/hero-generator?tab=readme-ov-file

const Hero: React.FC = () => {
    const classes = useHeroStyle();
    
    return (
        <Container maxWidth={false} className={classes.container}>
            <Navigation />
            <Container>
                <Grid container spacing={2} alignItems={"end"} justifyContent={"space-between"}>
                    <Grid size={{  md:7 }}>
                        <Typography variant="h1" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum consequatur blanditiis vero asperiores, dolorem fugit sint, rem tempore!
                            Odit numquam beatae eum consequatur blanditiis vero asperiores, dolorem fugit sint, rem tempore!
                        </Typography>
                    </Grid>
                    
                    {/* <Grid size={{ lg: 4 }}>
                        <Typography variant="body1" className={classes.header}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit numquam beatae eum consequatur!
                        </Typography>
                    </Grid> */}
                </Grid>
            </Container>
        </Container>
    );
};

export default Hero;
