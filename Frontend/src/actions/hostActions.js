import axios from "../config/axios";
import { activeSpaceDataReq, activeSpaceDataSuccess, activeSpaceDataFail } from "../features/adminSlice/activeSpaceDataSlice";
import { hostUploadReq, hostUploadSuccess, hostUploadFail } from "../features/hostSlice/hostUploadSlice";

export const SpaceUpload  = (HostId, imageUrl, Title, Address, Discription, Price, isCheckedwifi, isCheckedparking, isCheckedtv, isCheckedkitchen, isCheckedentrance, countAdult, countChildren, countPets, hostcoord, inputValue) => async (dispatch, getState) => {
    try {
        dispatch(hostUploadReq());
        const {
            userLogin: { userInfo },
          } = getState();
        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
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
            countPets,
            hostcoord,
            inputValue
        }, config)
        if(data){
            dispatch(hostUploadSuccess(data))
        }
        console.log("Actions Host data", data);
    }
    catch (error) {
        console.log(error.message);
    }
}
