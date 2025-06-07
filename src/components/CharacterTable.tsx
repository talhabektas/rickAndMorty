import React from 'react';
import { Character } from '../types/character';

// Bileşenin alacağı propların tiplerini tanımlar.
interface CharacterTableProps {
    // Gösterilecek karakterlerin dizisi.
    characters: Character[];
    // Tablodaki bir satıra tıklandığında tetiklenecek fonksiyon.
    // Tıklanan karakterin ID'sini üst bileşene iletir.
    onRowClick: (id: number) => void;
}

/**
 * Karakterleri bir tablo içinde listeleyen bileşen.
 * @param {CharacterTableProps} props - `characters` dizisi ve `onRowClick` handler'ı.
 */
const CharacterTable: React.FC<CharacterTableProps> = ({ characters, onRowClick }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Species</th>
                    <th>Gender</th>
                    <th>Origin</th>
                </tr>
            </thead>
            <tbody>
                {/* Karakter dizisindeki her bir eleman için bir tablo satırı (tr) oluşturur. */}
                {characters.map((character) => (
                    // Her satıra tıklandığında `onRowClick` fonksiyonunu karakterin ID'si ile çağırır.
                    <tr key={character.id} onClick={() => onRowClick(character.id)} style={{ cursor: 'pointer' }}>
                        <td>
                            <img src={character.image} alt={character.name} />
                        </td>
                        <td>{character.name}</td>
                        <td>{character.status}</td>
                        <td>{character.species}</td>
                        <td>{character.gender}</td>
                        <td>{character.origin.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CharacterTable; 