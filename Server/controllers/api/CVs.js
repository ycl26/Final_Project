import * as cvModel from "../../models/CV"

export function createCV(req, res) {
  cvModel.createCV({
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
  })
  //   .catch((error) => {
  //   res.status(500).json({ error });
  // });
}

export function findByTitle(req, res) {
  cvModel.findByTitle(req.title).then((cv) => {
    res.json({
      data: cv
    });
  }).catch((error) => {
    res.status(500).json({ error });
  });
}
