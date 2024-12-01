// Loading.jsx
// Description: A reusable React component to display a loading spinner animation.
// Usage: Import and use the <Loading /> component to indicate a loading state in your application.

import React from 'react';

/**
 * Loading Component
 * 
 * This component renders a visually appealing loading spinner.
 * It can be used to indicate a loading state for API calls, page transitions, or other asynchronous operations.
 * 
 * Styling:
 * - Tailwind CSS is used for styling.
 * - The spinner uses utility classes for animation (`animate-spin`) and layout.
 * 
 * @returns {JSX.Element} A loading spinner animation.
 */

export const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
    );
};

export default Loading;
