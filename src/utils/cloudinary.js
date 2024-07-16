

const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: "dyll9op2l", 
    api_key: "971163875934245", 
    api_secret: "ZmVhK5ScqdmgkS__NXHCtipWC24" // Click 'View Credentials' below to copy your API secret
});

const fileupload = async(folderName, imgUrl) =>{

    try {
        const uploadResult = await cloudinary.uploader.upload(imgUrl, {
            folder : folderName
        }).catch((error)=>{console.log(error)});
        // console.log(uploadResult);

        return uploadResult
    } catch (error) {
        console.log(error);
    }

}

module.exports = fileupload;
