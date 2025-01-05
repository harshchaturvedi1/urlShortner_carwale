import Joi from "joi";

/**
 * Validate user registration data
 * @param {Object} data - The registration data to validate
 * @param {string} data.username - The username of the user (minimum 3 characters)
 * @param {string} data.email - The email address of the user (must be a valid email format)
 * @param {string} data.password - The password of the user (minimum 6 characters)
 * @returns {Object} Validation result with error and value properties
 */
export const validateRegisterData = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(), // Username must be at least 3 characters long and is required
    email: Joi.string().email().required(), // Email must be a valid email format and is required
    password: Joi.string().min(6).required(), // Password must be at least 6 characters long and is required
  });

  return schema.validate(data); // Validate the input data against the schema
};
