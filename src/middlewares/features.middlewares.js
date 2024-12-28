import mongoose   from "mongoose";
import { AppError } from "../services/error.handler.service.js";

/**
 * Filter a query by a given parameter.
 * @param {{fieldName: string, paramName: string}} options
 * @param {string} options.fieldName - The name of the field in the model to filter by.
 * @param {string} options.paramName - The name of the parameter in the request to filter by.
 * @returns {import('express').RequestHandler}
 */
export const filterQuery = ({ fieldName, paramName }) => {
  return (req, res, next) => {
      const value = req.params[paramName];

      if (mongoose.Types.ObjectId.isValid(value)) {
          req.dbQuery = req.dbQuery.where({ [fieldName]: value });
          next();
      } else {
          next(new AppError(`${paramName} invalid`,400));
      }
  }
}


/**
 * Select only the given fields from the query.
 * @param {string[]} fields - The array of fields to select.
 * @returns {import('express').RequestHandler}
 */
export const selectFileds = (fields) => {
  return (req, res, next) => {
      req.dbQuery = req.dbQuery.select(fields);
      next();
  }
}


/**
 * Populate a given field in the query.
 * @param {string} field - The name of the field to populate.
 * @returns {import('express').RequestHandler}
 */
export const populate = (field) => {
  return (req, res, next) => {
      req.dbQuery = req.dbQuery.populate(field)
      next();
  }
}


/**
 * Apply pagination to the query.
 * @param {number} [limit=10] - The limit of documents per page.
 * @returns {import('express').RequestHandler}
 */
export const pagination = (limit) => {
  return (req, res, next) => {
      const page = req.query.page;
      const limitValueFromQuery = req.query.limit || limit;
      const pageValue = page * 1 || 1;
      const skipValue = ((pageValue - 1) * (limitValueFromQuery));

      const model = req.dbQuery.model; // Get the model from the query

      // Use the filters applied to req.dbQuery for the count query
      const filter = req.dbQuery.getFilter ? req.dbQuery.getFilter() : {}; // Ensure you have a getFilter method

      const countQuery = model.countDocuments(filter); // Create a new query for counting

      req.dbQuery.skip(skipValue).limit(limitValueFromQuery);

      countQuery.then((totalDocuments) => {
          const numberOfPages = Math.ceil(totalDocuments / limitValueFromQuery); // Calculate number of pages
          const currentPage = pageValue;
          const nextPage = currentPage < numberOfPages ? currentPage + 1 : null;
          const prevPage = currentPage > 1 ? currentPage - 1 : null;

          res.pagination = {
              currentPage,
              nextPage,
              prevPage,
              numberOfRows: totalDocuments,
              numberOfPages
          };

          next();
      }).catch((err) => {
          next(err);
      });
  };
};