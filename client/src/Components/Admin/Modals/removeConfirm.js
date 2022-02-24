import { Box, Button, Typography } from "@material-ui/core"
import { removeProduct } from "../../../Actions/adminActions"
import { useStyles } from "../style"

const RemoveConfirm = ({ id, setID }) => {
    const classes = useStyles()

    const cancelHandle = () => {
        setID(undefined)
    }

    const submitHandle = () => {
        removeProduct(id)
    }

    return (
        <Box className={classes.confirmModal}>
            <Typography>{`Xác nhận xóa sản phẩm có ID: ${id}`}</Typography>
            <Button color="primary" variant="contained" onClick={cancelHandle}>Hủy</Button>
            <Button color="secondary" variant="contained" onClick={submitHandle}>Xác nhận</Button>
        </Box>
    )
}

export default RemoveConfirm