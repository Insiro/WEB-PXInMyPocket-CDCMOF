export const notFound = (req, res) => {
  res.status(404).send({ error: "notfound" });
};
export const badRequest = (req, res) => {
  res.status(400).send({ error: "wrong api request" });
};
