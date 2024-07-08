import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './MachineView.module.css';
import HealthBar from '../HealthBar/HealthBar';
import { store, updateMachine } from '../../lib/redux';
/* eslint-disable react/prop-types */

export default function MachineView (props) {
	const [machineName, setMachineName] = React.useState('');
	const machineList = useSelector((state) => state.machines);
	const machineId = useRouteMatch().params.machineId;
	const machineData = machineList.find((machine) => machine.id === machineId);
	const history = useHistory();

	async function putMachineData () {
		store.dispatch(
			updateMachine({
				...machineData,
				name: machineName,
			})
		);

		await axios.put(`http://localhost:8080/machines/${machineId}`, {
			name: machineName
		});
	}

	if (!machineList.length) {
		return history.push('/machines');
	}

	return (
		<div key={machineData.id}>
			<div className={styles.submitNameStyle}>
				<h1>{machineData.name}</h1>
				<label>Update Name:</label>
				&nbsp;
				<input
					type='text'
					onChange={(e) => setMachineName(e.target.value)}
					className={styles.nameStyle}
					placeholder={machineData.name}
				/>
				<button
					className={styles.btnStyle}
					onClick={() => putMachineData()}
				>
					Submit
				</button>
			</div>
			<div className={styles.statusStyle}>
				<div className={styles.healthDiv}>
					<h2>{machineData.health}</h2>
					<HealthBar health={machineData.health} />
				</div>
				<h2>Status:{machineData.ip_address}</h2>
			</div>
		</div>
	);
}
