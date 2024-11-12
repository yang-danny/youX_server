"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const logger_1 = __importDefault(require("./logger"));
const morgan_1 = __importDefault(require("morgan"));
const connectDB_1 = __importDefault(require("./db/connectDB"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const ApplicationRoute_1 = __importDefault(require("./routes/ApplicationRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const morganFormat = ":method :url :status :response-time ms";
const corsOptions = {
    origin: process.env.FRONT_END_URL,
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
//logging and monitoring to track application running
//save log info to file app.log
app.use((0, morgan_1.default)(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(" ")[0],
                url: message.split(" ")[1],
                status: message.split(" ")[2],
                responseTime: message.split(" ")[3],
            };
            logger_1.default.info(JSON.stringify(logObject));
        },
    },
}));
app.use("/api/user", UserRoute_1.default);
app.use("/api/application", ApplicationRoute_1.default);
app.listen(PORT, () => {
    (0, connectDB_1.default)();
    console.log(`Server listen at port: ${PORT}`);
});
