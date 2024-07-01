import * as THREE from "three";

export const addPortal = (scene) => {
	const stencilRef = 1;
	const planeGeom = new THREE.CircleGeometry(2, 64);

	const stencilMat = new THREE.MeshPhongMaterial({ color: "green" });
	stencilMat.depthWrite = false;
	stencilMat.stencilWrite = true;
	stencilMat.stencilRef = stencilRef;
	stencilMat.stencilFunc = THREE.AlwaysStencilFunc;
	stencilMat.stencilZPass = THREE.ReplaceStencilOp;
	const stencilMesh = new THREE.Mesh(planeGeom, stencilMat);
	stencilMesh.position.set(4, 0, 1);
	scene.add(stencilMesh);

	const geometry = new THREE.BoxGeometry();
	const material = new THREE.MeshPhongMaterial({ color: "red" });
	material.stencilWrite = true;
	material.stencilRef = stencilRef;
	material.stencilFunc = THREE.EqualStencilFunc;

	const cube = new THREE.Mesh(geometry, material);
	cube.position.set(4, 0, -3);
	scene.add(cube);
};
