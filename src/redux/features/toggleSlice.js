import { createSlice } from '@reduxjs/toolkit'

export const toggleSlice = createSlice({
	name: 'toggle',
	initialState: {
		value: false,
		error: '',
		loading: false
	},
	reducers: {
		setToggle: (state, action) => {
			state.value = action.payload
		}
	}
})

export const { setToggle } = toggleSlice.actions

export default toggleSlice.reducer
