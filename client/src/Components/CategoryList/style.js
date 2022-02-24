import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles(() => ({
    category: {
        marginTop: 10,
        marginBottom: 30
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        '& > p': {
            cursor: 'pointer'
        }
    },
    categoryItem: {
        display: 'flex',
        paddingLeft: 30,
        maxWidth: '100%',
        flexShrink: 0,
        flexFlow: 'row',
        paddingBottom: 10,
        overflowX: 'auto',
        marginTop: 10,
        '&::-webkit-scrollbar': {
            height: 8,
            backgroundColor: '#fafbfc'
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgb(145, 145, 145)'
        }
    }
}))