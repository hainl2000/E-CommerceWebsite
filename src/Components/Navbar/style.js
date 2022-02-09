import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        '& > .MuiAppBar-colorPrimary': {
            color: '#000',
            backgroundColor: '#fff'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'end'
    },
    formContainer: {
        flexGrow: 2,
        '& > .MuiFormControl-root': {
            width: '70%'
        },
        display: 'flex',
        justifyContent: 'center'
    },
    searchButton: {
        cursor: 'pointer'
    },
    avatar: {
        marginLeft: 15,
        marginRight: 45,
        cursor: 'pointer'
    },
    menuItem: {
        border: '1px solid #d3d4d5'
    },
    cartIcon: {
        marginLeft: 0
    },
    cartIcon_extend: {
        marginLeft: 48
    },
    button: {
        width: 100
    },
    drawer: {
        width: 400,
        height: '100%',
        boxSizing: 'border-box',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 15,
        background: '#f2ebeb'
    },
    textContainer: {
        marginTop: 20,
        height: '80vh',
        overflowY: 'auto',
        paddingLeft: 5,
        paddingRight: 5
    },
    inboxForm: {
        marginTop: 20,
        width: '100%',
        background: '#ffffff'
    },
    sendIcon: {
        cursor: 'pointer'
    },
    textBubble_customer: {
        background: '#a8ffc8',
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        textAlign: 'right'
    },
    textBubble_admin: {
        background: '#ff7373',
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        color: '#fff'
    },
    scrollToTopButton: {
        position: 'fixed',
        bottom: 50,
        right: 10,
        background: 'rgba(200,200,200,0.5)',
        transition: 'background 250ms',
        '&:hover': {
            background: 'rgba(250, 250, 250, 0.7)'
        }
    }
}))