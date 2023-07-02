import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MediaState {
  checkList: string[];
  deleted: string[];
}

export const mediaSlice = createSlice({
  name: "mediaSlice",
  initialState: {
    checkList: [],
    deleted: [],
  } as MediaState,

  reducers: {
    toggleAddItem: (currentSlice, action: PayloadAction<string>) => {
      if (currentSlice.checkList.includes(action.payload)) {
        currentSlice.checkList = currentSlice.checkList.filter(
          (item) => item !== action.payload
        );
      } else {
        currentSlice.checkList.push(action.payload);
      }
    },
    clearCheckedList: (currentSlice, action) => {
      console.log(action.payload);
      currentSlice.checkList.filter((item) => item !== action.payload);
    },
    deletedList: (currentSlice, action: PayloadAction<string>) => {
      if (!currentSlice.deleted.includes(action.payload as any)) {
        currentSlice.deleted.push(action.payload);
      }
      return;
    },
    clearDeletedList: (currentSlice, action) => {
      currentSlice.deleted.filter((item) => item !== action.payload);
    },
  },
});

export const {
  toggleAddItem,
  deletedList,
  clearDeletedList,
  clearCheckedList,
} = mediaSlice.actions;
export const mediaReducer = mediaSlice.reducer;
