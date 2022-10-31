import data from './bots-projects.json';

export const getBotsProjects = () => {
  return data;
};

export default (req, res) => {
  const projects = getBotsProjects();
  res.json(projects);
};
