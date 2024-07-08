import React from 'react';

export default function HealthBar(props) {
	// eslint-disable-next-line react/prop-types
	const { health } = props;
	const style = {
		width: health + '%',
		height: '35px',
		backgroundColor: 'black'
	};
	const healthnum = parseInt(health);
	if (healthnum <= 50) {
		style.backgroundColor = '#D9534F';
	} else if (healthnum <= 70) {
		style.backgroundColor = '#f0ad4e';
	} else {
		style.backgroundColor = '#5cb85c';
	}

	const total = {
		height: '35px',
		border: '1px solid black',
	};

	return (
		<div style={total}>
			<div style={style}></div>
		</div>
	);
}
