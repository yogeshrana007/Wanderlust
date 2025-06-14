const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main()
    .then(() => {
        console.log("connection successful to mongodb");
    })
    .catch((err) => console.log(err));

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "68472517b8720704d1ee6c99",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();
