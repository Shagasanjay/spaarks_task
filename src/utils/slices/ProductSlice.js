// slices/ProductSlice.js

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  materials: [],
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    addMaterial: (state, action) => {
      state.materials = action.payload;
    },
    incrementMaterialQuantity: (state, action) => {
      console.log('yesCheck',action);
      const material = state.materials.find(
        mat => mat.id === action.payload.id,
      );
      if (material) {
        material.quantity += 1;
      }
    },
    decrementMaterialQuantity: (state, action) => {
      const material = state.materials.find(
        mat => mat.id === action.payload.id,
      );
      if (material && material.quantity > 0) {
        material.quantity -= 1;
      }
    },
  },
});

export const {
  addMaterial,
  incrementMaterialQuantity,
  decrementMaterialQuantity,
} = productSlice.actions;

export default productSlice.reducer;
