import axios from "../config/axios";


export const SpaceUpload  = (HostId, imageUrl, Title, Address, Discription, Price, isCheckedwifi, isCheckedparking, isCheckedtv, isCheckedkitchen, isCheckedentrance, countAdult, countChildren, countPets) => async (dispatch) => {
    try {
        console.log('img',imageUrl);
        const { data } = await axios.post('/api/host/spaceupload', {
            HostId,
            imageUrl,
            Title,
            Address,
            Discription,
            Price,
            isCheckedwifi,
            isCheckedparking,
            isCheckedtv,
            isCheckedkitchen,
            isCheckedentrance,
            countAdult,
            countChildren,
            countPets
        })
        console.log("Actions Host data", data);
    }
    catch (error) {
        console.log(error.message);
    }
}