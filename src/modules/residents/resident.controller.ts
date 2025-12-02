import { Request, Response } from "express";
import { ResidentsService } from "./residents.service";

const residentsService = new ResidentsService();

export class ResidentsController {
  // Create resident
  // POST /v1/resident
  async createResident(req: Request, res: Response) {
    const resident = await residentsService.create(req.body);
    res.status(201).json(resident);
  }

  // Resident List
  // GET /v1/residents
  async listResident(req: Request, res: Response) {
    const residents = await residentsService.list();
    res.status(200).json(residents);
  }

  // Get resident by id
  // GET /v1/residents/:id
  async getResident(req: Request, res: Response) {
    const residentById = await residentsService.getById(req.params.id);
    res.status(200).json(residentById);
  }

  // Update resident
  // PUT /v1/residents/:id
  async updateResident(req: Request, res: Response) {
    const resident = await residentsService.update(req.params.id, req.body);
    res.status(200).json(resident);
  }

  // Delete resident
  // DELETE /v1/residents/:id
  async deleteResident(req: Request, res: Response) {
    const resident = await residentsService.delete(req.params.id);
    res.status(200).json(resident);
  }
}
