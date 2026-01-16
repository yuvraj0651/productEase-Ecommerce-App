import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        }
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        };
    };

    componentDidCatch(error, info) {
        console.log("Your Error:", error);
        console.log("The Component from where the error is coming", info);
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "20px", textAlign: "center" }}>
                    <h2>Oops! 😥</h2>
                    <p className="block">Something went wrong.: {this.state.error.message}</p>
                    <button className="text-center flex justify-center w-full" onClick={() => this.setState({ hasError: false, error: null })}>Try Again</button>
                </div>
            )
        }
        return (
            <>
                {this.props.children}
            </>
        )
    }
};

export default ErrorBoundary;