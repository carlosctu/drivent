import app, { init } from "@/app";
import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import {
  createEnrollmentWithAddress,
  createUser,
  createTicketType,
  createTicket,
} from "../factories";
import { createHotel, createRoom } from "../factories/hotels-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /hotels", () => {
  describe("when there's no token", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.get("/hotels");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await server
        .get("/hotels")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign(
        { userId: userWithoutSession.id },
        process.env.JWT_SECRET
      );

      const response = await server
        .get("/hotels")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });
  describe("when token is valid", () => {
    it("should respond with status 200 and with hotel lists when user has a PAID ticket with hotel RESERVED", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType(true);
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const hotel = await createHotel();

      const response = await server
        .get("/hotels")
        .set("Authorization", `Bearer ${token}`);

      const count = await prisma.hotel.count();

      expect(response.status).toBe(httpStatus.OK);
      expect(count).toBeGreaterThanOrEqual(1);
      expect(response.body).toEqual([
        {
          id: expect.any(Number),
          name: hotel.name,
          image: hotel.image,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);
    });

    it("should respond with status 401 when user has a PAID ticket with no hotel RESERVED", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

      const response = await server
        .get("/hotels")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 when user just has a RESERVED ticket", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const response = await server
        .get("/hotels")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });
});

describe("GET /hotels/:hotelId", () => {
  describe("when there's no token", () => {
    it("should respond with status 401 if no token is given", async () => {
      const response = await server.get("/hotels/1");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await server
        .get("/hotels/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is no session for given token", async () => {
      const userWithoutSession = await createUser();
      const token = jwt.sign(
        { userId: userWithoutSession.id },
        process.env.JWT_SECRET
      );

      const response = await server
        .get("/hotels/1")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });
  describe("when token is valid", () => {
    it("should respond with status 200 and with hotel rooms lists when user has a PAID ticket with hotel RESERVED", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType(true);
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const hotel = await createHotel();
      const room = await createRoom(hotel.id);

      const response = await server
        .get(`/hotels/${hotel.id}`)
        .set("Authorization", `Bearer ${token}`);

      const count = await prisma.hotel.count();

      expect(response.status).toBe(httpStatus.OK);
      expect(count).toBeGreaterThanOrEqual(1);
      expect(response.body).toEqual([
        {
          id: hotel.id,
          image: hotel.image,
          name: hotel.name,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          Rooms: [
            {
              id: room.id,
              name: room.name,
              capacity: room.capacity,
              hotelId: room.hotelId,
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
            },
          ],
        },
      ]);
    });
  });
});
