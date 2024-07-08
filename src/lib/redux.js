import { configureStore, createSlice } from '@reduxjs/toolkit';

const machineSlice = createSlice({
	name: 'machines',
	initialState: {
		machines: []
	},
	reducers: {
		setMachines (state, action) {
			state.machines = action.payload;
		},

		updateMachine (state, action) {
			const { id, health, name } = action.payload;

			state.machines = state.machines.map((machine) => {
				if (machine.id === id) {
					machine.health = health || machine.health;
					machine.name = name || machine.name;
				}
				return machine;
			});
		}
	}
});

export const store = configureStore({
	reducer: machineSlice.reducer
});

export const { setMachines, updateMachine } = machineSlice.actions;
