import { ApiResponse, Character } from '../types/character';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Rick and Morty API'sinden tüm karakterleri çeker.
 * Görev gereksinimi olan 250'den fazla karakteri almak için birden fazla sayfayı
 * otomatik olarak birleştirir.
 * @returns {Promise<Character[]>} Tüm karakterleri içeren bir dizi döndürür.
 */
export const fetchAllCharacters = async (): Promise<Character[]> => {
    let allCharacters: Character[] = [];
    let nextPage = `${API_BASE_URL}/character`;

    // API'nin sayfa başına 20 karakter verdiğini varsayarak, 13 sayfa çekerek
    // 250'den fazla karakter (260) elde etmeyi garantiliyoruz.
    const pagesToFetch = 13;
    let pagesFetched = 0;

    try {
        // Sonraki sayfa URL'si olduğu sürece ve hedef sayfa sayısına ulaşana kadar döngüye devam et.
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
        throw error; // Hatanın daha üst bir bileşen tarafından yakalanabilmesi için yeniden fırlat.
    }
};

/**
 * Belirli bir ID'ye sahip tek bir karakterin detaylarını çeker.
 * @param {number} id - Detayları getirilecek karakterin ID'si.
 * @returns {Promise<Character>} İstenen karakterin verisini döndürür.
 */
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