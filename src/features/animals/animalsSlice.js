import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./animalsApi";

export const fetchAnimals = createAsyncThunk("animals/fetchAll", async () => {
  const res = await api.get("/animals");
  return res.data;
});

export const createAnimal = createAsyncThunk("animals/create", async (payload) => {
  const res = await api.post("/animals", payload);
  return res.data;
});

export const updateAnimal = createAsyncThunk("animals/update", async (payload) => {
  const res = await api.put(`/animals/${payload.id}`, payload);
  return res.data;
});

export const deleteAnimal = createAsyncThunk("animals/delete", async (id) => {
  await api.delete(`/animals/${id}`);
  return id;
});

const animalsSlice = createSlice({
  name: "animals",
  initialState: {
    list: [],
    loading: false,
    error: ""
  },
  reducers: {
    clearError: (state) => { state.error = ""; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimals.pending, (s) => { s.loading = true; s.error = ""; })
      .addCase(fetchAnimals.fulfilled, (s, a) => { s.loading = false; s.list = a.payload; })
      .addCase(fetchAnimals.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(createAnimal.pending, (s) => { s.loading = true; })
      .addCase(createAnimal.fulfilled, (s, a) => { s.loading = false; s.list.push(a.payload); })
      .addCase(createAnimal.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(updateAnimal.pending, (s) => { s.loading = true; })
      .addCase(updateAnimal.fulfilled, (s, a) => {
        s.loading = false;
        s.list = s.list.map(it => it.id === a.payload.id ? a.payload : it);
      })
      .addCase(updateAnimal.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(deleteAnimal.pending, (s) => { s.loading = true; })
      .addCase(deleteAnimal.fulfilled, (s, a) => {
        s.loading = false;
        s.list = s.list.filter(it => it.id !== a.payload);
      })
      .addCase(deleteAnimal.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
  }
});

export const { clearError } = animalsSlice.actions;
export default animalsSlice.reducer;
