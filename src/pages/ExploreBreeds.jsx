import React, { useMemo } from "react";
import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const fetchBreedImages = async (breed, signal) => {
  const timeout = new Promise((_, rej) => {
    const t = setTimeout(() => rej(new Error("Tempo de resposta excedido")), 6000);
    signal?.addEventListener("abort", () => clearTimeout(t));
  });

  const fetchCall = fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`, { signal })
    .then(res => {
      if (!res.ok) throw new Error("Falha ao buscar imagens");
      return res.json();
    })
    .then(json => json.message);

  return Promise.race([fetchCall, timeout]);
};

const useBreedImages = (breed) => {
  return useQuery({
    queryKey: ["breedImages", breed],
    queryFn: ({ signal }) => fetchBreedImages(breed, signal),
    enabled: !!breed,
    staleTime: 1000 * 60 * 5
  });
};

const ExploreBreeds = () => {
  const [breed, setBreed] = React.useState("husky");
  const { data, isLoading, isError, error, refetch } = useBreedImages(breed);

  const images = useMemo(() => data || [], [data]);

  const handleRefetchWithAbort = async () => {
    const controller = new AbortController();
    try {
      const res = await fetchBreedImages(breed, controller.signal);
      console.log("Imagens (manual):", res);
      refetch(); 
    } catch (e) {
      console.error(e);
    } finally {
      controller.abort();
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Explorar Raças (API externa + React Query)</Typography>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          label="Raça (ex: husky, beagle, boxer, bulldog, labrador)"
          value={breed}
          onChange={(e) => setBreed(e.target.value.trim().toLowerCase())}
          fullWidth
        />
        <Button variant="contained" onClick={() => refetch()}>Buscar</Button>
        <Button variant="outlined" onClick={handleRefetchWithAbort}>Refetch c/ Abort</Button>
      </Box>

      {isLoading && <Box sx={{ mt: 2, fontStyle: "italic" }}>Carregando imagens...</Box>}
      {isError && <Box sx={{ mt: 2, color: "crimson" }}>{error.message}</Box>}

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 1.5, mt: 2 }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`dog-${i}`} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }} />
        ))}
      </Box>
    </Paper>
  );
};

export default ExploreBreeds;
