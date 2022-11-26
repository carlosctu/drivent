import ticketService from "@/services/ticket-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import hotelService from "@/services/hotel-service";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    await ticketService.validateTicketWithHotel(userId);

    const hotels = await hotelService.getHotels();

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
