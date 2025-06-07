import React from 'react';

// Bileşenin proplarının tipini tanımlar.
interface FilterBarProps {
    // Filtre inputlarının mevcut değerlerini tutan nesne.
    filters: {
        name: string;
        status: string;
        species: string;
    };
    // Bir filtre değiştiğinde, yeni filtre nesnesini üst bileşene (App.tsx) bildiren fonksiyon.
    onFilterChange: (filters: { name: string; status: string; species: string; }) => void;
}

const filterBarStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
    flexWrap: 'wrap'
};

const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
}

/**
 * Kullanıcının karakterleri filtrelemesi için input alanları sunan bileşen.
 * Bu bir "Controlled Component"tir, yani tüm state'i (filtre değerleri)
 * proplar aracılığıyla üst bileşenden (App.tsx) alır.
 * @param {FilterBarProps} props - `filters` nesnesi ve `onFilterChange` handler'ı.
 */
const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {

    // Input veya select alanlarından herhangi biri değiştiğinde tetiklenir.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Değişmeyen filtreleri koruyarak sadece değişen alanı günceller
        // ve yeni durumu `onFilterChange` prop'u ile yukarıya bildirir.
        onFilterChange({
            ...filters,
            [name]: value,
        });
    };

    return (
        <div style={filterBarStyle}>
            <div style={inputGroupStyle}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Filter by name..."
                    value={filters.name}
                    onChange={handleInputChange}
                />
            </div>
            <div style={inputGroupStyle}>
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    value={filters.status}
                    onChange={handleInputChange}
                >
                    <option value="">All</option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
            <div style={inputGroupStyle}>
                <label htmlFor="species">Species</label>
                <input
                    type="text"
                    id="species"
                    name="species"
                    placeholder="Filter by species..."
                    value={filters.species}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default FilterBar; 