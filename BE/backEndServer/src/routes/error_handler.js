export const notFound = (q, res) => {
  res.status(404).send({ error: "notfound" });
};
