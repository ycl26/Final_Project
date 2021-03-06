export const toPlainObject = (job) => {
  return {
    id: job.id || job._id.toString(),
    title: job.title,
    date: job.date,
    description: job.description,
    salary: job.salary,
    reqSkills: job.reqSkills,
    type: job.type,
    address: job.address,
    companyLogo: job.companyLogo,
    compName: job.compName,
  };
};
