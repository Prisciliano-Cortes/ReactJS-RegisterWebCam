
export const profileUpload = (e, setUrlFile, setFile) => {
    let localFile = e.target.files;
    let localFileReader = new FileReader();
    localFileReader.readAsDataURL(localFile[0]);
    const typeImg = e.target.files[0];

    if (typeImg.type.includes("image/png")) {
        if (localFileReader && localFile && localFile.length) {
            localFileReader.onload = function load() {
                setUrlFile(localFileReader.result);
            };

            //*** Prepare img for the storage */
            let fileList = e.target.files;
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(fileList[0]);
            fileReader.onload = function () {
                let imageData = fileReader.result;
                setFile(imageData);
            };
        }
    }
}