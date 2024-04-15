import DocViewer from "react-doc-viewer";

function DOCViewer() {
    const docs = [
        { uri: "http://localhost:3000/articles/menuscript/12354647894665.pptx" }, // Remote file
    ];

    return <DocViewer documents={docs} />;
}

export default DOCViewer;