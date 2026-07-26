const Home = require("../../Models/Home");

const GetSingleHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id).populate("owner");

    if (!home) {
      return res.status(404).json({
        message: "Home not found",
      });
    }

    return res.status(200).json({home:home})


  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = GetSingleHome;