const Payment = require("../../Models/Payment")

const reservationDetails = async(req ,res)=>{
    console.log("controller reservation hitted")
    try {
        const reservationDetails =  await Payment.findOne({
        _id: req.params.id,
        }).populate("guest")

        

        if(!reservationDetails){
            return res.status(404).json({
                message: "Not found"
            })
        }
  console.log("returned successfully")
        return res.status(200).json({

            home: reservationDetails
        })

    } catch (error) {
        return res.status(500).json({
            message: "Some internal server error"
        })
    }
}

module.exports = reservationDetails