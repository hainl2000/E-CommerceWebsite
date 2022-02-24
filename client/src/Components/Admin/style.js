import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    tabs: {
        marginBottom: 20
    },
    panels: {
        display: 'flex',
        flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // overflowY: 'auto',
        // flex: '1 1 auto',
    },
    panelContainer: {
        padding: 10,
        boxSizing: 'border-box',
        // display: 'flex',
        // flexFlow: 'column',
        height: 'calc(100vh - 100px)',
        // background: '#eee',
        flex: '1 1 auto',
    },
    productCell: {
        border: '1px solid #aaa',
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        borderRadius: 5,
        width: '49%'
    },
    tool: {
        background: '#d8e0e6',
        padding: 15,
        borderRadius: 10,
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center'
    },
    form: {
        width: '85%',
        '& .MuiInputBase-root': {
            background: '#fff'
        }
    },
    searchIcon: {
        cursor: 'pointer'
    },
    productInfo: {
        flexGrow: 2
    },
    icon: {
        cursor: 'pointer',
        marginLeft: 10
    },
    modalContainer: {
        width: 800,
        height: 500,
        margin: 'auto',
        marginTop: 100,
        borderRadius: 5,
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inboxContainer: {
        display: 'flex',
        // background: '#aaa',
        maxHeight: 'calc(100vh - 100px)',
        height: 'calc(100vh - 100px)',
        overflow: 'auto',
    },
    inboxList: {
        width: 300,
        overflow: 'auto',
        maxHeight: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        boxSizing: 'border-box'
    },
    inboxWindow: {
        flexGrow: 1,
        paddingLeft: 5,
        paddingRight: 5
    },
    userCell: {
        background: '#555',
        borderRadius: 10,
        marginBottom: 5,
        paddingTop: 10,
        display: 'flex',
        paddingBottom: 10,
        paddingLeft: 10,
        alignItems: 'center',
        '& > p': {
            marginLeft: 10
        }
    },
    userInfo: {
        width: 400,
        // background: '#555'
    },
    avatar: {
        width: 100,
        height: 100,
        fontSize: 50,
        margin: 'auto',
        marginBottom: 20
    },
    avatarContainer: {
        paddingTop: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    textBubleCustomer: {
        background: '#f54242',
        padding: 10,
        borderRadius: 10,
        color: '#fff',
        marginBottom: 5
    },
    textBubleAdmin: {
        background: '#a8ffc8',
        padding: 10,
        borderRadius: 10,
        color: '#000',
        marginBottom: 5,
        textAlign: 'right'
    },
    textContainer: {
        height: '90%',
        overflow: 'auto',
        marginBottom: 10,
        paddingRight: 5
    },
    inboxForm: {
        width: '100%',
        '& .MuiInputBase-root': {
            background: '#fff'
        }
    },
    admin_navbar: {
        display: 'flex',
        alignItems: 'center'
    },
    admin_action: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'end',
        paddingRight: 30,
        '& > button': {
            textTransform: 'none'
        }
    },
    admin_avatar: {
        marginRight: 10
    },
    loginModalContainer: {
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
    loginForm: {
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
    },
    addForm: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageTitle: {
        display: 'flex',
        flexDirection: 'row'
    },
    imagesList: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 200,
        overflow: 'auto',
        '& > div': {
            marginBottom: 5
        }
    },
    bottomContainerAddForm: {
        display: 'flex',
        width: '90%',
        '& > div': {
            flexGrow: 1
        }
    },
    addField: {
        width: '100%'
    },
    addFormSaveBtn: {
        textAlign: 'center'
    },
    upperInformation: {
        display: 'flex',
        width: '90%',
        height: 350,
        '& > div': {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 20
        }
    },
    confirmModal: {
        background: '#fff',
        width: 400,
        textAlign: 'center',
        padding: 20,
        margin: 'auto',
        marginTop: 250,
        '& > button': {
            marginTop: 20,
            marginRight: 10,
            marginLeft: 10,
            width: 150
        }
    }
}))