import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import BaseApp from "./components/BaseApp";
import BaseAppLazy from "./components/BaseAppLazy";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEffect, useState } from "react";

function App() {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900); // Adjust threshold as needed
        };

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Initial check on component mount
        handleResize();

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ErrorBoundary>
            {isMobile ? <h3 className="text-center fw-bold mt-6">
                Your device is not comfortable with this application. Please use a larger device or use desktop mode.
            </h3> :
                <BaseAppLazy />
            }
        </ErrorBoundary>
    );
}

export default App;
