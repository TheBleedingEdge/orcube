const mongoose = require('mongoose');

const spaceSchema = mongoose.Schema(
    {
        HostId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        Title: {
            type: String,
            required: true,
        },
        Address: {
            type: String,
            required: true,
        },
        Discription: {
            type: String,
            required: true,
        },

        Price: {
            type: Number,
            required: true,
        },
        PicData: {
            ImageUrl: [{
                type: String,
                required: true,
            }]
        },

        Guests: {
            Adult: {
                type: Number,
                required: true,
            },
            Children: {
                type: Number,
                required: true,
            },
            Pets: {
                type: Number,
                required: true,
            },
        },

        isApproved: {
            type: Boolean,
            required: true,
            default: false
        },

        Perks: {
            isWifi: {
                type: Boolean,
                required: true,
            },
            isParking: {
                type: Boolean,
                required: true,
            },
            isTv: {
                type: Boolean,
                required: true,
            },
            isKtchen: {
                type: Boolean,
                required: true,
            },
            isEntrance: {
                type: Boolean,
                required: true,
            }
        }
    },

    {
        timestamps: true,
    }
);

const Space = mongoose.model("Space", spaceSchema);

module.exports = Space;