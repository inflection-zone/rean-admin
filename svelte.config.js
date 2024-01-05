import adapter from '@sveltejs/adapter-node';
// import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	// preprocess: [
	// 	preprocess({
	// 		postcss: true
	// 	})
	// ],
	extensions: ['.svelte'],
	preprocess: [ vitePreprocess()],
	
	vitePlugin: {
		inspector: true,
	},

	kit: {
		//adapter: adapter(),
		adapter: adapter({ out: 'build' }),
		// Only for using ngrok
		// csrf: {
		// 	checkOrigin: false,
		//   },
	  alias: {
      $routes: path.resolve('./src/routes'),
      $lib: path.resolve('./src/lib')
    },
	}
};

export default config;