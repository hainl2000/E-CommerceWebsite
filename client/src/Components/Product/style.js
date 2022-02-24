import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(() => ({
    paper: {
        width: 1200,
        margin: 'auto',
        marginTop: 20,
        boxSizing: 'border-box',
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        height: 'calc(100vh - 100px)',
        borderRadius: 15,
        display: 'flex'
    },
    rightPanel: {
        paddingLeft: 100
    },
    gallery: {
        maxWidth: 400,
        display: 'flex',
        overflow: 'auto',
        flexShrink: 0,
        flexFlow: 'row',
        '& img': {
            border: '1px solid #aaa',
            marginRight: 1,
            flex: 'none'
        },
        '&::-webkit-scrollbar': {
            height: 8,
            backgroundColor: '#fafbfc'
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgb(145, 145, 145)'
        }
    },
    rating: {
        display: 'flex',
        '& > .MuiRating-root': {
            marginLeft: 5
        },
        '& > p': {
            marginRight: 5
        }
    },
    startIcon: {
        color: '#ffb400'
    },
    price: {
        color: '#ff6f00',
        fontSize: 40,
        marginBottom: 20,
        marginTop: 20,
    },
    description: {
        fontSize: 20,
    },
    buttonText: {
        marginRight: 5
    },
    buttonContainer: {
        marginTop: 150,
        textAlign: 'center',
        '& > button': {
            width: 300,
            height: 50,
            borderRadius: 25,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 20
        }
    },
    cardItem: {
        marginRight: 45,
        cursor: 'pointer',
        width: 200,
        flex: 'none',
        marginBottom: 10,
        marginTop: 10,
    },
    media: {
        height: 200,
        width: 200
    },
    content: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom: 5,
        justifyContent: 'space-between'
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 15
    },
    productRating: {
        paddingLeft: 5,
        marginRight: 20
    },
    container: {
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 20,
        '& > h5': {
            marginBottom: 10
        }
    },
    productList: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    itemPrice: {
        color: '#ff0000',
    }
}))