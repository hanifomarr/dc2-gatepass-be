import { Request, Response } from "express";
import { VisitorService } from "./visitor.services";

const visitorService = new VisitorService();

export class VisitorController {
  // Invite visitor
  // POST /visitors
  async createVisitor(req: Request, res: Response) {
    const visitor = await visitorService.create(req.body);
    res.status(201).json(visitor);
  }

  // List visitors
  // GET /visitors
  async listVisitors(req: Request, res: Response) {
    const visitors = await visitorService.list();
    res.status(200).json(visitors);
  }

  // View visitor
  // GET /visitors/:id
  async viewVisitor(req: Request, res: Response) {
    const visitor = await visitorService.get(req.params.id);
    res.status(200).json(visitor);
  }

  // Check-in visitor
  // POST /visitors/:id/checkin
  async checkInVisitor(req: Request, res: Response) {
    const visitor = await visitorService.checkIn(req.params.id);
    res.status(200).json(visitor);
  }

  // Check-out visitor
  // POST /visitors/:id/checkout
  async checkOutVisitor(req: Request, res: Response) {
    const visitor = await visitorService.checkOut(req.params.id);
    res.status(200).json(visitor);
  }
}
