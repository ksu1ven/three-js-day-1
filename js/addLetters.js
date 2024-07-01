import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

const loader = new FontLoader();

export const addLetters = (scene) => {
	const name = "Oksana";

	loader.load("../assets/fonts/optimer_bold.typeface.json", function (font) {
		let group = new THREE.Group();

		name.split("").forEach((letter, index) => {
			const geometry = new TextGeometry(letter, {
				font: font,
				size: 2,
				depth: 0.2,
				curveSegments: 12,
				bevelEnabled: true,
				bevelThickness: 0.2,
				bevelSize: 0.1,
				bevelOffset: 0,
				bevelSegments: 15,
			});

			const material = new THREE.MeshBasicMaterial({
				color: "#ffffff",
				wireframe: true,
			});
			let mesh = new THREE.Mesh(geometry, material);
			mesh.name = "letter";
			mesh.position.x = index * 2;
			if (index === 0) mesh.position.x = index * 2 - 1;

			group.add(mesh);
		});
		group.position.x = -5;
		group.position.y = -4;
		scene.add(group);
	});
};
