import React, {useEffect} from "react";
import firebase from "firebase";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Button } from '@material-ui/core';




function Upload({setImg}) {

  const [file, setFile] = React.useState("");


  const handleUploading = (e) => {
    console.log("uploading start")
    setFile(e.target.files[0]) 
}

useEffect(() => {
  if(file)
  {
     handleUpload();
  }

}, [file])




  function handleUpload() {
    console.log("uploading2")
    let bucketName = "images"
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
    let uploadTask = storageRef.put(file)

  
    uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        null,
        null, 
        () => {
            //console.log("Uploaded")
            showImage();
    })
  }

   const showImage = () => {
    let storageRef = firebase.storage().ref()
     storageRef.child("images/"+file.name).getDownloadURL().then((url)=> {
        //console.log(url);
        setImg(url);
    })}

   

  return (
    <div id="upload-box">
      {/* <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p> */}
      {/* {file && <ImageThumb image={file} />} */}


      <Button  component="label" style={{marginTop:"6px"}}>
            <input type="file" multiple={false} hidden onChange={handleUploading} />   
            <AttachFileIcon/>
      </Button>

    </div>
  );
}



// const ImageThumb = ({ image }) => {
//   return <img src={URL.createObjectURL(image)} alt={image.name} />;
// };


export default Upload;