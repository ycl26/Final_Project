import * as company  from "../../models/company";
import * as job from "../../models/job"

export function getJobs(req, res) {
    const userEmail = req.query.userEmail;
    return Jobs
        .getAllByUserEmail(userEmail)
        .then((jobs) => {
            res.json({
                data: jobs
            });
        }).catch((error) => {
            res.status(500).json({ error });
        });
}
