const Listing = require("../models/listing");
const axios = require("axios");

const MAPTILER_KEY = "ABqB0wvH4g5FMgfnwM2R";

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    // console.log(listing.owner.username);
    if (!listing) {
        req.flash("error", "Listing doesn't exist!!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
    // console.log(listing.price);
    // res.send("workd");
};

module.exports.createListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const listingData = req.body.listing;

    if (
        !listingData.image ||
        !listingData.image.url ||
        listingData.image.url.trim() === ""
    ) {
        delete listingData.image;
    }

    // 🗺️ Geocoding: Convert location string to coordinates using MapTiler
    let coordinates = [77.5946, 12.9716]; // Default fallback: Bangalore

    try {
        const geoRes = await axios.get(
            `https://api.maptiler.com/geocoding/${encodeURIComponent(
                listingData.location
            )}.json`,
            {
                params: {
                    key: MAPTILER_KEY,
                },
            }
        );

        if (
            geoRes.data &&
            geoRes.data.features &&
            geoRes.data.features.length > 0
        ) {
            coordinates = geoRes.data.features[0].geometry.coordinates;
        }
    } catch (err) {
        console.error("Geocoding failed:", err.message);
        req.flash("error", "Couldn't fetch location coordinates.");
    }

    const newListing = new Listing({
        ...listingData,
        geometry: {
            type: "Point",
            coordinates: coordinates, // [lng, lat]
        },
    });

    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // 🔥 Add default coordinates or use real ones later

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing doesn't exist!!");
        return res.redirect("/listings");
    }
    let originalImgUrl = listing.image.url;
    originalImgUrl = originalImgUrl.replace("/upload", "/upload/w-250");
    res.render("listings/edit.ejs", { listing, originalImgUrl });
};
module.exports.updateListing = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }
    let { id } = req.params;

    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");

    // console.log(listing);
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const delListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted!");

    res.redirect("/listings");
};
