const router = require("express").Router();
const db = require("./db");

// POST /tracks
router.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).send({ errorMessage: "track content can not be empty !" });
  } else if (!req.body.title || !req.body.playlist_id) {
    console.log(req.body.title);
    res
      .status(400)
      .send({ errorMessage: "track title && playlist_id can not be empty !" });
  }
  let newTrack = req.body;
  const playlist_id = req.body.playlist_id;
  newTrack.playlist_id = playlist_id;
  console.log(newTrack);
  console.log(
    "################################################################################"
  );
  console.log(
    "ALLER MERCI LE SQL À LA MAIN !!!! J'AI UNE VIEILLE ERREUR DE CONTRAINTES SUR UN CLÉ ÉTRANGÈRE !!"
  );
  console.log(
    "################################################################################"
  );
  db.query("INSERT INTO tracks SET ?", newTrack, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({
        errorMessage: "Erreur lors de la sauvegarde d'une piste",
      });
    } else {
      newTrack.id = result.insertId;
      res.status(200).send(newTrack);
    }
  });
});

// GET /tracks
router.get("/", (req, res) => {
  db.query("SELECT * FROM tracks", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération des pistes");
    } else {
      res.json(result);
    }
  });
});

// GET /tracks/:id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query("SELECT * FROM tracks WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la récupération de la piste");
    } else if (result[0] === undefined) {
      res.status(404).send("il n'y a pas de piste ici !");
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// PUT /tracks/:id
router.put("/:id", (req, res) => {
  if (!req.body) {
    res.status(400).send({ errorMessage: "track content can not be empty !" });
  } else if (!req.body.title) {
    console.log(req.body.title);
    res.status(400).send({ errorMessage: "track title can not be empty !" });
  }
  let updatedTrack = req.body;
  console.log(updatedTrack);
  const id = parseInt(req.params.id);
  db.query(
    "UPDATE tracks SET ? WHERE id = ?",
    [updatedTrack, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification de la playlist");
      } else if (result === undefined) {
        res.status(404).send("il n'y a pas de playlist ici !");
      } else {
        res.status(200).json({ id, ...updatedTrack });
      }
    }
  );
});

// DELETE /tracks/:id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query("DELETE FROM tracks WHERE id = ?", id, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la suppression de la piste");
    } else if (result === undefined) {
      res.status(404).send("il n'y a pas de piste ici !");
    } else {
      res.status(200).send("Piste supprimée avec succès !");
    }
  });
});
module.exports = router;
