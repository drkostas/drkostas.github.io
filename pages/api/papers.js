import data from './published-papers.json';

export const getPapers = () => {
  return data;
};

export default (req, res) => {
  const papers = getPapers();
  res.json(papers);
};