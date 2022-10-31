import data from './misc-projects.json';

export const getMiscProjects = () => {
  return data;
};

export default (req, res) => {
  const projects = getMiscProjects();
  res.json(projects);
};
