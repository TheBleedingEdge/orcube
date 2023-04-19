const asyncHandler = require("express-async-handler");
const Space = require("../models/SpaceModel");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require("dotenv");
const multer = require('multer')
const multerS3 = require('multer-s3')
const crypto = require('crypto');
const sharp = require('sharp')

dotenv.config()

const bucketName = 'orcubeimages'
const region = 'ap-south-1'
const accessKeyId = 'AKIA2WM2T5PRMATCO6UR'
const secretAccessKey = '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'

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
                coordinates:hostcoord,
                Location:inputValue
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

}