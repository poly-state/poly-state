import { defineConfig } from 'tsup';

export default defineConfig(() => {
	return {
		clean: true,
		tsconfig: 'tsconfig.build.json',
		entry: ['src/index.ts'],
		sourcemap: true,
		dts: true,
		format: ['cjs', 'esm'],
		dest: 'dist',
	};
});
