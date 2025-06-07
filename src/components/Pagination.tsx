import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const paginationStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '1rem',
    padding: '1rem',
};

const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    cursor: 'pointer',
};

const disabledStyle: React.CSSProperties = {
    ...buttonStyle,
    cursor: 'not-allowed',
    backgroundColor: '#f9f9f9',
    color: '#ccc',
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div style={paginationStyle}>
            <button
                style={currentPage === 1 ? disabledStyle : buttonStyle}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span>
                Page {currentPage} of {totalPages}
            </span>
            <button
                style={currentPage === totalPages ? disabledStyle : buttonStyle}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination; 