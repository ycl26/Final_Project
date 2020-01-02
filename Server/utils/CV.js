export const toPlainObject = (cv) => {
  return {
    id: cv._id,
    title: cv.title,
    profile: cv.profile,
    workExp: cv.workExp,
    education: cv.education,
    active: cv.active,
    languages: cv.languages,
    userEmail: cv.userEmail,  // Candidate reference,
  };
};
