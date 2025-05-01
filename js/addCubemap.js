import * as THREE from "three";

export const addCubeMap = (scene) => {
	const cubeTextureLoader = new THREE.CubeTextureLoader().setPath(
		"/textures/Castle/"
	);
	const urls = ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"];

	cubeTextureLoader.load(urls, (cubeTexture) => {
		scene.background = cubeTexture;
		scene.backgroundBlurriness = 0.07;
	});
};
