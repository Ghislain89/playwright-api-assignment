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
 * @summary Get all bookings
 */
export const getApiBookingsResponse = zod.object({
  "success": zod.boolean().optional(),
  "data": zod.array(zod.object({
  "id": zod.string().optional(),
  "userId": zod.string().optional(),
  "roomId": zod.string().optional(),
  "checkIn": zod.string().datetime().optional(),
  "checkOut": zod.string().datetime().optional(),
  "status": zod.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
  "totalPrice": zod.number().optional(),
  "createdAt": zod.string().datetime().optional(),
  "updatedAt": zod.string().datetime().optional()
})).optional()
})

/**
 * @summary Create new booking
 */
export const postApiBookingsBody = zod.object({
  "roomId": zod.string(),
  "checkIn": zod.string().datetime(),
  "checkOut": zod.string().datetime()
})

/**
 * @summary Get booking by ID
 */
export const getApiBookingsIdParams = zod.object({
  "id": zod.string().describe('Booking ID')
})

export const getApiBookingsIdResponse = zod.object({
  "success": zod.boolean().optional(),
  "data": zod.object({
  "id": zod.string().optional(),
  "userId": zod.string().optional(),
  "roomId": zod.string().optional(),
  "checkIn": zod.string().datetime().optional(),
  "checkOut": zod.string().datetime().optional(),
  "status": zod.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
  "totalPrice": zod.number().optional(),
  "createdAt": zod.string().datetime().optional(),
  "updatedAt": zod.string().datetime().optional()
}).optional()
})

/**
 * @summary Update booking status (admin only)
 */
export const putApiBookingsIdParams = zod.object({
  "id": zod.string().describe('Booking ID')
})

export const putApiBookingsIdBody = zod.object({
  "status": zod.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'])
})

export const putApiBookingsIdResponse = zod.object({
  "success": zod.boolean().optional(),
  "data": zod.object({
  "id": zod.string().optional(),
  "status": zod.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
  "updatedAt": zod.string().datetime().optional()
}).optional()
})

/**
 * @summary Cancel booking
 */
export const deleteApiBookingsIdParams = zod.object({
  "id": zod.string().describe('Booking ID')
})

export const deleteApiBookingsIdResponse = zod.object({
  "success": zod.boolean().optional(),
  "message": zod.string().optional()
})

