import { z } from "zod";

// TODO: make this global
enum Status {
  Operational = "Operational",
  Faulty = "Faulty",
  InService = "InService",
}

export const createBikeSchema = z.object({
  status: z.nativeEnum(Status),
  isEbike: z.boolean(),
});

export const createBikesSchema = z.array(createBikeSchema);

export const bikeIdSchema = z.string().regex(/^\d+$/).transform(Number);
