import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { UrlShortener } from "../utils/UrlShortener.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

const createShortLink = AsyncHandler(async (req, res)=>{
    try {

        const { url: targetUrl, customExpiry: expirationTime } = req.body;

        const linkGenerator = new UrlShortener();
        const shortCode = await linkGenerator.generateShortCode();
    
        let expirationDate;
        if (expirationTime) {
            expirationDate = new Date(expirationTime);
        } else {
            expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);        }

        const linkRecord = new Url({
        originalUrl: targetUrl,
        shortUrl: shortCode,
        expiresAt: expirationDate
        });

        await linkRecord.save();

        return res.status(200).json(
            new ApiResponse(200, linkRecord, "Link successfully compressed and stored in database.")
        );
        
    } catch (error) {
        console.error('Failed to compress URL link:', error);
    
        if (error.code === 11000) {
            throw new ApiError(500, "Duplicate short code detected. Please retry the operation.");
        }
    
        throw new ApiError(500, "Server encountered an unexpected error. Please try again later.");
    }
});

const navigateToOriginal = AsyncHandler(async (req, res)=>{
    try {
        const { shortUrl: shortIdentifier } = req.params;
    
        if (!/^[a-zA-Z0-9]+$/.test(shortIdentifier)) {
            throw new ApiError(404, "Invalid short link format detected");
        }

        const linkRecord = await Url.findOne({
        shortUrl: shortIdentifier,
        expiresAt: { $gt: new Date() }
        });

        if (!linkRecord) {
            throw new ApiError(404, "Short link not found or has expired");
        }

        res.redirect(301, linkRecord.originalUrl);
        
    } catch (error) {
        console.error("Link redirection process failed", error);
        throw new ApiError(500, "Server encountered an error during redirection");
    }
});

export {createShortLink, navigateToOriginal}