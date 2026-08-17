<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import { Spring } from "svelte/motion";
	import type { ProductId } from "@codeloud/family";

	interface Props {
		readonly activeProduct: ProductId;
	}

	let { activeProduct }: Props = $props();
	let phase = $state(0);
	const voicePulse = new Spring(0.84, { stiffness: 0.12, damping: 0.22 });
	const relayPulse = new Spring(0.72, { stiffness: 0.12, damping: 0.22 });

	const {
		Mesh,
		AmbientLight,
		PerspectiveCamera,
		SphereGeometry,
		MeshBasicMaterial,
		IcosahedronGeometry,
	} = T;
	useTask((delta) => {
		phase += delta * 0.42;
		voicePulse.target = activeProduct === "voice" ? 1 : 0.78;
		relayPulse.target = activeProduct === "relay" ? 1 : 0.78;
	});
</script>

<PerspectiveCamera makeDefault position={[0, 0, 7]} />
<AmbientLight intensity={0.7} />
<Mesh position={[-1.5, 0.6, 0]} scale={voicePulse.current}>
	<SphereGeometry args={[0.34, 24, 24]} />
	<MeshBasicMaterial color="#73e0bf" transparent opacity={0.9} />
</Mesh>
<Mesh position={[1.5, -0.6, 0]} scale={relayPulse.current}>
	<SphereGeometry args={[0.34, 24, 24]} />
	<MeshBasicMaterial color="#ff6633" transparent opacity={0.9} />
</Mesh>
<Mesh position={[0, 0, 0]} rotation.z={phase * 0.22} rotation.x={phase * 0.13}>
	<IcosahedronGeometry args={[0.58, 1]} />
	<MeshBasicMaterial color="#f0eadf" wireframe transparent opacity={0.72} />
</Mesh>
