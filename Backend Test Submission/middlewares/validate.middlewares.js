import { ApiError } from "../utils/ApiError.js";

const validateUrl = (req, res, next) => {
  const { url: targetUrl, customExpiry: expirationTime } = req.body;
  
  if (!targetUrl) {
    throw new ApiError(400, "Target URL field is mandatory");
  }

  
  const urlValidationPattern = /^https?:\/\/.+\..+/;
  if (!urlValidationPattern.test(targetUrl)) {
    throw new ApiError(400, "Please provide a valid URL that begins with http:// or https://");
  }

  
  if (expirationTime) {
    const expirationDate = new Date(expirationTime);
    if (isNaN(expirationDate.getTime()) || expirationDate <= new Date()) {
      throw new ApiError(400, "Expiration date must be set to a future time");
    }
  }

  next();
};

export {validateUrl};