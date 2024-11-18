import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            backgroundColor: 'red',
        },
        title: {
            marginBottom: 10,
            color: '#fff',
        },
        header: {
            marginBottom: 10,
            color: '#fff',
        },
        container: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
            alignItems: 'center',
            height: '100vh',
            maxWidth: '100%',
            overflow: 'hidden',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://images.pexels.com/photos/2267157/pexels-photo-2267157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        content: {
            position: 'relative',
            zIndex: 1,
        },
        box: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
        nav: {
            flexGrow: 1,
        },
        navTitle: {
            flexGrow: 1,
            color: '#fff',
        },
        columnParent: {
            padding: 10
        },
        columnChild: {
           
        }
    })
);

export default useStyles;