import React, { useState, useEffect, useRef } from 'react';

// Bileşenin proplarının tipini tanımlar.
interface PaginationProps {
    // Aktif olan sayfa numarası.
    currentPage: number;
    // Gösterilecek toplam sayfa sayısı.
    totalPages: number;
    // Sayfa değiştirildiğinde çağrılacak fonksiyon. Yeni sayfa numarasını yukarı iletir.
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

/**
 * Sayfalar arasında gezinmeyi sağlayan ve doğrudan sayfa seçimine olanak tanıyan
 * gelişmiş bir sayfalama bileşeni.
 * @param {PaginationProps} props
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Sayfa seçme dropdown'ının açık/kapalı durumunu tutar.
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Dropdown'un dışına tıklandığını algılamak için container'a bir referans.
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Dropdown dışına tıklandığında menüyü kapatmak için bir effect.
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Eğer tıklanan yer, referans aldığımız container'ın dışındaysa...
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false); // Dropdown'ı kapat.
            }
        }
        // Event listener'ı tüm dokümana ekle.
        document.addEventListener("mousedown", handleClickOutside);
        // Bileşen DOM'dan kaldırıldığında event listener'ı temizle (memory leak önler).
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    // Dropdown menüsünden bir sayfa seçildiğinde çalışır.
    const handlePageSelect = (page: number) => {
        onPageChange(page);
        setIsDropdownOpen(false); // Seçim sonrası dropdown'ı kapat.
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

            {/* Sayfa seçme dropdown'ını ve tetikleyicisini içeren container */}
            <div style={paginationContainerStyle} ref={wrapperRef}>
                <span style={pageInfoStyle} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    Page {currentPage} of {totalPages}
                </span>

                {/* Dropdown açıksa, tüm sayfa numaralarını listele */}
                {isDropdownOpen && (
                    <div style={dropdownStyle}>
                        {/* 1'den totalPages'e kadar bir dizi oluşturup her biri için bir buton render et */}
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