import React from 'react';
import { Character } from '../types/character';

interface CharacterTableProps {
    characters: Character[];
    onRowClick: (id: number) => void;
}

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
                {characters.map((character) => (
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