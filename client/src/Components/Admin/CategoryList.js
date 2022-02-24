import {
    Box,
    FormControl,
    TextField,
    InputAdornment,
    Typography,
    Modal,
    Chip
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import { useStyles } from './style';
import { allCategoriesSelector } from '../../Selectors/categorySelector';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../../Actions/adminActions';
import RemoveConfirm from './Modals/removeConfirm';
import { useEffect, useState } from 'react';

const CategoryList = ({ setOpenModal, setModalType }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [id, setID] = useState(undefined)
    const [productList, setList] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const products = useSelector(allCategoriesSelector)

    const openViewHandle = () => {
        setModalType('view')
        setOpenModal(true)
    }
    const openEditHandle = (product) => {
        dispatch(selectProduct(product))
        setModalType('edit')
        setOpenModal(true)
    }
    const openAddModal = () => {
        setModalType('add')
        setOpenModal(true)
    }

    const searchHandle = () => {
        if (searchValue !== '')
        {
            setList(products.filter(product => product.nameProduct.toLowerCase().includes(searchValue.toLowerCase()) || product.description.toLowerCase().includes(searchValue.toLowerCase())))
        }else{
            setList(products)
        }
    }

    useEffect(() => {
        setList(products)
    }, [products])

    useEffect(() => {
        searchHandle()
    }, [searchValue])

    return (
        <>
            <Box className={classes.tool}>
                <FormControl className={classes.form}>
                    <TextField
                        variant='outlined'
                        size='small'
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon className={classes.searchIcon} onClick={searchHandle}/>
                                </InputAdornment>
                            )
                        }}
                    />
                </FormControl>
                <AddBoxIcon fontSize="large" className={classes.icon} onClick={openAddModal}/>
            </Box>
            <Box className={classes.panels}>
                {productList.map((product, index) => 
                    <Typography key={index}>{product.nameCategory}</Typography>
                )}
            </Box>
            <Modal
                open={id !== undefined}
                onClose={() => setID(undefined)}
            >
                <>
                    <RemoveConfirm id={id} setID={setID}/>
                </>
            </Modal>
        </>
    )
}

export default CategoryList