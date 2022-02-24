import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    FormControl,
    Typography,
    TextField,
    InputAdornment,
    Box,
    Select,
    MenuItem,
    Button
} from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import RemoveIcon from '@material-ui/icons/Remove';

import { allCategoriesSelector } from '../../../Selectors/categorySelector'
import { productSelector } from '../../../Selectors/adminSelector';
import { updateProduct } from '../../../Actions/adminActions'
import { useStyles } from '../style'

const EditModal = () => {
    const classes = useStyles()
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [imageURL, setImageUrl] = useState('')
    const [description, setDescription] = useState('')
    const [imageList, setImageList] = useState([])
    const [selectedCate, setSelectedCate] = useState(0)

    const cate = useSelector(allCategoriesSelector)
    const data = useSelector(productSelector)

    useEffect(() => {
        setSelectedCate(cate.findIndex(c => c._id === data.category))
    }, [cate, data])
    
    const discardImageHandle = (index) => {
        const newList = imageList.filter((image, _index) => index !== _index)

        setImageList(newList)
    }

    const addImageHandle = () => {
        setImageList([...imageList, { url: imageURL }])
        setImageUrl('')
    }

    const submitHandle = () => {
        updateProduct({
            id: data._id,
            nameProduct: name,
            imageURL: imageList[0]?.url,
            quantity: quantity,
            price: price,
            category: cate[selectedCate]._id,
            description: description
        })
    }

    useEffect(() => {
        setName(data.nameProduct)
        setQuantity(data.quantity)
        setPrice(data.price)
        setImageList([...imageList, { url: data.imageURL }])
        setDescription(data.description)
    }, [data])

    return (

        <Box className={classes.modalContainer}>
            <Box className={classes.upperInformation}>
                <Box>
                    <Typography>
                        Thêm sản phẩm
                    </Typography>
                    <FormControl>
                        <Typography>
                            Tên sản phẩm:
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="tên sản phẩm"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <Typography>
                            Số lượng:
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="số lượng"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <Typography>
                            Giá:
                        </Typography>
                        <TextField
                            variant="outlined"
                            size="small"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </FormControl>
                    <FormControl variant="outlined" size="small">
                        <Typography>Loại:</Typography>
                        <Select
                            value={selectedCate}
                            onChange={e => setSelectedCate(e.target.value)}
                        >
                            {cate.map((c, index) => (<MenuItem key={index} value={index}>{c.nameCategory}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Box className={classes.imagesList}>
                        <Typography>
                            Link ảnh
                        </Typography>
                            {imageList.map((image, index) => (
                                <TextField
                                    disabled
                                    key={index}
                                    variant="outlined"
                                    size="small"
                                    value={image.url}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <RemoveIcon onClick={() => discardImageHandle(index)}/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )
                        )}
                        </Box>
                        <TextField
                            className={classes.addField}
                            variant="outlined"
                            size="small"
                            value={imageURL}
                            onChange={e => setImageUrl(e.target.value)}
                            onKeyUp={e => {
                                if (e.key === 'Enter')
                                    addImageHandle(imageURL)
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <AddBoxIcon onClick={addImageHandle}/>
                                    </InputAdornment>
                                )
                            }}   
                        />
                </Box>
            </Box>
            <Box className={classes.bottomContainerAddForm}>
                <Box>
                    <TextField
                        className={classes.addField}
                        variant="outlined"
                        size="small"
                        minRows={5}
                        multiline
                        placeholder="Mô tả"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Box>
                <Box className={classes.addFormSaveBtn}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={submitHandle}
                    >Save</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default EditModal