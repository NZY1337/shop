import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((ctx) =>
    createStyles({
        container: {
            backgroundColor: 'transparent!important',
            boxShadow: 'none!important',
            position: 'fixed',
            marginTop: '2rem',
            
            '& .MuiButtonBase-root': {
                '&:hover': {   
                    backgroundColor: 'rgba(0, 0, 0, 0.0)',
                },

                '& .MuiLink-root': {
                    backgroundColor: 'none!important',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    color:'lightgray',
                    
                    '&:hover': {   
                        color: 'gray',
                    },
                },
            },

            '& button': {
                outline: 'none'
            }
        },

        toolbar: {
            padding: 0, 
            display: 'flex', 
            justifyContent: 'space-between',

            '& .nav-logo > *': {
                color: 'orange',
                fontWeight: 'bold',
            },
        },
        
        hiUser: {
            '& .MuiTypography-root.MuiLink-root': {
                color: 'orange',
                fontWeight: 'bold',

                '&:hover': {   
                    color: 'orange',
                    opacity: '.8'
                },
            }
        }
        
    })
);

export default useStyles;