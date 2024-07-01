import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const init = () => {
	const sizes = {
		width: window.innerWidth,
		height: window.innerHeight,
	};

	const scene = new THREE.Scene();
	const canvas = document.querySelector("#canvas");
	const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
	camera.position.z = 7;
	scene.add(camera);

	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.screenSpacePanning = false;

	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
	renderer.setSize(sizes.width, sizes.height);
	renderer.shadowMap.enabled = true;
	renderer.setClearColor(0x000000, 0);
	document.body.appendChild(renderer.domElement);

	renderer.render(scene, camera);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
	directionalLight.position.set(1, 1, 1);
	scene.add(directionalLight);

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();

	return {
		sizes,
		scene,
		canvas,
		camera,
		renderer,
		controls,
		raycaster,
		pointer,
	};
};
