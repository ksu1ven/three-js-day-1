import * as THREE from "three";

export const addModelRotation = (renderer, model) => {
	let isMouseDown = false;
	let previousMousePosition = { x: 0, y: 0 };

	const onMouseDown = (event) => {
		isMouseDown = true;
		previousMousePosition = {
			x: event.clientX,
			y: event.clientY,
		};
	};

	const onMouseMove = (event) => {
		if (!isMouseDown) return;

		const deltaMove = {
			x: event.clientX - previousMousePosition.x,
			y: event.clientY - previousMousePosition.y,
		};

		const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
			new THREE.Euler(
				toRadians(deltaMove.y * 1),
				toRadians(deltaMove.x * 1),
				0,
				"XYZ"
			)
		);

		model.quaternion.multiplyQuaternions(
			deltaRotationQuaternion,
			model.quaternion
		);

		previousMousePosition = {
			x: event.clientX,
			y: event.clientY,
		};
	};

	const onMouseUp = () => {
		isMouseDown = false;
	};

	const onMouseLeave = () => {
		isMouseDown = false;
	};

	const onTouchStart = (event) => {
		if (event.touches.length === 1) {
			isMouseDown = true;
			previousMousePosition = {
				x: event.touches[0].clientX,
				y: event.touches[0].clientY,
			};
		}
	};

	const onTouchMove = (event) => {
		if (!isMouseDown) return;

		if (event.touches.length === 1) {
			const deltaMove = {
				x: event.touches[0].clientX - previousMousePosition.x,
				y: event.touches[0].clientY - previousMousePosition.y,
			};

			const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
				new THREE.Euler(
					toRadians(deltaMove.y * 1),
					toRadians(deltaMove.x * 1),
					0,
					"XYZ"
				)
			);

			model.quaternion.multiplyQuaternions(
				deltaRotationQuaternion,
				model.quaternion
			);

			previousMousePosition = {
				x: event.touches[0].clientX,
				y: event.touches[0].clientY,
			};
		}
	};

	const onTouchEnd = () => {
		isMouseDown = false;
	};

	const toRadians = (angle) => {
		return angle * (Math.PI / 180);
	};

	renderer.domElement.addEventListener("mousedown", onMouseDown, false);
	renderer.domElement.addEventListener("mousemove", onMouseMove, false);
	renderer.domElement.addEventListener("mouseup", onMouseUp, false);
	renderer.domElement.addEventListener("mouseleave", onMouseLeave, false);

	renderer.domElement.addEventListener("touchstart", onTouchStart, false);
	renderer.domElement.addEventListener("touchmove", onTouchMove, false);
	renderer.domElement.addEventListener("touchend", onTouchEnd, false);
};
