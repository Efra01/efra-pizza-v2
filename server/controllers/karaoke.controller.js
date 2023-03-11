const Karaoke = require('../models/karaoke.model');

module.exports = {
    getAll: (req, res) => {
        Karaoke.find({})
        .sort({ title: "ascending" })
        .then((allKaraokeSongs) => {

            res.json(allKaraokeSongs);
        })
        .catch((err) => {
            console.log("error found in getAll");
            console.log(err);
            res.json(err);
        });
    },

    create: (req, res) => {


        Karaoke.create( req.body )
        .then((newKaraokeSong) => {

            res.json(newKaraokeSong);
        })
        .catch((err) => {
            console.log("error found in create");
            console.log(err);
            res.json(err);
        });
    },

    getOne: (req, res) => {
        console.log(req.params.id);

        Karaoke.findById( req.params.id )
        .then((oneKaraokeSong) => {

            res.json(oneKaraokeSong);
        })
        .catch((err) => {
            console.log("error found in getOne");
            console.log(err);
            res.json(err);
        });
    },

    update: (req, res) => {


        Karaoke.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        })
        .then((updatedKaraokeSong) => {

            res.json(updatedKaraokeSong);
        })
        .catch((err) => {
            console.log("error found in update");
            console.log(err);
            res.json(err);
        });
    },

    delete: (req, res) => {


        Karaoke.findByIdAndDelete( req.params.id )
        .then((deletedKaraokeSong) => {

            res.json(deletedKaraokeSong);
        })
        .catch((err) => {
            console.log("error found in delete");
            console.log(err);
            res.json(err);
        });
    },
}