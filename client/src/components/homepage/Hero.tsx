import React, {useState, useEffect} from 'react';
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Navigation from '../navigation';
import useHeroStyle from './style';

// https://github.com/sdras/hero-generator?tab=readme-ov-file

const Hero: React.FC = () => {
    const classes = useHeroStyle();
    const [gridSpacing, setGridSpacing] = useState<number>(2);

    const onHandleIncreaseGridSpacing = (value: 'inc' | 'dec') => {
        setGridSpacing(spacing => {
            if (value === 'dec' && spacing > 2) {
                return spacing - 1;
            } else if (value === 'inc') {
                return spacing + 1;
            }
            return spacing;
        });
    }
    
    return (
        <Container maxWidth={false} className={classes.container}>
            <Navigation />

            <Container>
                <Grid container spacing={gridSpacing} alignItems={"end"} justifyContent={"space-between"}>
                    <Grid size={{  md:4 }}>
                        <Typography variant="h4" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum.
                            Odit numquam beatae eum.
                        </Typography>
                    </Grid>
                    
                    <Grid size={{ md:4 }}>
                        <Typography variant="h4" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum.
                            Odit numquam beatae eum.
                        </Typography>
                    </Grid>
                    
                    <Grid size={{  md:4 }}>
                        <Typography variant="h4" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum.
                            Odit numquam beatae eum.
                        </Typography>
                    </Grid>

                    <Grid size={{ md:4 }}>
                        <Typography variant="h4" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum.
                            Odit numquam beatae eum.
                        </Typography>
                    </Grid>

                    <Grid size={{  md:4 }}>
                        <Typography variant="h4" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum.
                            Odit numquam beatae eum.
                        </Typography>
                    </Grid>

                    <Grid size={{ md:4 }}>
                        <Typography variant="h4" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum.
                            Odit numquam beatae eum.
                        </Typography>
                    </Grid>

                    <Grid size={{  md:4 }}>
                        <Typography variant="h4" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum.
                            Odit numquam beatae eum.
                        </Typography>
                    </Grid>
                    
                    <Grid size={{  md:4 }}>
                        <Typography variant="h4" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum.
                            Odit numquam beatae eum.
                        </Typography>
                    </Grid>

                    <Grid size={{  md:4 }}>
                        <Typography variant="h4" className={classes.title}>
                            Hello,
                        </Typography>
                        <Typography variant="body1" className={classes.header}>
                            We are <Typography variant='caption' sx={{ color: 'orange', fontWeight: 'bold', fontSize: 'inherit' }}>ipsum dolor sit</Typography>, amet consectetur adipisicing elit. Odit numquam beatae eum.
                            Odit numquam beatae eum.
                        </Typography>
                    </Grid>
                </Grid>

                <Button variant="contained" onClick={() => onHandleIncreaseGridSpacing('inc')}>Increase</Button>
                <Button variant="contained" onClick={() => onHandleIncreaseGridSpacing('dec')}>Decrease</Button>
                <Typography variant="h2" color={"danger"}>{gridSpacing}</Typography>
            </Container>
        </Container>
    );
};

export default Hero;
