
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
);

const inputElement = document.querySelector('#predict');
const pond = FilePond.create(inputElement, {
    imageCropAspectRatio: 1,
    imageResizeTargetWidth: 256,
    imageResizeMode: 'contain',
    onaddfile: (err, fileItem) => {
        console.log(err, fileItem.getMetadata('resize'));
    },
    onpreparefile: (fileItem, outputFiles) => {
        outputFiles.forEach(output => {
            const img = new Image();
            img.src = URL.createObjectURL(output.file);
            document.body.appendChild(img);
        })
    }
});