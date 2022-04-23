import { exportComponentAsJPEG } from "react-component-export-image";
import React from "react";

export default function downloadProfile(certificateWrapper, element) {
    element.preventDefault();
    exportComponentAsJPEG(certificateWrapper as React.RefObject<HTMLDivElement>, {
        html2CanvasOptions: { backgroundColor: null },
        fileName: "myLeetCodeProfile.jpg"
    });
}