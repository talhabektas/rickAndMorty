import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Character } from './types/character';
import { fetchAllCharacters, fetchCharacterById } from './services/api';
import CharacterTable from './components/CharacterTable';
import CharacterDetail from './components/CharacterDetail';
import FilterBar from './components/FilterBar';
import Pagination from './components/Pagination';
import PageSizeSelector from './components/PageSizeSelector';

function App() {
  // --- STATE MANAGEMENT --- //
  // Ana karakter listesi ve genel sayfa durumu
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Seçilen karakterin detay görünümü için durumlar
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  // Filtreleme, sayfalama ve sayfa boyutu için durumlar
  const [filters, setFilters] = useState({ name: '', status: '', species: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Detay kartına otomatik kaydırma için referans
  const detailContainerRef = useRef<HTMLDivElement>(null);


  // --- DATA FETCHING EFFECTS --- //
  // Bileşen ilk yüklendiğinde tüm karakterleri API'den çeker.
  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCharacters();
        setCharacters(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch characters.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  // `selectedCharacterId` değiştiğinde, o karaktere ait detayları çeker.
  useEffect(() => {
    if (selectedCharacterId === null) {
      setSelectedCharacter(null);
      return;
    }

    const loadCharacterDetail = async () => {
      try {
        setDetailLoading(true);
        setDetailError(null);
        const data = await fetchCharacterById(selectedCharacterId);
        setSelectedCharacter(data);
      } catch (err) {
        setDetailError('Failed to fetch character details.');
        console.error(err);
      } finally {
        setDetailLoading(false);
      }
    };

    loadCharacterDetail();
  }, [selectedCharacterId]);

  // Seçilen karakterin verisi yüklendiğinde, detay kartına doğru kaydırır.
  useEffect(() => {
    if (selectedCharacter && detailContainerRef.current) {
      detailContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedCharacter]);


  // --- HANDLER FUNCTIONS --- //
  // Tabloda bir satıra tıklandığında çalışır. Detay görünümünü açar/kapatır.
  const handleRowClick = (id: number) => {
    if (id === selectedCharacterId) {
      setSelectedCharacterId(null);
    } else {
      setSelectedCharacterId(id);
    }
  };

  // Filtre çubuğundaki değerler değiştiğinde çalışır.
  const handleFilterChange = (newFilters: { name: string; status: string; species: string; }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Filtre değiştiğinde ilk sayfaya dön.
    setSelectedCharacterId(null);
  };

  // Sayfa numarası değiştiğinde çalışır.
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Sayfa boyutu (sayfa başına öğe sayısı) değiştiğinde çalışır.
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Sayfa boyutu değiştiğinde ilk sayfaya dön.
  };


  // --- MEMOIZED COMPUTATIONS --- //
  // Performans için, sadece `characters` veya `filters` değiştiğinde yeniden hesaplanır.
  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      return (
        character.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (filters.status === '' || character.status === filters.status) &&
        character.species.toLowerCase().includes(filters.species.toLowerCase())
      );
    });
  }, [characters, filters]);

  // Sadece filtrelenmiş karakterler veya sayfa boyutu değiştiğinde yeniden hesaplanır.
  const totalPages = useMemo(() => {
    return Math.ceil(filteredCharacters.length / pageSize);
  }, [filteredCharacters, pageSize]);

  // Gösterilecek olan geçerli sayfanın karakterlerini hesaplar.
  const paginatedCharacters = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredCharacters.slice(startIndex, startIndex + pageSize);
  }, [filteredCharacters, currentPage, pageSize]);


  // --- RENDER --- //
  return (
    <div className="container">
      <h1>Rick and Morty</h1>
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      {loading && <p>Loading characters...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          {filteredCharacters.length > 0 ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <PageSizeSelector pageSize={pageSize} onPageSizeChange={handlePageSizeChange} />
              </div>
              <CharacterTable characters={paginatedCharacters} onRowClick={handleRowClick} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <p>No characters match the current filters.</p>
          )}

          <div ref={detailContainerRef}>
            {detailLoading && <p>Loading details...</p>}
            {detailError && <p>{detailError}</p>}
            {selectedCharacter && !detailLoading && <CharacterDetail character={selectedCharacter} />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
