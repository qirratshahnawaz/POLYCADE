import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { setMachines, store, updateMachine } from './lib/redux';
import { Link } from 'react-router-dom';
import HealthBar from './components/HealthBar/HealthBar';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:1337');

export default function Machines () {
	const machineState = useSelector((state) => state.machines);
	const [isLoading, setIsloading] = React.useState(true);

	useEffect(() => {
		async function getMachines () {
			const { data } = await axios.get('http://localhost:8080/machines');
			store.dispatch(setMachines(data));
			setIsloading(false);
		}

		client.onmessage = (msg) => {
			let data = JSON.parse(msg.data);
			store.dispatch(updateMachine(data));
		};

		getMachines();
	}, [isLoading]);

	return (
		<div>
			<div>
				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							<td>Name</td>
							<td>IP Address</td>
							<td>Health</td>
						</tr>
					</thead>
					<tbody>
						{machineState.map((machine) => {
							return (
								<tr key={machine.id}>
									<td>
										<Link to={`/machines/${machine.id}`}>
											{machine.name}
										</Link>
									</td>
									<td>
										<Link to={`/machines/${machine.id}`}>
											{machine.ip_address}
										</Link>
									</td>
									<td>
										<Link to={`/machines/${machine.id}`}>
											<HealthBar
												health={machine.health}
											/>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
