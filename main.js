import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { init } from "./js/init";
import { guiParams } from "./js/gui";
import { addPrimitives } from "./js/addPrimitives";
import { addLetters } from "./js/addLetters";
import { getRandomColor } from "./js/getRandomColor";
import { addModelRotation } from "./js/modelRotationEvent";
import { addPortal } from "./js/addPortal";

import "./style.css";
import { addCubeMap } from "./js/addCubemap";

const { sizes, camera, scene, canvas, renderer, raycaster, pointer, controls } =
	init();

const loader = new GLTFLoader();

let model, mixer;
let actions = [];
let actionsPlaying = [];
let intersects = [];

loader.load(
	"/assets/models/EgorovAgencyCube.gltf",
	function (gltf) {
		model = gltf.scene;

		guiParams.addRotationButton();
		guiParams.addAnimationButton();
		guiParams.addClipPlanes();

		const clipPlanes = [new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)];

		model.traverse(function (child) {
			if (child.isMesh) {
				child.material.clippingPlanes = clipPlanes;
				child.material.clipShadows = true;
				child.material.clipIntersection = true;
				child.material.needsUpdate = true;
			}
		});

		//Вместо орбит контрол
		// addModelRotation(renderer, model);

		scene.add(model);

		mixer = new THREE.AnimationMixer(model);

		gltf.animations.forEach((animation) => {
			console.log(animation);
			const action = mixer.clipAction(animation);
			actions.push(action);
			actionsPlaying.push(false);
		});
	},
	undefined,
	function (error) {
		console.error(error);
	}
);

addPrimitives(scene);
addLetters(scene);
addCubeMap(scene);
addPortal(scene);

const clock = new THREE.Clock();

const animate = () => {
	requestAnimationFrame(animate);
	if (model) {
		if (guiParams.modelRotation) {
			model.rotation.y += 0.01;
		}

		if (guiParams.modelAnimation) {
			actions.forEach((action, index) => {
				setTimeout(() => {
					action.play();
				}, index * 500);
			});
		} else {
			actionsPlaying.forEach((isPlaying, index) => {
				let connectedAction = actions.find(
					(el) => el._clip.name === `plug${index + 1}Action`
				);

				if (isPlaying) {
					connectedAction?.play();
				} else {
					connectedAction?.stop();
				}
			});
		}
	}

	renderer.localClippingEnabled = guiParams.clipPlanes;

	if (mixer) mixer.update(clock.getDelta());
	controls.update();

	renderer.render(scene, camera);
};

animate();

window.addEventListener("resize", (e) => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.render(scene, camera);
});

window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});

function onClick(event) {
	pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(pointer, camera);
	intersects = raycaster.intersectObjects(scene.children);

	for (let i = 0; i < intersects.length; i++) {
		let name = intersects[i].object?.name;
		if (name === "letter") {
			let newColor = getRandomColor();
			intersects[i].object.material.color = new THREE.Color(newColor);
		}
		if (name.includes("plug")) {
			let buttonNumber = name[4];
			actionsPlaying[buttonNumber - 1] =
				!actionsPlaying[buttonNumber - 1];
			break;
		}
	}
}

window.addEventListener("click", onClick);
