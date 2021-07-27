module.exports = async (req, res, next) => {
  try {
    const {
      query: { limit = 50, offset = 0 },
    } = req;
    req.pagination = {
      limit: limit > 50 || limit <= 0 ? 50 : limit,
      offset: offset < 0 ? 0 : offset,
    };
    next();
  } catch (err) {
    next(err);
  }
};
