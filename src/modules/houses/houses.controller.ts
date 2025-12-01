import { Request, Response } from "express";
import { HousesService } from "./houses.service";

const housesService = new HousesService();

export class HousesController {
  // List Houses
  // @route GET /v1/houses
  // @access Private
  async listHouses(req: Request, res: Response) {
    const housesList = await housesService.list();
    return res.status(200).json(housesList);
  }
  // Create House
  // @route POST /v1/houses
  // @access Private
  async createHouse(req: Request, res: Response) {
    const housesCreated = await housesService.create(req.body);
    return res.status(201).json(housesCreated);
  }
  // Get House
  // @route GET /v1/houses/:id
  // @access Private
  async getHouse(req: Request, res: Response) {
    const houseDetails = await housesService.get(req.params.id);
    return res.status(200).json(houseDetails);
  }
  // Update House
  // @route PUT /v1/houses/:id
  // @access Private
  async updateHouse(req: Request, res: Response) {
    const houseUpdated = await housesService.update(req.params.id, req.body);
    return res.status(200).json(houseUpdated);
  }
  // Delete House
  // @route DELETE /v1/houses/:id
  // @access Private
  async deleteHouse(req: Request, res: Response) {
    const houseDeleted = await housesService.delete(req.params.id);
    return res.status(200).json(houseDeleted);
  }
}
