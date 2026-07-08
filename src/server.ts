import app from "./app.js"
import config from "./config/index.js";


const main = () => {
    const port = config.port || 3000;
    
    app.listen(port, () => {
        console.log(`Server running on port ${port}...`);
    });
}

main();