import z from "zod";

export const inviteVisitorSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(255),
    vehicleNumber: z.string().min(3).max(255),
    type: z.enum(["GUEST", "DELIVERY", "CONTRACTOR", "PARENT", "OTHER"]),
    phone: z.string().min(10).max(15),
    address: z.string().min(3).max(255),
    purpose: z.string().min(3).max(255),
  }),
});
