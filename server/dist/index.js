"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./configs/config"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const notes_route_1 = __importDefault(require("./routes/notes.route"));
const database_1 = __importDefault(require("./configs/database"));
const PORT = config_1.default.server.port;
const app = (0, express_1.default)();
// const corsOptions = {
//     origin: [config.client.url],
//     credentials: true,
// };
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); // Allow cookies and other credentials
    next();
});
// middlewares
// app.use(cors(corsOptions));
app.use(express_1.default.json({ limit: '4mb' }));
app.use((0, cookie_parser_1.default)());
//routes
// will add the middleware to the route in future
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/notes', notes_route_1.default);
app.get('/', (req, res) => {
    res.json({
        message: "Hello World 🌍, Welcome to i-notebook server",
        success: true
    });
});
(0, database_1.default)();
// start server
app.listen(PORT, () => {
    console.log(`Server is running on http://${config_1.default.server.host}:${PORT} 🚀`);
});
