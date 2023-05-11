const asyncHandler = require("express-async-handler");
const Space = require("../models/SpaceModel");
const Booking = require("../models/bookingModel")
const mongoose = require('mongoose');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv')
const multer = require('multer')
const multerS3 = require('multer-s3')
const crypto = require('crypto');
const sharp = require('sharp')

dotenv.config({ path: './config/.env' })

const bucketName = process.env.BUCKET_NAME
const region = process.env.BUCKET_REGION
const accessKeyId = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});


module.exports = {

    getSpace: asyncHandler(async (req, res) => {
        try {

            const { HostId, imageUrl, Title, Address, Discription, Price, isCheckedwifi, isCheckedparking, isCheckedtv, isCheckedkitchen, isCheckedentrance, countAdult, countChildren, countPets, hostcoord, inputValue } = req.body;
            const Guests = {
                Adult: countAdult,
                Children: countChildren,
                Pets: countPets
            }
            const Perks = {
                isWifi: isCheckedwifi,
                isParking: isCheckedparking,
                isTv: isCheckedtv,
                isKtchen: isCheckedkitchen,
                isEntrance: isCheckedentrance
            }
            const PicData = {};
            PicData.ImageUrl = imageUrl;

            const post = await Space.create({
                HostId,
                Address,
                Title,
                PicData,
                Discription,
                Price,
                Guests,
                Perks,
                coordinates: hostcoord,
                Location: inputValue
            });

            const savedPost = await post.save();
            res.status(200).json(post)
        } catch (error) {
            console.log(error);
        }
    }),

    getImage: asyncHandler(async (req, res) => {
        try {

            const uploadS3 = multer({

                storage: multerS3({
                    s3: s3,
                    acl: 'public-read',
                    bucket: bucketName,
                    metadata: (req, file, cb) => {
                        cb(null, { fieldName: file.fieldname })
                    },
                    key: (req, file, cb) => {

                        cb(null, Date.now().toString())
                    },
                    contentType: multerS3.AUTO_CONTENT_TYPE
                }),

            }).array('image', 5);

            uploadS3(req, res, (error) => {
                // console.log('files', req.files);
                if (error) {
                    console.log('errors', error);
                    res.status(500).json({
                        status: 'fail',
                        error: error
                    });
                } else {

                    if (req.files === undefined) {
                        console.log('uploadProductsImages Error: No File Selected!');
                        res.status(500).json({
                            status: 'fail',
                            message: 'Error: No File Selected'
                        });
                    } else {

                        let fileArray = req.files,
                            fileLocation;
                        const images = [];
                        for (let i = 0; i < fileArray.length; i++) {
                            fileLocation = fileArray[i].location;
                            console.log('filenm', fileLocation);
                            images.push(fileLocation)
                        }

                        return res.status(200).json({
                            status: 'ok',
                            filesArray: fileArray,
                            locationArray: images
                        });

                    }
                }
            })

        } catch (error) {
            console.log(error);
        }
    }),

    getBookings: asyncHandler(async (req, res) => {
        try {
            const { spaceid, hostId } = req.body;
            const spaceID = spaceid;
            const currentDate = new Date();
            const bookings = await Booking.find({ hostId: hostId ,isCancelled:false }).populate({
                path: 'spaceID',
                model: 'Space'
            });

            const previousBookings = bookings.filter(
                (booking) => booking.endDate < currentDate
            );

            const upcomingBookings = bookings.filter(
                (booking) => booking.startDate > currentDate
            );
            res.status(200).json({ previousBookings, upcomingBookings })


        } catch (error) {
            console.error("Error fetching upcoming bookings:", error);
            throw error;
        }
    }),


    approveBooking: asyncHandler(async (req, res) => {
        try {
            const bookingId = req.params.bookingId;
            const booking = await Booking.findById(bookingId);

            if (booking) {
                booking.bookingApproved = !booking.bookingApproved;
                const updatedBooking = await booking.save();
                res.status(200).json(updatedBooking);
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error approving booking', error });
        }
    }),

    cancelBooking: asyncHandler(async (req, res) => {
        try {
            const bookingId = req.params.bookingId;
            const booking = await Booking.findById(bookingId);

            if (booking) {
                booking.isCancelled = !booking.isCancelled;
                const updatedBooking = await booking.save();
                res.status(200).json(updatedBooking);
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error cancelling booking', error });
        }
    }),

    getBookMonthPercentage: asyncHandler(async (req, res) => {
        try {
          const hostId = req.params.HostId;
            console.log("here id host",hostId);
          const totalBookings = await Booking.countDocuments({ HostID: hostId });
      
          const bookingsPerMonth = await Booking.aggregate([
            {
              $match: { HostID: mongoose.Types.ObjectId(hostId) },
            },
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
          const bookingsPerMonthPercentage = bookingsPerMonth.map((entry) => ({
            ...entry,
            percentage: (entry.count / totalBookings) * 100,
          }));
      
          res.status(201).json(bookingsPerMonthPercentage)
        } catch (error) {
          console.log(error);
        }
      }),


      getMonthlyIncome: asyncHandler(async (req, res) => {
        const hostID = req.params.hostID; // assuming you're getting hostID from the route parameters
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const pipeline = [
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentYear, 0, 1),
                        $lt: new Date(currentYear + 1, 0, 1)
                    },
                    isCancelled: false,
                    HostID: mongoose.Types.ObjectId(hostID) // add host condition
                    // if you also want to consider specific space, you can add: spaceID: mongoose.Types.ObjectId(spaceID)
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
    })
      

}