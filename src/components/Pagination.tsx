import React, { useState, useEffect, useRef } from 'react';

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

const paginationContainerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
};

const pageInfoStyle: React.CSSProperties = {
    cursor: 'pointer',
    userSelect: 'none',
    padding: '0.5rem'
};

const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '125%',
    left: '50%',
    transform: 'translateX(-50%)',
    maxHeight: '210px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
    width: '80px',
};

const pageItemStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'center',
    cursor: 'pointer',
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handlePageSelect = (page: number) => {
        onPageChange(page);
        setIsDropdownOpen(false);
    };

    return (
        <div style={paginationStyle}>
            <button
                style={currentPage === 1 ? disabledStyle : buttonStyle}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <div style={paginationContainerStyle} ref={wrapperRef}>
                <span style={pageInfoStyle} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    Page {currentPage} of {totalPages}
                </span>
                {isDropdownOpen && (
                    <div style={dropdownStyle}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                style={pageItemStyle}
                                onClick={() => handlePageSelect(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>
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