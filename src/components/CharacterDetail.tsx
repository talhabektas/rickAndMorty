import React from 'react';
import { Character } from '../types/character';

// Bileşenin alacağı propların tipini tanımlar.
interface CharacterDetailProps {
    // Detayları gösterilecek olan tek bir karakter nesnesi.
    character: Character;
}

// Bileşen için temel stil tanımlamaları.
const detailCardStyle: React.CSSProperties = {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap' // Ekran küçüldüğünde elemanların alta inmesini sağlar.
};

const imageStyle: React.CSSProperties = {
    width: '150px',
    height: '150px',
    borderRadius: '8px',
    objectFit: 'cover',
};

const infoStyle: React.CSSProperties = {
    flex: 1,
    minWidth: '200px' // Esnek yapıda daralmamasını sağlar.
};

const listStyle: React.CSSProperties = {
    maxHeight: '200px',
    overflowY: 'auto', // Bölüm listesi uzunsa kaydırma çubuğu çıkarır.
    paddingLeft: '1.2rem',
}

/**
 * Seçilen bir karakterin detaylı bilgilerini bir kart içinde gösteren bileşen.
 * @param {CharacterDetailProps} props - `character` nesnesini içerir.
 */
const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
    return (
        <div style={detailCardStyle}>
            <img src={character.image} alt={character.name} style={imageStyle} />
            <div style={infoStyle}>
                <h2>{character.name}</h2>
                <p><strong>Status:</strong> {character.status}</p>
                <p><strong>Species:</strong> {character.species}</p>
                <p><strong>Gender:</strong> {character.gender}</p>
                <p><strong>Origin:</strong> {character.origin.name}</p>
                <p><strong>Last Known Location:</strong> {character.location.name}</p>
            </div>
            <div>
                <h3>Episodes</h3>
                {/* Karakterin göründüğü bölümlerin URL'lerinden sadece bölüm numarasını alıp listeler. */}
                <ul style={listStyle}>
                    {character.episode.map((ep, index) => (
                        <li key={index}>Episode {ep.split('/').pop()}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CharacterDetail; 