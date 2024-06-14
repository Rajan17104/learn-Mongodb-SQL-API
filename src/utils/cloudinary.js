

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
        console.log(uploadResult);

        return uploadResult
    } catch (error) {
        console.log(error);
    }

}

module.exports = fileupload;

// (async function() {

//     // Configuration
    
    
//     // Upload an image
//     const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//         public_id: "shoes"
//     }).catch((error)=>{console.log(error)});
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url("shoes", {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url("shoes", {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();