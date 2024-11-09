import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            backgroundColor: 'transparent!important',
            boxShadow: 'none!important',
            position: 'fixed',

            '& .MuiLink-root': {
                textDecoration: 'none',
                
                '& a' : {
                    fontSize: '1.2rem',
                    color:'lightgray',

                    '&:hover': {   
                        color: 'gray'
                    },
    
                }
            }
        }
    })
);

export default useStyles;