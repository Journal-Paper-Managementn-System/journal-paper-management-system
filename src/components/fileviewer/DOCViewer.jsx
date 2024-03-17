import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function DOCViewer() {
    const docs = [
        { uri: "http://localhost:5000/journals/upload/1709547475527.pdf" }, // Remote file
    ];

    return <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
}

export default DOCViewer;