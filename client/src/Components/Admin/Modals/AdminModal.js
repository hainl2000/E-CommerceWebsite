import { Box, Modal } from "@material-ui/core"
import { useEffect } from "react"
import { useStyles } from "../style"
import AddModal from "./AddModal";
import EditModal from "./EditModal"

const AdminModal = ({add = false, edit = false, view = false, open = false, setOpen}) => {
    const classes = useStyles()

    const ViewModal = () => {
        return (
            <Box className={classes.modalContainer}>
                View
            </Box>
        )
    }
    
    const ModalContent = () => {
        if (add)
            return <AddModal/>

        if (edit)
            return <EditModal/>

        if (view)
            return <ViewModal/>

        return <></>
    }
    
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <>
                {ModalContent()}
            </>
        </Modal>
    )
}

export default AdminModal