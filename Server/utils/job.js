export const toPlainObject = (job) => {
  return {
    title: job.title,
    date: job.date,
    description: job.description,
    type: job.type,
    companyLogo: job.companyLogo,
    companyName: job.companyName,
  };
};
