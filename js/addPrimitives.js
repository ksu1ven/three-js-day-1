import * as THREE from "three";
import { guiParams } from "./gui";

export const addPrimitives = (scene) => {
	const geometries = [
		new THREE.BoxGeometry(1.5, 1.5, 1.5),
		new THREE.TorusGeometry(1, 0.5, 10, 10),
		new THREE.SphereGeometry(1, 20, 10),
	];
	const materials = [
		new THREE.MeshNormalMaterial({
			color: guiParams.primitiveColors[0],
		}),

		new THREE.MeshPhongMaterial({
			color: guiParams.primitiveColors[1],
		}),

		new THREE.MeshStandardMaterial({
			color: guiParams.primitiveColors[2],
		}),
	];

	geometries.forEach((geometry, index) => {
		if (materials[index]) {
			const mesh = new THREE.Mesh(geometry, materials[index]);
			mesh.position.x = (index - 1) * 3;
			mesh.position.y = 3;

			guiParams.addColor(index, `Color of ${index + 1} mesh`, mesh);
			scene.add(mesh);
		}
	});
};
