export const notFound = (req, res) => {
  res.status(404).json({ error: "notfound" });
};
export const badRequest = (req, res) => {
  res.status(400).json({ error: "wrong api request" });
};
export const notAcceptable = (req, res) => {
  res.status(406).json({ error: "not accetpable access" });
};
