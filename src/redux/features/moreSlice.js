import { createSlice } from '@reduxjs/toolkit'

export const moreSlice = createSlice({
	name: 'more',
	initialState: {
		value: false,
		error: '',
		loading: false
	},
	reducers: {
		setMore: (state, action) => {
			state.value = action.payload
		}
	}
})

export const { setMore } = moreSlice.actions

export default moreSlice.reducer
