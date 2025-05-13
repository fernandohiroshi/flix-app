import { Request, Response } from 'express'
import { courseService } from '../services/courseService'

export const coursesController = {
  // Get /courses:id
  show: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const course = await courseService.findyByIdWithEpisodes(id)
      res.json(course)
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  },
}
