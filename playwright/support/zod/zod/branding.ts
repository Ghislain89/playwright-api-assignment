/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Restful Booker Platform API
 * API documentation for the Restful Booker Platform
 * OpenAPI spec version: 1.0.0
 */
import {
  z as zod
} from 'zod';



/**
 * @summary Get branding settings
 */
export const getApiBrandingResponse = zod.object({
  "success": zod.boolean().optional(),
  "data": zod.object({
  "id": zod.string().optional(),
  "hotelName": zod.string().optional(),
  "logo": zod.string().optional(),
  "primaryColor": zod.string().optional(),
  "secondaryColor": zod.string().optional(),
  "fontFamily": zod.string().optional(),
  "createdAt": zod.string().datetime().optional(),
  "updatedAt": zod.string().datetime().optional()
}).optional()
})

/**
 * @summary Update branding settings (admin only)
 */
export const putApiBrandingBody = zod.object({
  "hotelName": zod.string().optional(),
  "logo": zod.string().optional(),
  "primaryColor": zod.string().optional(),
  "secondaryColor": zod.string().optional(),
  "fontFamily": zod.string().optional()
})

export const putApiBrandingResponse = zod.object({
  "success": zod.boolean().optional(),
  "data": zod.object({
  "id": zod.string().optional(),
  "hotelName": zod.string().optional(),
  "logo": zod.string().optional(),
  "primaryColor": zod.string().optional(),
  "secondaryColor": zod.string().optional(),
  "fontFamily": zod.string().optional(),
  "updatedAt": zod.string().datetime().optional()
}).optional()
})

/**
 * @summary Reset branding settings to default (admin only)
 */
export const postApiBrandingResetResponse = zod.object({
  "success": zod.boolean().optional(),
  "data": zod.object({
  "id": zod.string().optional(),
  "hotelName": zod.string().optional(),
  "logo": zod.string().optional(),
  "primaryColor": zod.string().optional(),
  "secondaryColor": zod.string().optional(),
  "fontFamily": zod.string().optional(),
  "updatedAt": zod.string().datetime().optional()
}).optional()
})

