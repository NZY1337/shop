import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((ctx) =>
    createStyles({
        toggler: {
            '& p': {
                color: 'orange',
                fontWeight: 'bold',
            }
        },
        container: {
            backgroundColor: 'transparent',
            color: 'white',
            '& .MuiListItemIcon-root': {
                color: 'inherit',
            },
            '& .MuiListItemText-root': {
                color: 'inherit',
                
                '& *': {
                    fontWeight: 'normal',
                }
            },
            '& .MuiDivider-root': {
                backgroundColor: 'inherit',
                opacity: 'inherit'
            },
            '& .MuiPaper-root': {  
                background: 'rgb(63,94,251)',
                background: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(84,51,58,1) 100%)',
                color: 'lightgray',
            },
            '& .MuiBox-root': {
                display: 'flex',
                flexDirection: 'column',
                height:'100%' // 'inherit'
            },
            '& .MuiButtonBase-root.drawer-action-button': {
                alignSelf: 'flex-center',
                margin: '1rem',

                '&:hover': {
                    backgroundColor: 'orange',
                }
            }
        },
        drawerList: {
            
        }
    })
);

export default useStyles;