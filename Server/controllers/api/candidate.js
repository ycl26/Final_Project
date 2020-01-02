import * as Candidate from "../../models/candidate";
import * as CVs from "../../models/CV";

export function getCVs(req, res) {
    const userEmail = req.query.userEmail;
    return CVs
        .getAllByUserEmail(userEmail)
        .then((cvs) => {
            res.json({
                data: cvs
            });
        }).catch((error) => {
            res.status(500).json({ error });
        });
}