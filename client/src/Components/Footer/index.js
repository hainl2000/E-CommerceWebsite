import {
    Box,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles(() => ({
    root: {
        background: '#000',
        height: 150,
        color: '#fff',
        paddingTop: 20,
        paddingLeft: 20,
    },
    contactItem: {
        marginRight: 10,
        cursor: 'pointer'
    },
    grid: {
        paddingLeft: 20
    }
}))

const Footer = () => {
    const classes = useStyles()

    return (
        <Box component='div' className={classes.root}>
            <Grid className={classes.grid} container>
                <Grid item xs={3}>
                    <Typography variant="h5">
                        App
                    </Typography>
                    <Typography>
                        Say something
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        Contact us
                    </Typography>
                    <Typography>
                        Email: abc@gmail.com
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <FacebookIcon className={classes.contactItem}/>
                    <InstagramIcon className={classes.contactItem}/>
                    <TwitterIcon className={classes.contactItem}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Footer