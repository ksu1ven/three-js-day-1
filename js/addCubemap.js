import * as THREE from "three";

export const addCubeMap = (scene) => {
	const cubeTextureLoader = new THREE.CubeTextureLoader().setPath(
		"/textures/Castle/"
	);
	const urls = ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"];

	cubeTextureLoader.load(urls, (cubeTexture) => {
		function createBlurredCubeMap(cubeTexture, blurAmount) {
			const cubeTextureImages = cubeTexture.image;
			const blurredCubeTexture = new THREE.CubeTexture();

			for (let i = 0; i < 6; i++) {
				const image = cubeTextureImages[i];
				const canvas = document.createElement("canvas");
				canvas.width = image.width;
				canvas.height = image.height;
				const context = canvas.getContext("2d");
				context.drawImage(image, 0, 0);
				context.filter = `blur(${blurAmount}px)`;
				context.drawImage(canvas, 0, 0);
				blurredCubeTexture.images[i] = canvas;
			}
			blurredCubeTexture.needsUpdate = true;
			blurredCubeTexture.mapping = THREE.CubeReflectionMapping;

			return blurredCubeTexture;
		}

		const blurredCubeTexture = createBlurredCubeMap(cubeTexture, 5);
		scene.background = blurredCubeTexture;
	});
};
