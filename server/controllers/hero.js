import Hero from "../models/HeroModel.js";


export const ListOfHeroes =  async (req,res) => {
    try {
        const heroes = await Hero.find();

        res.status(200).json(heroes)

    } catch (err) {

        res.status(500).json({msg:'Cannot get heroes from database'});

    }
}


export const createHero =  async (req,res) => {
    try {

        const {nickname,realname,description,superpowers,phrase} = req.body;

        const newHero = await Hero.create({
            nickname,
            realname,
            description,
            superpowers,
            phrase,
            images:req.files
        })

        res.status(201).json(newHero);

    } catch (err) {

        res.status(500).json({msg:'Cannot create hero'});

    }
}


export const getSingleHero = async (req,res) => {
    try {
        const {id} = req.params;

        const hero = await Hero.findById(id);

        res.status(200).json(hero);

    } catch (err) {
        res.status(502).json({msg:'Cannot get a hero'});

    }
}


export const updateHero = async (req,res) => {
    try {


        const {id,nickname,realname,description,superpowers,phrase} = req.body;

        const heroToUpdate = await Hero.findById(id);

        // Update existing images
        heroToUpdate.nickname = nickname;
        heroToUpdate.realname = realname;
        heroToUpdate.description = description;
        heroToUpdate.superpowers = superpowers;
        heroToUpdate.phrase = phrase;

        // Check if new images are added
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map((file) => ({
                filename: file.filename,
            }));
            heroToUpdate.images = [...heroToUpdate.images, ...newImages];
        }

        await heroToUpdate.save();

        res.status(200).json(heroToUpdate);

    } catch (err) {
        res.status(502).json({msg:'Cannot update a hero'})
    }
}


export const deleteHero = async (req,res) => {
    try {
        const {id} = req.params;

        const hero = await Hero.findById(id);

        await hero.deleteOne();

        res.status(200).json(hero);

    } catch (err) {
        res.status(502).json({msg:'Cannot get a hero'});

    }
}
