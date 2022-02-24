import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(() => ({
    modalContainer: {
        width: 300,
        height: 400,
        marginTop: 100,
        borderRadius: 5,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    modalTitle: {
        paddingTop: 60,
        paddingBottom: 30,
        fontFamily: 'Roboto'
    },
    form: {
        width: '90%',
        '& > .MuiFormControl-root': {
            marginBottom: 20
        }
    },
    loginButton: {
        background: '#802feb',
        color: '#fff',
        width: 150,
        borderRadius: 20,
        marginTop: 20,
        transition: 'background 500ms',
        '&:hover': {
            background: '#5619a6'
        }
    },
    switchModalLink: {
        fontWeight: 'bold',
        position: 'absolute',
        fontSize: 15,
        bottom: 10,
        cursor: 'pointer',
        transition: 'color 250ms',
        '&:hover': {
            color: '#555'
        }
    },
    eyeIcon: {
        cursor: 'pointer'
    },
    errorMessage: {
        color: '#ff0000',
        fontSize: 'small',
        position: 'absolute',
        bottom: 80
    }
}))