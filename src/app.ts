import { envs } from './config/plugins/envs.plugin';
import { Server } from './presentation/server';
import 'dotenv/config';
const main = () => {
    console.log(envs);
    // Server.start();
};

(async () => {
    main();
})();
