// PageHeader.jsx
export default function PageHeader({ title, breadcrumb, children }) {
    const renderBreadcrumb = () => {
        if (typeof breadcrumb === 'string') {
            return <span className="text-gray-500">{breadcrumb}</span>;
        }
        
        if (Array.isArray(breadcrumb)) {
            return (
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    {breadcrumb.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <span className="text-gray-500">{item}</span>
                            {index < breadcrumb.length - 1 && (
                                <span className="text-gray-500 mx-2">/</span>
                            )}
                        </div>
                    ))}
                </div>
            );
        }
        
        return null;
    };

    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {title || 'Dashboard'}
                </span>
                {renderBreadcrumb()}
            </div>
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}