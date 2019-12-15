export const toPlainObject = (cv, candidate) => {
  return {
    title: cv.title,
    profile: cv.profile,
    workExp: cv.workExp,
    education: cv.education,
    active: cv.active,
    languages: cv.languages,
    userEmail: cv.userEmail, // Candidate reference,
    candidate: candidate
  };
};
