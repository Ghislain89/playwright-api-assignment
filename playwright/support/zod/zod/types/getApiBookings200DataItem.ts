/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Restful Booker Platform API
 * API documentation for the Restful Booker Platform
 * OpenAPI spec version: 1.0.0
 */
import type { GetApiBookings200DataItemStatus } from './getApiBookings200DataItemStatus';

export type GetApiBookings200DataItem = {
  id?: string;
  userId?: string;
  roomId?: string;
  checkIn?: string;
  checkOut?: string;
  status?: GetApiBookings200DataItemStatus;
  totalPrice?: number;
  createdAt?: string;
  updatedAt?: string;
};
