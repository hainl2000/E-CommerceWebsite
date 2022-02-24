import {
    Box,
    FormControl,
    TextField,
    InputAdornment,
    Typography,
    Modal
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useStyles } from './style';
import { activeProductsSelector } from '../../Selectors/productSelector';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from '../../Actions/adminActions';
import RemoveConfirm from './Modals/removeConfirm';
import { useEffect, useState } from 'react';

const ProductList = ({ setOpenModal, setModalType }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [id, setID] = useState(undefined)
    const [productList, setList] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const products = useSelector(activeProductsSelector)

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
                    <Box key={index} className={classes.productCell}>
                        <img src={product.imageURL} width={100} height={100} alt='product'/>
                        <Box className={classes.productInfo}>
                            <Typography variant='h6'>
                                {product.nameProduct}
                            </Typography>
                            <Box>
                                <Typography>
                                    {Intl.NumberFormat().format(product.price)} $
                                </Typography>
                                <Typography>
                                    {product.description}
                                </Typography>
                            </Box>
                        </Box>
                        <VisibilityIcon className={classes.icon} onClick={openViewHandle}/>
                        <EditIcon className={classes.icon} onClick={() => openEditHandle(product)}/>
                        <DeleteForeverIcon className={classes.icon} onClick={() => setID(product._id)}/>
                    </Box>
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

export default ProductList