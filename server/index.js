import express from  'express';
import mongoose from "mongoose";
import dotenv from 'dotenv'
import path from "path";
import {fileURLToPath} from "url";
import cors from 'cors';
import morgan from "morgan";
import heroRoutes from "./routes/hero.js";
import Hero from "./models/HeroModel.js";


const app = express();


// CONFIGURATIONS
dotenv.config();
const __filename  = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);
app.use(express.json());

app.use(cors({
    origin:['http://localhost:4000','https://hero-client.onrender.com/'],
    methods:['GET',"PATCH","DELETE","POST"]
}))
app.use(morgan('dev'));

const PORT = process.env.PORT;



app.get('/',(req,res) => {
    res.send('Hello World!')
})


app.use('/api/v1',heroRoutes);


app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.delete('/api/hero/:id/images/:image', async (req, res) => {
    const {id,image} = req.params

    console.log(id);
    console.log(image);

    try {
        // Find the superhero document by ID
        const superhero = await Hero.findById(id);


        const imageToDelete = superhero.images.findIndex(img => img.filename === image);

        if (imageToDelete !== -1) {
            superhero.images.splice(imageToDelete, 1);
        }


        // Save the updated superhero document
        await superhero.save();

        return res.status(200).json({ message: 'Image deleted successfully.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to delete image.' });
    }
});

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
    .then(() => console.log(`DB CONNECTED`))
    .then(() => app.listen(PORT),() => console.log(`Server is listening on port ${PORT}`))
    .catch((err) => console.error(err));



