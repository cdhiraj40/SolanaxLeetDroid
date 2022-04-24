import { exportComponentAsJPEG } from "react-component-export-image";

export default function downloadProfile(certificateWrapper, element) {
    element.preventDefault();
    exportComponentAsJPEG(certificateWrapper, {
        html2CanvasOptions: {backgroundColor: null},
        fileName: "myLeetCodeProfile.jpg"
    }).then();
}