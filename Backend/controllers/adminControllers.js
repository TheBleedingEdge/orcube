const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Space = require("../models/SpaceModel")
const Booking = require("../models/bookingModel")

module.exports = {
    getUsers: asyncHandler(async (req, res) => {
        try {
            const userdocs = await User.find();
            res.json(userdocs)
        } catch (error) {
            console.log(error);
        }
    }),

    changeStatus: asyncHandler(async (req, res) => {
        try {
            console.log(req.params.id);
            const user = await User.findById(req.params.id)
            if (user.isBlocked === true) {
                user.isBlocked = false;
                await user.save();
                res.json(user)
            } else {
                user.isBlocked = true;
                await user.save();
                res.json(user)
            }
        } catch (error) {
            console.log(error);
        }
    }),



    getToApproveSpace: asyncHandler(async (req, res) => {
        try {
            const spacedocs = await Space.find({ isApproved: false });
            res.json(spacedocs)
        } catch (error) {
            console.log(error);
        }
    }),

    changeSpaceStatus: asyncHandler(async (req, res) => {
        try {
            const space = await Space.findById(req.params.id)
            if (space.isApproved === true) {
                space.isApproved = false;
                await space.save();
                res.json(space)
            } else {
                space.isApproved = true;
                await space.save();
                res.json(space)
            }
        } catch (error) {
            console.log(error);
        }
    }),


    getUsersPerMonthPercentage: asyncHandler(async (req, res) => {
        try {
            const totalUsers = await User.countDocuments();
            const usersPerMonth = await User.aggregate([
                {
                    $project: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" },
                    },
                },
                {
                    $group: {
                        _id: { month: "$month", year: "$year" },
                        count: { $sum: 1 },
                    },
                },
                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1,
                    },
                },
            ]);

            const usersPerMonthPercentage = usersPerMonth.map((entry) => ({
                ...entry,
                percentage: (entry.count / totalUsers) * 100,
            }));

            res.status(201).json(usersPerMonthPercentage)
        } catch (error) {
            console.log(error);
        }
    }),


    getMonthlyIncome: asyncHandler(async(req,res)=> {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const pipeline = [
          {
            $match: {
              createdAt: {
                $gte: new Date(currentYear, 0, 1),
                $lt: new Date(currentYear + 1, 0, 1)
              },
              isCancelled: false
            }
          },
          {
            $group: {
              _id: {
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" }
              },
              totalIncome: { $sum: "$totalCost" }
            }
          },
          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1
            }
          }
        ];
      
        try {
          const monthlyIncome = await Booking.aggregate(pipeline);
          res.status(201).json(monthlyIncome)
        } catch (error) {
          console.error("Error getting monthly income:", error);
          return [];
        }
      }),

      getTotalData: asyncHandler(async(req,res)=>{
        try {
            const totalUsers = await User.countDocuments();
            const totalSpaces = await Space.countDocuments();
            const totalBookings = await Booking.countDocuments();
            if(totalUsers || totalSpaces || totalBookings){
                res.status(201).json([totalUsers,totalSpaces,totalBookings])
            }
        } catch (error) {
            console.log(error);
        }
      })

}