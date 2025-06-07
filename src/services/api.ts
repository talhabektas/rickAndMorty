import { ApiResponse, Character } from '../types/character';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchAllCharacters = async (): Promise<Character[]> => {
    let allCharacters: Character[] = [];
    let nextPage = `${API_BASE_URL}/character`;

    // The API has a limit, but we'll fetch a large number of characters to meet the requirement.
    // We will fetch up to 13 pages to get more than 250 characters.
    const pagesToFetch = 13;
    let pagesFetched = 0;

    try {
        while (nextPage && pagesFetched < pagesToFetch) {
            const response = await fetch(nextPage);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.statusText}`);
            }
            const data: ApiResponse = await response.json();
            allCharacters = [...allCharacters, ...data.results];
            nextPage = data.info.next || '';
            pagesFetched++;
        }
        return allCharacters;
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error;
    }
};

export const fetchCharacterById = async (id: number): Promise<Character> => {
    try {
        const response = await fetch(`${API_BASE_URL}/character/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch character: ${response.statusText}`);
        }
        const character: Character = await response.json();
        return character;
    } catch (error) {
        console.error(`Error fetching character with id ${id}:`, error);
        throw error;
    }
} 