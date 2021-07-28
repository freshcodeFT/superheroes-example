module.exports = async (req, res, next) => {
  try {
    const {
      query: { limit = 5, offset = 0 },
    } = req;
    req.pagination = {
      limit: limit > 5 || limit <= 0 ? 5 : limit,
      offset: offset < 0 ? 0 : offset,
    };
    next();
  } catch (err) {
    next(err);
  }
};
