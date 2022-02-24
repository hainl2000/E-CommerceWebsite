import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
    root: {
        background: 'inherit',
        display: 'flex',
        height: 'calc(100% - 64px)'
    },
    cartItem: {
        flexGrow: 3,
        paddingLeft: 20,
        paddingRight: 30,
        '& > .MuiDivider-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }
    },
    payment: {
        flexGrow: 1,
        height: '100%',
        background: '#f0f5f4',
        paddingLeft: 20,
        paddingRight: 20,
    },
    cartHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingTop: 20
    },
    dataContainer: {
        overflow: 'auto'
    },
    table: {
        maxHeight: '75vh'
    },
    quantityCell: {
        display: 'flex',
        '& > p':
        {
            marginLeft: 10,
            marginRight: 10
        }
    },
    totalPaymentInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 20
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    shippingInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
    },
    total: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    payButton: {
        marginTop: 20,
        textAlign: 'center',
        '& > button': {
            width: '100%',
            height: 50,
            backgroundColor: '#7a53db'
        }
    },
    productInfo: {
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        maxWidth: 300,
        width: 300
    }
}))