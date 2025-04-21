import { toast,Bounce } from "react-toastify";
import moment from "moment";

const _ = {};
_.singUpdata = ()=>{
    const singUpItem = [
        {
            id: 1,
            name: "email"
        },
        {
            id: 2,
            name: "fullName"
        },
        {
            id: 3,
            name: "password"
        },
    ];
    return singUpItem;
}

_.SucessToast = (msg = "sucess msg Missing")=>{
    toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
}

_.ErorrToast = (msg="Eror here")=>{
    toast.error(msg, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
}

_.InfoToast =(msg= "info missing")=>{
    toast.info(msg , {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
};

_.getTimeNow = ()=>{
 return moment().format("DD MM YYYY hh:mm:ss")
 
}

export default _;