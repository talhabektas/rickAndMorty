import React from 'react';

// Bileşenin proplarının tipini tanımlar.
interface PageSizeSelectorProps {
    // Seçili olan sayfa boyutu (sayfa başına öğe sayısı).
    pageSize: number;
    // Sayfa boyutu değiştirildiğinde çağrılacak fonksiyon. Yeni boyutu yukarı iletir.
    onPageSizeChange: (size: number) => void;
}

const selectorStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
};

/**
 * Kullanıcının bir sayfada kaç öğe gösterileceğini seçmesini sağlayan bir dropdown bileşeni.
 * @param {PageSizeSelectorProps} props
 */
const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, onPageSizeChange }) => {
    return (
        <div style={selectorStyle}>
            <label htmlFor="pageSize">Items per page:</label>
            <select
                id="pageSize"
                value={pageSize}
                // Seçim değiştiğinde, string değeri sayıya çevirerek üst bileşene bildirir.
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