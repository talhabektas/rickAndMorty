import React from 'react';

interface PageSizeSelectorProps {
    pageSize: number;
    onPageSizeChange: (size: number) => void;
}

const selectorStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
};

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, onPageSizeChange }) => {
    return (
        <div style={selectorStyle}>
            <label htmlFor="pageSize">Items per page:</label>
            <select
                id="pageSize"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
};

export default PageSizeSelector; 