import express from "express";
import routeFrutas from "./routes/frutasRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/' , (req,res) => {
    res.send("src");
});

app.use('/frutas', routeFrutas);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});