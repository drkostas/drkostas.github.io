import data from './published-papers.json';

export const getPapers = () => {
  return data;
};

export default (req, res) => {
  const projects = getPapers();
  res.json(projects);
};
