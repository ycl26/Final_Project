import * as cvModel from "../../models/CV"

export function upsertCV(req, res) {
  cvModel.upsertCV({
    id: req.body.id,
    title: req.body.title,
    profile: req.body.profile,
    workExp: req.body.workExp,
    education: req.body.education,
    active: req.body.active,
    languages: req.body.languages,
    userEmail: req.body.userEmail // Candidate reference
  }).then((cv) => {
    res.json({
      data: cv
    });
  },
  (error) => {
    res.status(500).json({ error });
  });
}

export function removeCV(req, res) {
  cvModel.removeCV({
    id: req.body.id,
  }).then((cv) => {
    res.json({
      data: cv
    });
  },
  (error) => {
    res.status(500).json({ error });
  });
}

export function findByTitle(req, res) {
  cvModel.findByTitle(req.query.title).then((cv) => {
    res.json({
      data: cv
    });
  }).catch((error) => {
    res.status(500).json({ error });
  });
}
