import * as THREE from "three";
import GUI from "lil-gui";

export const gui = new GUI();

class GuiParams {
	constructor() {
		this.primitiveColors = ["#00FFFF", "#FFA500", "#add8e6"];
		this.primitiveColorsObj = [
			{
				string: "#00FFFF",
				int: 0x00ffff,
				object: { r: 0, g: 255, b: 255 },
				array: [0, 255, 255],
			},
			{
				string: "#FFA500",
				int: 0xffa500,
				object: { r: 255, g: 165, b: 0 },
				array: [255, 165, 0],
			},
			{
				string: "#add8e6",
				int: 0xadd8e6,
				object: { r: 173, g: 216, b: 230 },
				array: [173, 216, 230],
			},
		];
		this.modelRotation = true;
		this.modelAnimation = true;
		this.clipPlanes = true;
		this.fieldsObject = {
			rotationButton: true,
			animationButton: true,
			clipPlanes: true,
		};
	}

	addColor(index, name, mesh) {
		gui.addColor(this.primitiveColorsObj[index], "string")
			.name(name)
			.onChange((value) => {
				mesh.material.color = new THREE.Color(value);
			});
	}

	addRotationButton() {
		gui.add(this.fieldsObject, "rotationButton")
			.name("Rotation of model")
			.onChange((value) => {
				this.modelRotation = value;
			});
	}

	addAnimationButton() {
		gui.add(this.fieldsObject, "animationButton")
			.name("Animation of model buttons")
			.onChange((value) => {
				this.modelAnimation = value;
			});
	}

	addClipPlanes() {
		gui.add(this.fieldsObject, "clipPlanes")
			.name("Show half of model")
			.onChange((value) => {
				this.clipPlanes = value;
			});
	}
}

export const guiParams = new GuiParams();
