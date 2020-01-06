import * as jobModel from "../../models/job"

export function upsertJob(req, res) {
    jobModel.upsertJob({
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      companyName: req.body.companyName,      
      userEmail: req.body.userEmail // Company reference  
    }).then((job) => {
      res.json({
        data: job
      });
    },
    (error) => {
      res.status(500).json({ error });
    });
  }
  
  export function removeJob(req, res) {
    jobModel.removeJob({
      id: req.body.id,
    }).then((job) => {
      res.json({
        data: job
      });
    },
    (error) => {
      res.status(500).json({ error });
    });
  }
  
  export function findByTitle(req, res) {
    jobModel.findByTitle(req.query.title).then((job) => {
      res.json({
        data: job
      });
    }).catch((error) => {
      res.status(500).json({ error });
    });
  }